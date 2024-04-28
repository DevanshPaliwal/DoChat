// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence,initializeAuth} from 'firebase/auth'
// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore,collection} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyASflb_gwodVLWaKYTZvq8tUGUbFCJt6mo",
  authDomain: "dochat-e7f17.firebaseapp.com",
  projectId: "dochat-e7f17",
  storageBucket: "dochat-e7f17.appspot.com",
  messagingSenderId: "835300122512",
  appId: "1:835300122512:web:d8a4cf0f1ffa97c7f05d15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth=initializeAuth(app,{
  persistence:getReactNativePersistence(AsyncStorage)
})

export const db=getFirestore(app)

export const usersRef = collection(db,"users")
export const roomRef = collection(db,"rooms")