import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase (À MODIFIER AVEC VOS CLÉS)
const firebaseConfig = {
  apiKey: "AIzaSyA_FAKE_KEY_FOR_GHOST_TECH",
  authDomain: "ghost-tech-learn.firebaseapp.com",
  projectId: "ghost-tech-learn",
  storageBucket: "ghost-tech-learn.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

// Exporter les services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Note : Pour une vraie application, obtenir ces clés sur :
// console.firebase.google.com → Créer projet → Application web