import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtLq80MuX937AbGJQw82_qwbwXsmVduCI",
  authDomain: "sorteio-13df5.firebaseapp.com",
  projectId: "sorteio-13df5",
  storageBucket: "sorteio-13df5.appspot.com",
  messagingSenderId: "517479363665",
  appId: "1:517479363665:web:c3f1c2b3945f4848507470"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


