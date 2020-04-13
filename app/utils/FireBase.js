import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDdh4cYQ_1KGUIswKKoi7XkfxFcOQjlsig",
    authDomain: "tenedores-253e7.firebaseapp.com",
    databaseURL: "https://tenedores-253e7.firebaseio.com",
    projectId: "tenedores-253e7",
    storageBucket: "tenedores-253e7.appspot.com",
    messagingSenderId: "590709547817",
    appId: "1:590709547817:web:b488efc34a19a8a9f18d38"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);