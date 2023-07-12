// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtvrWWCfLIWTcWgiWPM5f0XkLvLQK6uNA",
  authDomain: "react-community-6e6f3.firebaseapp.com",
  projectId: "react-community-6e6f3",
  storageBucket: "react-community-6e6f3.appspot.com",
  messagingSenderId: "830256976115",
  appId: "1:830256976115:web:dc9e4c24a9996507aba786"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
