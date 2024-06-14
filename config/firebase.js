// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8EVQ0yLv7KvWqr0DPEZ1O3gdEZ3wrLLQ",
  authDomain: "reactnativenew-2b51a.firebaseapp.com",
  projectId: "reactnativenew-2b51a",
  storageBucket: "reactnativenew-2b51a.appspot.com",
  messagingSenderId: "54807476664",
  appId: "1:54807476664:web:995a7015d5780f9c7af74d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);