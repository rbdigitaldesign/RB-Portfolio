
// This file is intended for server-side use only.
import 'dotenv/config';
import type { App as AdminApp } from 'firebase-admin/app';
import type { ServiceAccount } from "firebase-admin";
import { initializeApp as initializeAdminApp, getApps as getAdminApps, getApp as getAdminAppFromServer, credential } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';
import { getStorage as getAdminStorageSdk } from 'firebase-admin/storage';


// These are only available in a server environment.
let adminApp: AdminApp | undefined;
let adminAuth: ReturnType<typeof import('firebase-admin/auth').getAuth> | undefined;
let adminDb: ReturnType<typeof import('firebase-admin/firestore').getFirestore> | undefined;
let adminStorage: ReturnType<typeof import('firebase-admin/storage').getStorage> | undefined;


const hasServiceAccount =
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

if (hasServiceAccount) {
    try {
        const serviceAccount: ServiceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
        };

        if (!getAdminApps().length) {
            adminApp = initializeAdminApp({
                credential: credential.cert(serviceAccount),
                storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            });
        } else {
            adminApp = getAdminAppFromServer();
        }

        adminAuth = getAdminAuth(adminApp);
        adminDb = getAdminFirestore(adminApp);
        adminStorage = getAdminStorageSdk(adminApp);

    } catch (error) {
        console.error("Failed to initialize Firebase Admin SDK:", error);
    }
} else {
    console.warn("Firebase Admin SDK not initialized. Missing environment variables.");
}

export { 
  adminAuth,
  adminDb,
  adminStorage
};
