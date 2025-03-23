// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth for Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Import getFirestore for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzG4FbPiu3y7eniLIFqDp4VJjSOaE4zNs",
  authDomain: "simeonazeh-37c78.firebaseapp.com",
  projectId: "simeonazeh-37c78",
  storageBucket: "simeonazeh-37c78.firebasestorage.app",
  messagingSenderId: "677754081845",
  appId: "1:677754081845:web:4643e60ae764f037ed577c",
  measurementId: "G-Y1HKCYNTM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Export the auth instance
export const db = getFirestore(app); // Export the Firestore instance