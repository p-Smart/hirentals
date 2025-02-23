import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCa6MNlv3rl1Fy5KETYEhE_IpfWKPEjiIY",
  authDomain: "fabel-arts.firebaseapp.com",
  projectId: "fabel-arts",
  storageBucket: "fabel-arts.firebasestorage.app",
  messagingSenderId: "235555072014",
  appId: "1:235555072014:web:b8dbfa4507c768588fb45f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
