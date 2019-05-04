import firebase from "firebase";

const config = {
  apiKey: "AIzaSyB2VY2lhqLIt4MuPQBVKDvLhFmLIDqKnvg",
  authDomain: "e-2019.firebaseapp.com",
  databaseURL: "https://e-2019.firebaseio.com",
  projectId: "e-2019",
  storageBucket: "e-2019.appspot.com",
  messagingSenderId: "476397070590"
};

firebase.initializeApp(config);


export const myFirebase = firebase;
export const myFirestore = firebase.firestore();
export const myStorage = firebase.storage();
