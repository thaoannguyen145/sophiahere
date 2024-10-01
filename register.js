import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5UQOZc3QGWb_A1gyPCEAOn_BMBEXOBas",
  authDomain: "sophia-here.firebaseapp.com",
  projectId: "sophia-here",
  storageBucket: "sophia-here.appspot.com",
  messagingSenderId: "226577895652",
  appId: "1:226577895652:web:4507f2b7d85a7923e89cf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Sign Up Function
function signUp() {
  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
  console.log("User signed up", userCredential);
  // Do something on success (e.g., redirect to the quiz)
  })
  .catch((error) => {
  console.error("Error signing up", error.message);
  });
  }

// Login Function
function login() {
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;
  
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
  console.log("User logged in", userCredential);
  // Do something on success (e.g., load the quiz)
  })
  .catch((error) => {
  console.error("Error logging in", error.message);
  });
  }

