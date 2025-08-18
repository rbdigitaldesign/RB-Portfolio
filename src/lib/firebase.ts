
'use server';

import { initializeApp, getApps, getApp, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { 
  getFirestore as getAdminFirestore, 
  initializeFirestore,
} from 'firebase-admin/firestore';
import { getStorage as getAdminStorage } from 'firebase-admin/storage';
import { initializeApp as initializeAdminApp, getApps as getAdminApps, getApp as getAdminAppFromServer, App } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { ServiceAccount } from "firebase-admin";

const firebaseConfig = {
  "projectId": "design-portfolio-v2",
  "appId": "1:738515003817:web:e996b105dcaf8f4e827cb8",
  "storageBucket": "design-portfolio-v2.appspot.com",
  "apiKey": "AIzaSyAm2iVhW1oc70gRXxet1ocqz4NCF1cG1xY",
  "authDomain": "design-portfolio-v2.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "738515003817"
};

// Client-side Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


// Server-side Firebase app (Admin SDK)
const getAdminApp = (): App => {
  if (getAdminApps().length > 0) {
    return getAdminAppsFromServer();
  }
  
  const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  }

  return initializeAdminApp({
    credential: {
      projectId: serviceAccount.projectId,
      clientEmail: serviceAccount.clientEmail,
      privateKey: serviceAccount.privateKey,
    },
    storageBucket: firebaseConfig.storageBucket,
  });
};

const adminApp = getAdminApp();
const adminAuth = getAdminAuth(adminApp);
const adminDb = getAdminFirestore(adminApp);
const adminStorage = getAdminStorage(adminApp);

export { 
  app, 
  auth, 
  db, 
  storage,
  adminAuth,
  adminDb,
  adminStorage
};
