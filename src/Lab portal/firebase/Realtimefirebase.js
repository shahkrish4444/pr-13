import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBjkOLto3R2Red4BIjztt1l89EtCb3Kj6I",
  authDomain: "krishfirebase-fb18a.firebaseapp.com",
  databaseURL: "https://krishfirebase-fb18a-default-rtdb.firebaseio.com",
  projectId: "krishfirebase-fb18a",
  storageBucket: "krishfirebase-fb18a.appspot.com",
  messagingSenderId: "332579086905",
  appId: "1:332579086905:web:56245837f4a16ee56c23e8",
  measurementId: "G-8GH75Q86ZP"
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export { database ,app};
export const auth = firebase.auth();

