// DO NOT USE 'use server' HERE
// This file is dual-purposed for client and server, and the 'use server'
// directive would break client-side imports.
import 'dotenv/config';
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import type { App as AdminApp } from 'firebase-admin/app';
import type { ServiceAccount } from "firebase-admin";

const firebaseConfig = {
  "projectId": "design-portfolio-v2",
  "appId": "1:738515003817:web:e996b105dcaf8f4e827cb8",
  "storageBucket": "design-portfolio-v2.appspot.com",
  "apiKey": process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  "authDomain": "design-portfolio-v2.firebaseapp.com",
  "messagingSenderId": "738515003817"
};

// --- CLIENT-SIDE ---
// Conditionally initialize and export client-side Firebase services
// to ensure they are only available in the browser.
let app: FirebaseApp;
if (typeof window !== 'undefined') {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
}

// Make auth, db, and storage lazy to avoid initializing them on the server
const auth = typeof window !== 'undefined' ? getAuth(app!) : undefined;
const db = typeof window !== 'undefined' ? getFirestore(app!) : undefined;
const storage = typeof window !== 'undefined' ? getStorage(app!) : undefined;


// --- SERVER-SIDE (ADMIN) ---
// These are only available in a server environment.
let adminApp: AdminApp | undefined;
let adminAuth: ReturnType<typeof import('firebase-admin/auth').getAuth> | undefined;
let adminDb: ReturnType<typeof import('firebase-admin/firestore').getFirestore> | undefined;
let adminStorage: ReturnType<typeof import('firebase-admin/storage').getStorage> | undefined;

if (typeof window === 'undefined') {
  try {
    const { initializeApp: initializeAdminApp, getApps: getAdminApps, getApp: getAdminAppFromServer, credential } = require('firebase-admin/app');
    const { getAuth: getAdminAuth } = require('firebase-admin/auth');
    const { getFirestore: getAdminFirestore } = require('firebase-admin/firestore');
    const { getStorage: getAdminStorageSdk } = require('firebase-admin/storage');

    const getOrCreateAdminApp = (): AdminApp => {
      if (getAdminApps().length > 0) {
        return getAdminAppFromServer();
      }
      
      const serviceAccount: ServiceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      }

      return initializeAdminApp({
        credential: credential.cert(serviceAccount),
        storageBucket: firebaseConfig.storageBucket,
      });
    };

    adminApp = getOrCreateAdminApp();
    adminAuth = getAdminAuth(adminApp);
    adminDb = getAdminFirestore(adminApp);
    adminStorage = getAdminStorageSdk(adminApp);
  } catch (error) {
    console.error("Failed to initialize Firebase Admin SDK:", error);
  }
}

export { 
  app, 
  auth, 
  db, 
  storage,
  adminAuth,
  adminDb,
  adminStorage
};
