// src/lib/firebase/admin.ts
// Server-only Firebase Admin initialisation.
// On Vercel: set FIREBASE_SERVICE_ACCOUNT_JSON to the full service account JSON content.
// On Firebase App Hosting / local gcloud auth: applicationDefault() is used automatically.

import { getApps, initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

function parseServiceAccountJson(raw: string) {
  // Attempt 1: parse as-is (handles valid JSON, including pretty-printed)
  try {
    const parsed = JSON.parse(raw);
    // Vercel sometimes un-escapes \n sequences inside string values; re-escape them.
    if (parsed.private_key) {
      parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
    }
    return parsed;
  } catch (_e1) {
    // Attempt 2: Vercel may have injected literal newlines inside the private_key value,
    // making the JSON unparseable. Fix by re-escaping newlines within that value only.
    try {
      const fixed = raw.replace(
        /("private_key"\s*:\s*")([\s\S]*?)("[\s\n,}])/,
        (_match, prefix, key, suffix) =>
          prefix + key.replace(/\n/g, '\\n') + suffix
      );
      const parsed = JSON.parse(fixed);
      if (parsed.private_key) {
        parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
      }
      return parsed;
    } catch (e2) {
      console.error(
        'Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON (both attempts). ' +
          'First 120 chars:',
        raw.slice(0, 120)
      );
      console.error(e2);
      return null;
    }
  }
}

function getCredential() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    const parsed = parseServiceAccountJson(json);
    if (parsed) return cert(parsed);
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
