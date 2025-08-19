// src/lib/firebase/admin.ts
// Server-only Firebase Admin initialisation for App Hosting and local dev.
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';

function initAdmin(): App {
  const existingApp = getApps().find((app) => app.name === '[DEFAULT]');
  if (existingApp) {
    return existingApp;
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!serviceAccountJson) {
    // This will now be the primary error if the secret is not set up correctly.
    throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set. Please add it to your secrets.');
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountJson);
    
    // Explicitly using the parsed service account. This is the most reliable method.
    const app = initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
    console.log('Firebase Admin initialized with service account.');
    return app;
  } catch (parseError: any) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON.', parseError.message);
    throw new Error('Could not initialize Firebase Admin SDK due to invalid service account JSON.');
  }
}

const adminApp: App = initAdmin();
const adminAuth: Auth = getAuth(adminApp);
const adminDb: Firestore = getFirestore(adminApp);
const adminStorage: Storage = getStorage(adminApp);

export { adminAuth, adminDb, adminStorage };
