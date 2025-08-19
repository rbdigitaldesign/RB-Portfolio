
// This file is intended for server-side use only.
import 'dotenv/config';
import { initializeApp as initializeAdminApp, getApps as getAdminApps, getApp as getAdminAppFromServer, applicationDefault, type App as AdminApp } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';
import { getStorage as getAdminStorageSdk } from 'firebase-admin/storage';

// This is a temporary type definition until the official types are updated
declare module 'firebase-admin/app' {
    function applicationDefault(httpAgent?: any): any;
}

let adminApp: AdminApp;
let adminAuth: ReturnType<typeof import('firebase-admin/auth').getAuth>;
let adminDb: ReturnType<typeof import('firebase-admin/firestore').getFirestore>;
let adminStorage: ReturnType<typeof import('firebase-admin/storage').getStorage>;

// Check if running in a server environment
if (typeof window === 'undefined') {
    try {
        if (!getAdminApps().length) {
            // In a deployed App Hosting environment, applicationDefault() will work without parameters.
            // For local development, you must have GOOGLE_APPLICATION_CREDENTIALS set in your .env file.
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
}

export { 
  adminAuth,
  adminDb,
  adminStorage
};
