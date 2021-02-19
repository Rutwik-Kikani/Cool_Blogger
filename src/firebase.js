require("firebase/firestore");
import firebase from "firebase";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBHDQU7IHb6UrR23Eb_g6f37tnxPPk3M44",
  authDomain: "cool-blogger.firebaseapp.com",
  databaseURL: "https://cool-blogger-default-rtdb.firebaseio.com",
  projectId: "cool-blogger",
  storageBucket: "cool-blogger.appspot.com",
  messagingSenderId: "127877541169",
  appId: "1:127877541169:web:a47879aa3b4e81e00dd410",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

var db = firebase.firestore();

export const auth = firebase.auth();
export const firestore = firebase.firestore;
export default db;
