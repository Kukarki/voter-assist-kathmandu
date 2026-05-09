import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Login Error:", error.message);
  }
};

export const logout = () => signOut(auth);

export const monitorAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};