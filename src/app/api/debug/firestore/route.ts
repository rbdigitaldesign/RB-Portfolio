// src/app/api/debug/firestore/route.ts
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Use a reserved collection name that is NOT blocked: “__debug__”
    const col = adminDb.collection('__debug__');
    const docRef = col.doc('ping');
    // Write a tiny doc with a short TTL-ish marker
    await docRef.set({ at: new Date().toISOString() }, { merge: true });

    // Read it back to prove read access works too
    const snap = await docRef.get();
    const data = snap.exists ? snap.data() : null;

    return NextResponse.json({
      ok: true,
      wrote: Boolean(data),
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}
