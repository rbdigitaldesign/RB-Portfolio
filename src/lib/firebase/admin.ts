// src/lib/firebase/admin.ts
// Server-only Firebase Admin initialisation.
// Prefer service-account JSON if present; otherwise use ADC.
// Never throw at import time.

import { App, getApps, initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

function createAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  // 1) If FIREBASE_SERVICE_ACCOUNT_JSON is set, use it FIRST to avoid ADC flakes.
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
      // Fall through to ADC if secret parsing fails
      console.error('Failed to init Admin with FIREBASE_SERVICE_ACCOUNT_JSON; falling back to ADC:', e);
    }
  }

  // 2) Fallback: ADC (works in prod; can fail in some previews)
  try {
    return initializeApp({
      credential: applicationDefault(),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch {
    // 3) Last resort: lazy-fail when used, not at import time
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
