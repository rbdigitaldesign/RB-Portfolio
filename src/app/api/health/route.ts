
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function GET() {
  const hasServiceAccount = !!process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const hasGoogleCreds = !!process.env.GOOGLE_APPLICATION_CREDENTIALS;

  try {
    // Attempt a simple read operation to check connectivity
    await adminDb.doc('__health__/ping').get();
    return NextResponse.json({ 
        firestore: 'ok',
        serviceAccountEnvVar: hasServiceAccount ? 'found' : 'missing',
        googleAppCredsEnvVar: hasGoogleCreds ? 'found' : 'missing'
    });
  } catch (e: any) {
    // Provide a detailed error if the connection fails
    return NextResponse.json(
      { 
        firestore: 'error', 
        detail: String(e?.message || e),
        serviceAccountEnvVar: hasServiceAccount ? 'found' : 'missing',
        googleAppCredsEnvVar: hasGoogleCreds ? 'found' : 'missing',
        hint: 'This could be due to missing or incorrect service account credentials in the preview environment.'
      },
      { status: 500 }
    );
  }
}
