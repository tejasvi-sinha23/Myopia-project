import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import pennylane as qml

# === Flask Setup ===
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# === Quantum Model Setup ===
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

n_qubits = 4
n_layers = 2
dev = qml.device("default.qubit", wires=n_qubits)

@qml.qnode(dev, interface="torch")
def quantum_net(inputs, weights):
    qml.templates.AngleEmbedding(inputs, wires=range(n_qubits))
    qml.templates.StronglyEntanglingLayers(weights, wires=range(n_qubits))
    return [qml.expval(qml.PauliZ(i)) for i in range(n_qubits)]

weight_shapes = {"weights": (n_layers, n_qubits, 3)}
qlayer = qml.qnn.TorchLayer(quantum_net, weight_shapes)

class QMLClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(64 * 64 * 3, 256)
        self.fc2 = nn.Linear(256, 128)
        self.fc3 = nn.Linear(128, n_qubits)
        self.qlayer = qlayer
        self.fc4 = nn.Linear(n_qubits, 2)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = torch.relu(self.fc3(x))
        q_out = [self.qlayer(x[i]) for i in range(x.shape[0])]
        q_out = torch.stack(q_out)
        return self.fc4(q_out)

# === Load Model ===
model = QMLClassifier().to(DEVICE)
model.load_state_dict(torch.load("quantum_model.pth", map_location=DEVICE))
model.eval()

# === Image Preprocessing ===
transform = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

# === Prediction Function ===
def run_model(image_path):
    image = Image.open(image_path).convert("RGB")
    image = transform(image)
    image = image.view(1, -1).to(DEVICE)

    with torch.no_grad():
        output = model(image)
        probs = torch.softmax(output, dim=1)
        confidence, predicted = torch.max(probs, 1)

    label_map = {0: "Normal", 1: "Myopic"}
    return label_map[predicted.item()], confidence.item()

# === Upload Route ===
@app.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    filename = secure_filename(image_file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    image_file.save(file_path)

    prediction, confidence = run_model(file_path)

    return jsonify({
        'prediction': prediction,
        'confidence': round(confidence * 100, 2)
    })

# === Health Check ===
@app.route('/')
def index():
    return '🚀 Quantum Myopia Detection Flask API is running!'

# === Run Server ===
if __name__ == '__main__':
    app.run(debug=True)
