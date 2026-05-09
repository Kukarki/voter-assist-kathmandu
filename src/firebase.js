import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAPc3n0ODHjZT-UWMIeyPbt7QgDhxtYFM", 
  authDomain: "voter-assist-kathmandu.firebaseapp.com",
  projectId: "voter-assist-kathmandu",
  storageBucket: "voter-assist-kathmandu.firebasestorage.app",
  messagingSenderId: "456457432020",
  appId: "1:456457432020:web:8a581b83b3b23d41f5c441",
  measurementId: "G-QK820E014C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);