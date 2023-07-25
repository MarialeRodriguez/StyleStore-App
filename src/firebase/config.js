
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAo7YssexcrPzzGFArvk4Lmz4V6SiGGRuo",
  authDomain: "stylestore-8204b.firebaseapp.com",
  projectId: "stylestore-8204b",
  storageBucket: "stylestore-8204b.appspot.com",
  messagingSenderId: "83863532321",
  appId: "1:83863532321:web:7c3fa1603c6abef2508460"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );