import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2iVqSU2YsOR5R093M57kv0urwCx0U9kQ",
  authDomain: "expense-tracker-4ad53.firebaseapp.com",
  projectId: "expense-tracker-4ad53",
  storageBucket: "expense-tracker-4ad53.appspot.com",
  messagingSenderId: "495543928799",
  appId: "1:495543928799:web:7057d8329f88d17299666a",
  measurementId: "G-6PT4BMXHB9"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
