import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import {getFirestore} from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyBsQ3339Z_UadiOsKsPGdOp0LHEuMqsOEU",
  authDomain: "kilemba-df33a.firebaseapp.com",
  projectId: "kilemba-df33a",
  storageBucket: "kilemba-df33a.appspot.com",
  messagingSenderId: "877784344083",
  appId: "1:877784344083:web:da5492792babbf52f3c1e6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
