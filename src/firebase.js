import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCNKGr19rDf1iyYlJw0ciqvgLZctzro-Ds",
  authDomain: "myopique.firebaseapp.com",
  projectId: "myopique",
  storageBucket: "myopique.firebasestorage.app",
  messagingSenderId: "469069859523",
  appId: "1:469069859523:web:b0abacc911c8f2d647b076",
  measurementId: "G-H57PV84LQL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, googleProvider, storage };