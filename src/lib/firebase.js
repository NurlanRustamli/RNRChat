
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC52fnAJk-Eg7wv-GYJAcRwcGrDMuOJfjo",
  authDomain: "rnrchat-39ed7.firebaseapp.com",
  projectId: "rnrchat-39ed7",
  storageBucket: "rnrchat-39ed7.appspot.com",
  messagingSenderId: "657182943159",
  appId: "1:657182943159:web:b01950d7b7d8cfb4c52a32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()