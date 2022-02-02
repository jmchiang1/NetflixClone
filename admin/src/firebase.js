import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXglWAfPWH-nW_nowuc8aIhJHYtwVP1b4",
  authDomain: "netflix-clcone.firebaseapp.com",
  projectId: "netflix-clcone",
  storageBucket: "netflix-clcone.appspot.com",
  messagingSenderId: "312697545051",
  appId: "1:312697545051:web:6c1a593d189eed09747a7e",
  measurementId: "G-WC1BCDY3MG",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export default storage;
