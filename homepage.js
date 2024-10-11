import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

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

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })


let vocabularySet = [];

function addWord() {
  const word = document.getElementById('word').value;
  const definition = document.getElementById('definition').value;

  if (word && definition) {
    vocabularySet.push({ word, definition });
    localStorage.setItem('vocabularySet', JSON.stringify(vocabularySet));  // Save to localStorage

    // Display the word list
    displayWordList();
  }
}

function displayWordList() {
  const wordListDiv = document.getElementById('wordList');
  wordListDiv.innerHTML = '';
  
  vocabularySet.forEach((vocab, index) => {
    wordListDiv.innerHTML += `<p>${index + 1}. ${vocab.word} - ${vocab.definition}</p>`;
  });
}


  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    // this is new code
    // sessionStorage.removeItem('google_access_token');
    // this is new code
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })
