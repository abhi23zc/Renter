import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYbgoRzoaqBNYCE1J49rk3zc4HafAunOE",
  authDomain: "r-service-84a6b.firebaseapp.com",
  projectId: "r-service-84a6b",
  storageBucket: "r-service-84a6b.appspot.com",
  messagingSenderId: "817805728416",
  appId: "1:817805728416:web:263371f8e55676f60b87c5",
  measurementId: "G-HLN52QYP1T",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const storage = getStorage(app);
