import { auth, db } from "../firebase/firebase";

import {
  doc,
  updateDoc,
  addDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).catch((err) => console.log(err));
};

export const signOutUser = () => {
  signOut(auth);
};

export const useAuth = (cb) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, photoURL, uid } = user;
      cb({ email, photoURL, uid });
      return;
    }
    cb(user);
  });
};

export const addDocument = async (path, document) => {
  return await addDoc(collection(db, path), document);
};

export const updateDocument = async (path, document) => {
  await updateDoc(doc(db, path), document);
};

export const removeDocument = async (path) => {
  await deleteDoc(doc(db, path));
};
