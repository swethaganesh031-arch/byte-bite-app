// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXmHsdDqvYWGBkP4VPfX8hdvEFZ_sxB8w",
  authDomain: "swetha-g.firebaseapp.com",
  projectId: "swetha-g",
  storageBucket: "swetha-g.firebasestorage.app",
  messagingSenderId: "866194672349",
  appId: "1:866194672349:web:652a2208fbb68d377de934",
  measurementId: "G-NLH5T3R8NF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;