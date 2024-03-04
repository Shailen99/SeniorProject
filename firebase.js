// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function logIn(email, password) {
   return signInWithEmailAndPassword(auth, email, password);
 }
 function signUp(email, password) {
   return createUserWithEmailAndPassword(auth, email, password);
 }
 function logOut() {
   return signOut(auth);
 }
