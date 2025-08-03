// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCbW0cqvBm7n37heTK3w7Cv6DK0gnMx70",
  authDomain: "email-password-auth-df6b6.firebaseapp.com",
  projectId: "email-password-auth-df6b6",
  storageBucket: "email-password-auth-df6b6.firebasestorage.app",
  messagingSenderId: "1035799321458",
  appId: "1:1035799321458:web:a5171d49451ef7656d5beb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth