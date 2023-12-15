import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD79NOJMRepFipfr5OAw7G6bcPtIAUuv18",
  authDomain: "fir-auth-d898f.firebaseapp.com",
  projectId: "fir-auth-d898f",
  storageBucket: "fir-auth-d898f.appspot.com",
  messagingSenderId: "130023753722",
  appId: "1:130023753722:web:774634112a087dc8374643"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };