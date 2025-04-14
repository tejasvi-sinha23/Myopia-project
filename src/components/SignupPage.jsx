import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import '../styles/SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Account created successfully');
      navigate('/login'); // Redirect to login after signup
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log('Google signup successful');
      navigate('/login'); // Redirect to login after Google signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create Account</h2>
        <p className="subtitle">Join Myopique today</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleEmailSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="email-btn">Sign Up</button>
        </form>
        <div className="divider">OR</div>
        <button className="google-btn" onClick={handleGoogleSignup}>
          <span className="google-icon">G</span> Sign Up with Google
        </button>
        <p className="alternative">
          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;