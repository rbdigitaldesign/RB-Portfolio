
// This file is intended for server-side use only.
import 'dotenv/config';
import type { App as AdminApp } from 'firebase-admin/app';
import { initializeApp as initializeAdminApp, getApps as getAdminApps, getApp as getAdminAppFromServer, applicationDefault } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';
import { getStorage as getAdminStorageSdk } from 'firebase-admin/storage';

let adminApp: AdminApp;
let adminAuth: ReturnType<typeof import('firebase-admin/auth').getAuth> | undefined;
let adminDb: ReturnType<typeof import('firebase-admin/firestore').getFirestore> | undefined;
let adminStorage: ReturnType<typeof import('firebase-admin/storage').getStorage> | undefined;

// Check if running in a server environment with the necessary variables
if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
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
} else if (process.env.NODE_ENV !== 'production') {
    // Fallback for local development if needed, e.g., using a service account file
    // For now, we will log a warning if not in production.
    console.warn("Firebase Admin SDK not initialized in non-production server environment. This is expected for client-side rendering.");
}


export { adminAuth, adminDb, adminStorage };
