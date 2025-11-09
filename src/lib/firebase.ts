// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXmHsdDqvYWGBkP4VPfX8hdvEFZ_sxB8w",
  authDomain: "swetha-g.firebaseapp.com",
  projectId: "swetha-g",
  storageBucket: "swetha-g.firebasestorage.app",
  messagingSenderId: "866194672349",
  appId: "1:866194672349:web:302da2fa773ca6ef7de934",
  measurementId: "G-EZTFWBPTL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;