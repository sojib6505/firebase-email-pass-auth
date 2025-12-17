// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC3OapSZURf7fjIMGNxjWwQcFUKWEn7t8",
  authDomain: "fir-email-pass-auth-31556.firebaseapp.com",
  projectId: "fir-email-pass-auth-31556",
  storageBucket: "fir-email-pass-auth-31556.firebasestorage.app",
  messagingSenderId: "902043107230",
  appId: "1:902043107230:web:ed9badb74cf422910fe08f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()