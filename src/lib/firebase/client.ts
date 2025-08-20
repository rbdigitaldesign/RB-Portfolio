'use client';

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const cfg = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!, // now appspot.com
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Optional: fail fast in dev if any env is missing
if (process.env.NODE_ENV !== 'production') {
  for (const [k, v] of Object.entries(cfg)) {
    if (!v) throw new Error(`Missing env var for Firebase client config: ${k}`);
  }
}

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(cfg);

export const clientApp = app;
export const clientAuth = getAuth(app);
export const clientDb = getFirestore(app);
export const clientStorage = getStorage(app); // uses cfg.storageBucket
