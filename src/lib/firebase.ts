
// This file is intended for server-side use only.
import 'dotenv/config';
import type { App as AdminApp } from 'firebase-admin/app';
import { initializeApp as initializeAdminApp, getApps as getAdminApps, getApp as getAdminAppFromServer, applicationDefault } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';
import { getStorage as getAdminStorageSdk } from 'firebase-admin/storage';


// These are only available in a server environment.
let adminApp: AdminApp;
let adminAuth: ReturnType<typeof import('firebase-admin/auth').getAuth>;
let adminDb: ReturnType<typeof import('firebase-admin/firestore').getFirestore>;
let adminStorage: ReturnType<typeof import('firebase-admin/storage').getStorage>;

try {
    if (!getAdminApps().length) {
        adminApp = initializeAdminApp({
            credential: applicationDefault(),
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        });
    } else {
        adminApp = getAdminAppFromServer();
    }

    adminAuth = getAdminAuth(adminApp);
    adminDb = getAdminFirestore(adminApp);
    adminStorage = getAdminStorageSdk(adminApp);

} catch (error) {
    console.error("Firebase Admin SDK initialization error:", error);
}

export { 
  adminAuth,
  adminDb,
  adminStorage
};

