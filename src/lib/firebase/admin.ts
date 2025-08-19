// src/lib/firebase/admin.ts
// Server-only Firebase Admin initialisation for App Hosting and local dev.
import { initializeApp, getApps, App, cert, applicationDefault } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';

function initAdmin(): App {
  const existingApp = getApps().find((app) => app.name === '[DEFAULT]');
  if (existingApp) {
    return existingApp;
  }

  // Try Application Default Credentials first (for production App Hosting)
  try {
    return initializeApp({
      credential: applicationDefault(),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (e: any) {
    console.warn('Application Default Credentials failed, trying service account fallback.', e.message);
    
    // Fallback to service account JSON from environment variable (for local/preview)
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJson) {
        console.error('Firebase Admin SDK initialization failed. Application Default Credentials failed and FIREBASE_SERVICE_ACCOUNT_JSON is not set.');
        throw new Error('Could not initialize Firebase Admin SDK.');
    }

    try {
        const serviceAccount = JSON.parse(serviceAccountJson);
        return initializeApp({
            credential: cert(serviceAccount),
            projectId: serviceAccount.project_id ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        });
    } catch (parseError: any) {
        console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON.', parseError.message);
        throw new Error('Could not initialize Firebase Admin SDK due to invalid service account JSON.');
    }
  }
}

const adminApp: App = initAdmin();
const adminAuth: Auth = getAuth(adminApp);
const adminDb: Firestore = getFirestore(adminApp);
const adminStorage: Storage = getStorage(adminApp);

export { adminAuth, adminDb, adminStorage };
