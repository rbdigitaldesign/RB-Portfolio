// src/lib/firebase/admin.ts
// Prefer service-account JSON when present; fall back to ADC.
// Never throw at import time.

import { App, getApps, initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

function createAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  // Prefer secret if present (stable in previews)
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    try {
      const sa = JSON.parse(json);
      return initializeApp({
        credential: cert({
          projectId: sa.project_id ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: sa.client_email,
          privateKey: (sa.private_key || '').replace(/\\n/g, '\n'),
        }),
        projectId: sa.project_id ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON; falling back to ADC:', e);
    }
  }

  // Fallback: ADC (works in prod; can be flaky in previews)
  try {
    return initializeApp({
      credential: applicationDefault(),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch {
    const msg = 'Firebase Admin not initialised: no service account JSON and ADC unavailable.';
    // @ts-ignore minimal App-like object that throws when used
    return {
      get name() { throw new Error(msg); },
      options: {},
      automaticDataCollectionEnabled: false,
      delete: async () => { throw new Error(msg); },
    } as App;
  }
}

const app = createAdminApp();

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
export const adminStorage = getStorage(app);
