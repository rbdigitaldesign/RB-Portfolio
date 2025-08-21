'use server';

import { adminDb } from '@/lib/firebase/admin';
import { mdToHtmlSafe } from '@/lib/md';

export async function migrateMarkdownToHtmlOnce() {
  // lock to owner in prod if you have auth; otherwise leave as-is for now
  const snap = await adminDb.collection('posts').get();

  const updates: Array<Promise<any>> = [];
  snap.forEach(doc => {
    const d = doc.data() as any;
    const hasMd = typeof d.content === 'string' && d.content.trim().length > 0;
    const missingHtml = !d.contentHtml || d.contentHtml.trim().length === 0;

    if (hasMd && missingHtml) {
      const html = mdToHtmlSafe(d.content);
      updates.push(doc.ref.update({
        contentHtml: html,
        migratedAt: new Date(),
      }));
    }
  });

  await Promise.all(updates);
  return { migrated: updates.length };
}
