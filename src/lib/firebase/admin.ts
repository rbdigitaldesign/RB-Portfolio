
// src/lib/firebase/admin.ts
// Server-only Firebase Admin initialisation for App Hosting and local dev.

import { initializeApp, getApps, App, cert, applicationDefault } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';

// This singleton pattern prevents initializing the app multiple times.
// It's the recommended approach for serverless environments.

let adminApp: App;
let adminAuth: Auth;
let adminDb: Firestore;
let adminStorage: Storage;

try {
    if (getApps().length > 0) {
        adminApp = getApps()[0];
    } else {
        // In a deployed App Hosting environment, applicationDefault() will work without parameters.
        // For local development, you must have GOOGLE_APPLICATION_CREDENTIALS set in your .env file.
        adminApp = initializeApp({
            credential: applicationDefault(),
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        });
    }

    adminAuth = getAuth(adminApp);
    adminDb = getFirestore(adminApp);
    adminStorage = getStorage(adminApp);

} catch (error: any) {
    console.error("Firebase Admin SDK initialization error:", error);
    // Provide non-functional dummies if initialization fails,
    // to prevent the app from crashing during build or rendering.
    // The functions using these will then fail gracefully.
    // @ts-ignore
    adminAuth = {};
    // @ts-ignore
    adminDb = {};
    // @ts-ignore
    adminStorage = {};
}

export { adminAuth, adminDb, adminStorage };
