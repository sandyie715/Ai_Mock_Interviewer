// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAzbH6c4feuiKbgQy3UpNMuJ_MHkhnxORY",
  authDomain: "infoview-7caa8.firebaseapp.com",
  projectId: "infoview-7caa8",
  storageBucket: "infoview-7caa8.firebasestorage.app",
  messagingSenderId: "1037386361800",
  appId: "1:1037386361800:web:a7b25cd31c77a195cdeefd",
  measurementId: "G-YNTKGFTQ0L"
};

// Initialize Firebase
const app = !getApps().length ?  initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)