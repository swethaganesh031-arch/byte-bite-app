// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQNNEp5VYrhNJTemI0IjA_hsG4EvJRrlg",
  authDomain: "coffee-spark-ai-barista-b82da.firebaseapp.com",
  projectId: "coffee-spark-ai-barista-b82da",
  storageBucket: "coffee-spark-ai-barista-b82da.firebasestorage.app",
  messagingSenderId: "664423992167",
  appId: "1:664423992167:web:cb924b9aced07030813dc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;