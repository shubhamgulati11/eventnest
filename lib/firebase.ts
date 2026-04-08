import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMSfPTI1OGk-AVFTXYw6hie1yZvYSlfD0",
  authDomain: "eventnest-dda9c.firebaseapp.com",
  projectId: "eventnest-dda9c",
  storageBucket: "eventnest-dda9c.firebasestorage.app",
  messagingSenderId: "620371473015",
  appId: "1:620371473015:web:66d47f223cd3da01a60c72",
  measurementId: "G-0GS8K8J1RG"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth
export const auth = getAuth(app);