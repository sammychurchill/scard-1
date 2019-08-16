import firebase from "firebase/app";
import "firebase/firestore";

export function loadDB() {
  try {
    var config = {
      apiKey: process.env.FIREBASE_API,
      authDomain: "scard-1.firebaseapp.com",
      databaseURL: "https://scard-1.firebaseio.com",
      projectId: "scard-1",
      storageBucket: "scard-1.appspot.com",
      messagingSenderId: "413165953288",
      appId: "1:413165953288:web:cf438b3c9b8439ff"
    };
    firebase.initializeApp(config);
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }
  return firebase;
}
