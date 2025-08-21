// src/lib/firebase/admin.ts
// Server-only Firebase Admin initialisation for Firebase App Hosting (preview + prod).
// Uses Application Default Credentials (no JSON keys).

import { getApps, initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: applicationDefault(), // App Hosting provides this automatically
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
export const adminStorage = getStorage(app);

// Optional: ignore undefined fields if you ever pass server objects with missing props
// adminDb.settings({ ignoreUndefinedProperties: true });
