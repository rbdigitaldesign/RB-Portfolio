
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "projectId": "design-portfolio-v2",
  "appId": "1:738515003817:web:e996b105dcaf8f4e827cb8",
  "storageBucket": "design-portfolio-v2.firebasestorage.app",
  "apiKey": "AIzaSyAm2iVhW1oc70gRXxet1ocqz4NCF1cG1xY",
  "authDomain": "design-portfolio-v2.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "738515003817"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
