// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//config file gotten from google firebase project settings to config the fierbase and connect it to the react app
import firebase from "firebase";

//   const firebaseApp = firebase.intializeApp({
    const firebaseConfig = {

apiKey: "AIzaSyADLzMIV8J4ag0P2JNGqV7XtBDjXW6kON0",
    authDomain: "catch-51405.firebaseapp.com",
    databaseURL: "https://catch-51405-default-rtdb.firebaseio.com",
    projectId: "catch-51405",
    storageBucket: "catch-51405.appspot.com",
    messagingSenderId: "324425288034",
    appId: "1:324425288034:web:45c9f9b5f2bc4d7ad6443b",
    measurementId: "G-VL3Z8SSLEC"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

//set up that grabs three services from firebase
  const db = firebase.firestore(); //accesses the databases
  const auth = firebase.auth(); //gives us the ability to authentication ; login - log out- create users
  const storage = firebase.storage(); //storage; upload pictures to store in databse

  export { db, auth, storage};
