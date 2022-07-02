import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9gndYLTHWZS0_RHJR5MsNyn3HXAVO4jM",
  authDomain: "writeish-b858d.firebaseapp.com",
  projectId: "writeish-b858d",
  storageBucket: "writeish-b858d.appspot.com",
  messagingSenderId: "1038586981300",
  appId: "1:1038586981300:web:d014990b6f0d6c8d40e0e1",
  measurementId: "G-QECQT9P0ZG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// DB Stuff
export const db = getFirestore(app);

// Auth Stuff
export const auth = getAuth(app);
