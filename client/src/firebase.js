// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "jahufshhjasngkngs",
  authDomain: "mern-estate-b6e39.firebaseapp.com",
  projectId: "mern-estate-b6e39",
  storageBucket: "mern-estate-b6e39.appspot.com",
  messagingSenderId: "82671660124",
  appId: "1:82671660124:web:7690b981ed30b2c27dca99",
  measurementId: "G-V1V28C45ET"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);