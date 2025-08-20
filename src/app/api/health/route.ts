// src/app/api/health/route.ts
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

// Ensure the route always runs dynamically (not during build)
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Try a harmless read from Firestore
    await adminDb.doc('health/ping').get();
    return NextResponse.json({ firestore: 'ok' });
  } catch (e: any) {
    return NextResponse.json(
      { firestore: 'error', detail: String(e?.message || e) },
      { status: 500 }
    );
  }
}
