// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB2Lnve1Jy8NazL7k7hN_io7UXSofqFyg",
  authDomain: "netflixgpt-15a03.firebaseapp.com",
  projectId: "netflixgpt-15a03",
  storageBucket: "netflixgpt-15a03.firebasestorage.app",
  messagingSenderId: "877768072552",
  appId: "1:877768072552:web:3e03c2ee4b9dfe66e88add",
  measurementId: "G-1J06G8TX91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();