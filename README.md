# Myopia-Project - Eye Myopia Detection using Quantum-Classical Hybrid Model

This project integrates a **Quantum-Classical Hybrid Model** to detect **myopia** in eye images. The backend uses **Flask** to handle image classification, while the frontend is built using **React** to provide an interactive user interface for uploading images and viewing predictions.

---

## 🚀 Project Overview

The **Myopia-Project** leverages both **quantum computing** and **classical machine learning** to classify eye images as **Normal** or **Myopic**. The goal of this project is to explore the potential of quantum computing in medical image classification while providing a practical solution for detecting eye conditions using a hybrid approach.

### 🔹 **Key Components**

1. **Backend (Flask API)**: 
   - The backend runs a **quantum-classical hybrid model** using **PyTorch** and **PennyLane**.
   - The model classifies images of eyes into **Normal** and **Myopic** categories.
   - A REST API built with **Flask** is used to serve the model and handle prediction requests.

2. **Frontend (React UI)**: 
   - The frontend is built using **React** and allows users to upload an image of an eye to the backend for prediction.
   - The prediction (Normal or Myopic) is displayed along with the confidence score.

3. **Machine Learning Model**: 
   - The model combines **quantum circuits** using PennyLane for data encoding and entanglement, with a **classical neural network** for decision-making.
   - The model was trained on a dataset of eye images to detect myopia and achieved an accuracy of around **90%**.

---

## 🛠️ Setup Instructions

### 🔹 Backend (Flask)
1. Clone the repository and navigate to the backend directory (`flask_api`).
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   source venv/bin/activate  # On macOS/Linux
3. Install the required dependencies:
pip install -r requirements.txt
4. Run the Flask API:
python app.py


#### 🔹 Frontend (React)
Navigate to the frontend directory (myopique-website).

1. Install the necessary dependencies:
npm install
2. Start the React development server:
npm start
#### 🔧 Dependencies
Backend (Flask)
Flask

torch

torchvision

pennylane

numpy

PIL

flask-cors

matplotlib

And other necessary dependencies listed in requirements.txt.

#### Frontend (React)
react

react-dom

react-scripts

axios

And other dependencies defined in the package.json file.

##### 🧠 Model Explanation
The quantum-classical hybrid model used in this project leverages Quantum Computing to encode the image data into quantum states. The quantum layer then applies quantum circuits using PennyLane for entanglement, followed by a classical neural network for the final classification (Normal vs. Myopic).

The Flask API serves the trained model, which was trained on a dataset of eye images to predict whether an eye is Normal or Myopic. The React UI allows users to upload eye images and receive predictions based on the trained model.

#### 🏆 Accuracy
The trained model achieved ~90% accuracy on the testing dataset.

Well-optimized using classical pre-processing and quantum feature embedding.

#### 🚧 Project Status
✅ Model is trained and finalized
✅ Flask backend and React frontend are fully integrated
⚙️ Deployment pending — next step is to deploy the full-stack app on a cloud platform
✅ Can be tested locally (localhost:5000 for Flask API, localhost:3000/dashboard for frontend)