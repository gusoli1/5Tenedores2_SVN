import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBPzeWew4rxHYP4ZuBjTTqrQtNtbJ2AjE4",
    authDomain: "tenedores-v2-483e7.firebaseapp.com",
    databaseURL: "https://tenedores-v2-483e7.firebaseio.com",
    projectId: "tenedores-v2-483e7",
    storageBucket: "tenedores-v2-483e7.appspot.com",
    messagingSenderId: "843823953407",
    appId: "1:843823953407:web:facf41f3a426ca48d4e3ca"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);