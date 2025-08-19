import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function GET() {
  try {
    // Attempt a simple read operation to check connectivity
    await adminDb.doc('__health__/ping').get();
    return NextResponse.json({ firestore: 'ok' });
  } catch (e: any) {
    // Provide a detailed error if the connection fails
    return NextResponse.json(
      { 
        firestore: 'error', 
        detail: String(e?.message || e),
        // Include a hint about the likely cause for easier debugging
        hint: 'This could be due to missing or incorrect service account credentials in the preview environment.'
      },
      { status: 500 }
    );
  }
}
