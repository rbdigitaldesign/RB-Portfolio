// src/lib/firebase/admin.ts
// Server-only Firebase Admin initialisation.
// On Vercel: set FIREBASE_SERVICE_ACCOUNT_JSON to the full service account JSON content.
// On Firebase App Hosting / local gcloud auth: applicationDefault() is used automatically.

import { getApps, initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

function getCredential() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    try {
      return cert(JSON.parse(json));
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', e);
    }
  }
  return applicationDefault();
}

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: getCredential(),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
export const adminStorage = getStorage(app);
