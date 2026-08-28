// src/config/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyD9QQTLYrkLh_5_DJ7eQU67hyLPo_BM4bU",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "ashinshanaishan-dad93.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "ashinshanaishan-dad93",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "ashinshanaishan-dad93.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "980587112622",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:980587112622:web:a3eccbc7c72d7beb36653f",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-LHEX5KRY9N"
};

// Admin Email Restriction
export const AUTHORIZED_ADMIN_EMAIL = 'ashinshanaishan@gmail.com';

// Check if Firebase credentials are valid
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId
);

let app = null;
let auth = null;
let db = null;
let storage = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  } catch (error) {
    console.warn('Firebase initialization warning:', error.message);
  }
}

export { app, auth, db, storage, googleProvider };
