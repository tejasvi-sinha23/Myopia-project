import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../firebase';
import { signOut } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import cartoonEye from './cartoon.jpg'; // Your cartoon image
import chatbotIcon from './chatboticon.jpg'; // Your chatbot icon
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [userName, setUserName] = useState('User');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [lastCheck, setLastCheck] = useState('March 30, 2025'); // Initial static value
  const [visionScore, setVisionScore] = useState('85%');
  const [myopiaRisk, setMyopiaRisk] = useState('Low');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email.split('@')[0] || 'User');
    }
    if (!isChatOpen && chatMessages.length === 0) {
      setChatMessages([{ sender: 'bot', text: 'Hi there! I’m BlinkBot. How’s your vision feeling today?' }]);
    }
  }, [isChatOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logged out successfully');
      navigate('/');
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file.');
      return;
    }
    const userId = auth.currentUser.uid;
    const storageRef = ref(storage, `fundus_images/${userId}/${file.name}`);
    try {
      setUploadStatus('Uploading...');
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      setUploadStatus('Image uploaded successfully!');
      
      // Update lastCheck with current date
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      setLastCheck(formattedDate);

      // Send image URL to Flask for prediction
      const response = await fetch(url);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('image', blob, file.name);

      // POST to Flask server
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      console.log('Prediction Result:', result);

      // Update analytics with real model output
      setVisionScore(`${result.confidence}%`);
      setMyopiaRisk(result.prediction);

      setFile(null);
    } catch (err) {
      setUploadStatus('Upload failed: ' + err.message);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages([...chatMessages, { sender: 'user', text: userMessage }]);

    // Simulate dynamic AI responses
    const inputLower = userMessage.toLowerCase();
    let botResponse = "Hmm, let’s figure this out together! Could you tell me more?";

    if (inputLower.includes('blurry') || inputLower.includes('fuzzy')) {
      botResponse = "Oh no, blurry vision can be a bother! Try resting your eyes for a few minutes—maybe look out a window at something far away. How long has it been blurry?";
    } else if (inputLower.includes('tired') || inputLower.includes('strain')) {
      botResponse = "Tired eyes, huh? I’d suggest the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds. Want some more hacks to ease the strain?";
    } else if (inputLower.includes('good') || inputLower.includes('fine')) {
      botResponse = "Yay, glad to hear your vision’s doing well today! To keep it that way, try eating some carrots or spinach—they’re super for your eyes. Anything else on your mind?";
    } else if (inputLower.includes('hack') || inputLower.includes('tip')) {
      const hacks = [
        "Hey, try the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds—it’s a lifesaver!",
        "Blink more often—it keeps your eyes nice and moist, especially if you’re on screens a lot!",
        "Dim your screen brightness a bit—it’s gentler on your eyes, trust me!"
      ];
      botResponse = hacks[Math.floor(Math.random() * hacks.length)];
    } else if (inputLower.includes('test') || inputLower.includes('check')) {
      botResponse = "Want to check your eyes? You could try reading small text from a distance—like a book label—or see if colors pop as they should. Shall I guide you through one?";
    } else {
      botResponse = "Thanks for sharing! It sounds like your vision’s unique today. How about trying a quick break from screens? Or tell me more so I can tailor some tips!";
    }

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 500);
    setChatInput('');
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </div>
      <div className="dashboard-content">
        <div className="greeting-section">
          <img src={cartoonEye} alt="Cartoon Eye" className="cartoon-image" />
          <div className="greeting-text">
            <p className="greeting-name">Hello, {userName}!</p>
            <p className="greeting-message">Blurry vision? Nah, we fix that</p>
            <p className="greeting-recommendation">Chat with BlinkBot for personalized eye care tips!</p>
          </div>
        </div>
        <div className="analytics-section">
          <h2>Eye Analytics</h2>
          <div className="analytics-cards">
            <div className="card">
              <h3>Vision Score</h3>
              <p>{visionScore}</p>
            </div>
            <div className="card">
              <h3>Myopia Risk</h3>
              <p>{myopiaRisk}</p>
            </div>
            <div className="card">
              <h3>Last Check</h3>
              <p>{lastCheck}</p>
            </div>
          </div>
        </div>
        <div className="upload-section">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="upload-input"
          />
          <button onClick={handleUpload} className="upload-btn">Upload Image</button>
          <p>{uploadStatus}</p>
        </div>
      </div>
      <div className="chatbot-section">
        <div className={`chatbox ${isChatOpen ? 'open' : ''}`}>
          <div className="chat-header" onClick={toggleChat}>
            <img src={chatbotIcon} alt="Chatbot" className="chatbot-icon" />
            <span className="chat-title">BlinkBot</span>
          </div>
          <div className="chat-content">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="chat-input-form">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="chat-input"
              placeholder="Ask BlinkBot..."
            />
            <button type="submit" className="send-btn">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
