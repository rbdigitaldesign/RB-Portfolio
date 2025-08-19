// src/lib/firebase/admin.ts
// Server-only Firebase Admin initialisation for App Hosting and local dev.

import { getApps, initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

// Initialise once per process. Works on Firebase App Hosting via ADC (no JSON key).
const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: applicationDefault(),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
export const adminStorage = getStorage(app);

// Optional: avoid Firestore rejecting undefineds in server objects
// adminDb.settings({ ignoreUndefinedProperties: true });
