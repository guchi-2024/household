// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKqkFizYEZ5Bw2gN-E0nB5XjAcemmqFVQ",
  authDomain: "household-44050.firebaseapp.com",
  projectId: "household-44050",
  storageBucket: "household-44050.firebasestorage.app",
  messagingSenderId: "99810361643",
  appId: "1:99810361643:web:66b29b80d2ee5cf7f4456e",
  measurementId: "G-YR1CS9B65K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };