// src/lib/firebase/admin.ts
import { App, getApps, initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

function createAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  // 1) try ADC first
  try {
    return initializeApp({
      credential: applicationDefault(),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (_adcError) {
    // 2) fallback to secret if present
    const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (json) {
      const sa = JSON.parse(json);
      return initializeApp({
        credential: cert({
          projectId: sa.project_id ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: sa.client_email,
          privateKey: sa.private_key?.replace(/\\n/g, '\n'),
        }),
        projectId: sa.project_id ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }
    // 3) lazy-fail only when used
    const msg = 'Firebase Admin not initialised: ADC unavailable and FIREBASE_SERVICE_ACCOUNT_JSON not set.';
    // @ts-ignore
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
