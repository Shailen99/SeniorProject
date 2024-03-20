// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC3sPlDvRig70ZTRfDeIWS_HTFqE76AsU",
  authDomain: "studypartners-fd29f.firebaseapp.com",
  projectId: "studypartners-fd29f",
  storageBucket: "studypartners-fd29f.appspot.com",
  messagingSenderId: "96427750273",
  appId: "1:96427750273:web:6700ea57b38ec4ee396e80",
  measurementId: "G-96K4LVQS0Z"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const  FIREBASE_DB = getFirestore(FIREBASE_APP);




