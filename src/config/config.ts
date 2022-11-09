// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { loginSuccess } from "../state/features/auth/authSlice";
import { useAppDispatch } from "../state/store";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCarvPAxva0MCHEnLvsB1u4-AkjXkQud-A",
  authDomain: "react-project-501cb.firebaseapp.com",
  projectId: "react-project-501cb",
  storageBucket: "react-project-501cb.appspot.com",
  messagingSenderId: "291550481656",
  appId: "1:291550481656:web:e869cb58c94433e7123f0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  db = getFirestore(app);

export const auth = getAuth(app);