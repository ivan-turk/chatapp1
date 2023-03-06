import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAapPFvWgz1EhNGaxlHKEaqGgElKscCQLQ",
  authDomain: "chatapp1-df0af.firebaseapp.com",
  projectId: "chatapp1-df0af",
  storageBucket: "chatapp1-df0af.appspot.com",
  messagingSenderId: "103020522338",
  appId: "1:103020522338:web:c5a26f8a2595672df39a3b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
