import { auth, db, analytics } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logEvent } from "firebase/analytics";

// Test Firebase configuration
console.log("Firebase config test:");

// Check if auth is properly initialized
if (auth) {
  console.log("✅ Firebase Auth is initialized");
  
  // Check auth state
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("✅ User is signed in:", user.email);
    } else {
      console.log("ℹ️ No user is signed in");
    }
    unsubscribe(); // Unsubscribe after first check to avoid memory leaks
  });
} else {
  console.log("❌ Firebase Auth is not initialized");
}

// Check if Firestore is properly initialized
if (db) {
  console.log("✅ Firestore is initialized");
} else {
  console.log("❌ Firestore is not initialized");
}

// Check if Analytics is properly initialized
if (analytics) {
  console.log("✅ Firebase Analytics is initialized");
  
  // Log a test event
  try {
    logEvent(analytics, 'page_view', {
      page_title: 'Firebase Test',
      page_location: window.location.href
    });
    console.log("✅ Analytics event logged successfully");
  } catch (error) {
    console.log("ℹ️ Analytics event logging failed:", error);
  }
} else {
  console.log("❌ Firebase Analytics is not initialized");
}

export { auth, db, analytics };