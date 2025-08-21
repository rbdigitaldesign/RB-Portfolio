'use client';

import { useState, useTransition } from 'react';
import { migrateMarkdownToHtmlOnce } from '@/app/actions/migrations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MigrateMarkdownPage() {
  const [pending, start] = useTransition();
  const [result, setResult] = useState<{ migrated: number } | null>(null);

  return (
    <div className="container max-w-xl py-12">
      <h1 className="text-2xl font-bold mb-4">Migrate Markdown → HTML</h1>
      <p className="text-muted-foreground mb-6">
        Converts posts that have legacy <code>content</code> (Markdown) into
        sanitized <code>contentHtml</code>. Safe to run multiple times.
      </p>
      <Button
        onClick={() => start(async () => setResult(await migrateMarkdownToHtmlOnce()))}
        disabled={pending}
      >
        {pending ? 'Migrating…' : 'Run migration'}
      </Button>

      {result && (
        <div className="mt-4 p-4 border rounded-lg bg-muted/50">
          <p >
            Migrated <strong>{result.migrated}</strong> posts. You can now verify the posts and then remove this migration tool.
          </p>
           <Button variant="link" asChild className="mt-2 px-0">
             <Link href="/admin/blog">Back to Blog Management</Link>
           </Button>
        </div>
      )}
    </div>
  );
}
