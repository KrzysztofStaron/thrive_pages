// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6eR4SqMFEk_2J-5f30mBp66NGLRLyEcc",
  authDomain: "thrivepages.firebaseapp.com",
  projectId: "thrivepages",
  storageBucket: "thrivepages.appspot.com",
  messagingSenderId: "320040146758",
  appId: "1:320040146758:web:66fc7f63fbc35e70377747",
  measurementId: "G-JWN6T8DPPT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const analytics = getAnalytics(app);
