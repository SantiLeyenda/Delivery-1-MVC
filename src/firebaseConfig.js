
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCmXqBmBXShf9rs_NacP_RovFMLwX_eXpY",
  authDomain: "biblioteca-d34ca.firebaseapp.com",
  projectId: "biblioteca-d34ca",
  storageBucket: "biblioteca-d34ca.appspot.com",
  messagingSenderId: "66746313566",
  appId: "1:66746313566:web:b7d69e22a3287b1d7f7dcf"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
