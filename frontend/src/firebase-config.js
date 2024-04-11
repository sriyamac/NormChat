import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = { //firebase DB authentication
    apiKey: "AIzaSyD8fHKa7gqogxGcm6HDFgy6ULNXnfpd5WA",
    authDomain: "normchat-262a9.firebaseapp.com",
    projectId: "normchat-262a9",
    storageBucket: "normchat-262a9.appspot.com",
    messagingSenderId: "816632776861",
    appId: "1:816632776861:web:d1b9f3b32a6728004e6c74",
    measurementId: "G-D6ZZKD1SYH"
};

const app = initializeApp(firebaseConfig); //app = initialize firebase
export const auth = getAuth(app); 
export const provider = new GoogleAuthProvider(); //tells firebase we want to handle authentication through google
export const db = getFirestore(app); //connection to firestore DB