// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIv86h-6Jyeyb1x4Pp_mOuiOZAbLt9wQ0",
  authDomain: "personal-db18.firebaseapp.com",
  projectId: "personal-db18",
  storageBucket: "personal-db18.firebasestorage.app",
  messagingSenderId: "572552229433",
  appId: "1:572552229433:web:a8877788d975e92cbc53e8",
  measurementId: "G-L78GX8YTYL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("app", app);
const analytics = getAnalytics(app);
console.log("analytics", analytics);
export const db = getFirestore(app);
