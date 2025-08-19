// This file is intended for server-side use only.
import 'dotenv/config';
import type { App as AdminApp } from 'firebase-admin/app';
import type { ServiceAccount } from "firebase-admin";

// These are only available in a server environment.
let adminApp: AdminApp | undefined;
let adminAuth: ReturnType<typeof import('firebase-admin/auth').getAuth> | undefined;
let adminDb: ReturnType<typeof import('firebase-admin/firestore').getFirestore> | undefined;
let adminStorage: ReturnType<typeof import('firebase-admin/storage').getStorage> | undefined;

// Check if the required environment variables are available.
const hasServiceAccount =
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

// Only initialize the admin SDK if the service account details are present.
// This prevents build errors in environments where they might be missing.
if (hasServiceAccount) {
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
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          });
        };

        adminApp = getOrCreateAdminApp();
        adminAuth = getAdminAuth(adminApp);
        adminDb = getAdminFirestore(adminApp);
        adminStorage = getAdminStorageSdk(adminApp);
    } catch (error) {
        console.error("Failed to initialize Firebase Admin SDK:", error);
    }
} else if (process.env.NODE_ENV !== 'test') { // Don't warn in test environments
    console.warn("Firebase Admin SDK not initialized. Missing environment variables. This is expected during client-side rendering and build processes.");
}

export { 
  adminAuth,
  adminDb,
  adminStorage
};
