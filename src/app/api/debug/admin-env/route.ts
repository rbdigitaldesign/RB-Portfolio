// src/app/api/debug/admin-env/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '';
  const snippet = json ? json.slice(0, 40) + '...' : null;

  return NextResponse.json({
    secretPresent: Boolean(json),
    snippet, // first 40 chars only
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || null,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || null,
    nodeEnv: process.env.NODE_ENV || null,
  });
}
