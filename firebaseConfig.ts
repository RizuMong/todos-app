import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAe4JxWuZq5EdaHacNZLTq_Uwq4bbw2GjA",
  authDomain: "todo-app-2aff4.firebaseapp.com",
  projectId: "todo-app-2aff4",
  storageBucket: "todo-app-2aff4.appspot.com",
  messagingSenderId: "1050678531644",
  appId: "1:1050678531644:web:bb167004851dad195cd539",
  measurementId: "G-0WD0HXZ5D2",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// onAuthStateChanged(FIREBASE_AUTH, () => {

// });
