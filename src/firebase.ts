import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyANrkGj261ey_RoGkxKa_nB9EE0ejSXFYk",
  authDomain: "card-b034e.firebaseapp.com",
  projectId: "card-b034e",
  storageBucket: "card-b034e.firebasestorage.app",
  messagingSenderId: "161098736138",
  appId: "1:161098736138:web:f063a3d92d69364639f5f3"
};

// Initialize Firebase
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.error("Firebase initialization error", error);
}

// Initialize Cloud Firestore and get a reference to the service
export const db = app ? initializeFirestore(app, { experimentalForceLongPolling: true }) : null;
export const storage = app ? getStorage(app) : null;
export const auth = app ? getAuth(app) : null;

export default app;
