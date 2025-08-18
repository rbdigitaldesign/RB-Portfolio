
'use client';

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "design-portfolio-v2.firebaseapp.com",
  projectId: "design-portfolio-v2",
  storageBucket: "design-portfolio-v2.appspot.com",
  messagingSenderId: "738515003817",
  appId: "1:738515003817:web:e996b105dcaf8f4e827cb8"
};

// Initialize Firebase for client side
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const getClientApp = () => app;
