//FireBase 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBH9Qw6sRSd-7rWVqnBHitUkGnTLS3TEv0",
  authDomain: "retailrevolutioner.firebaseapp.com",
  projectId: "retailrevolutioner",
  storageBucket: "retailrevolutioner.appspot.com",
  messagingSenderId: "853900624318",
  appId: "1:853900624318:web:8a1447d37c26298b86f9ef",
  measurementId: "G-GELFF19FVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;