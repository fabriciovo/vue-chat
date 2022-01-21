import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
console.log(firebase)
const firebaseConfig = {
  apiKey: "AIzaSyBF6AW99nXjvWDMOWoecEMyUW5RcYauIUs",
  authDomain: "vue-chat-9a31c.firebaseapp.com",
  projectId: "vue-chat-9a31c",
  storageBucket: "vue-chat-9a31c.appspot.com",
  messagingSenderId: "990478007207",
  appId: "1:990478007207:web:cf1ab171648d44303dd482",
  measurementId: "G-ZFPY1T4LBF",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
