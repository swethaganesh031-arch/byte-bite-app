import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// Create a test user for development
const createTestUser = async () => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      "test@example.com",
      "password123"
    );
    
    // Update user profile with display name
    await updateProfile(userCredential.user, {
      displayName: "Test User"
    });
    
    console.log("Test user created successfully!");
    console.log("Email: test@example.com");
    console.log("Password: password123");
    console.log("You can now use these credentials to log in to the application.");
  } catch (error: any) {
    console.error("Error creating test user:", error);
    console.log("Error code:", error.code);
    console.log("Error message:", error.message);
  }
};

// Run the function
createTestUser();