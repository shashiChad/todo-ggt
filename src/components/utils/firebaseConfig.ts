import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyANtrZru2V4Czo2msZ3jHgvvQW_mEXhxfM",
  authDomain: "authentication-c597f.firebaseapp.com",
  projectId: "authentication-c597f",
  storageBucket: "authentication-c597f.firebasestorage.app",
  messagingSenderId: "1077389357137",
  appId: "1:1077389357137:web:940e09f0b77084f6958870"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);