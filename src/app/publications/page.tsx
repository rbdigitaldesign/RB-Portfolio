
import { getAllPublications } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publications — Rich Bartlett',
  description: 'Academic papers, conference publications, and working papers by Rich Bartlett.',
};

const STATUS_LABEL: Record<string, string> = {
  published: 'Published',
  unpublished: 'In Review',
};

export default function PublicationsPage() {
  const publications = getAllPublications();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="border-b border-border pb-10 mb-12">
        <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
          Publications
        </p>
        <h1 className="text-4xl md:text-5xl font-headline font-semibold max-w-2xl leading-tight">
          Research &amp; academic writing.
        </h1>
      </header>

      {publications.length === 0 && (
        <p className="text-muted-foreground">No publications yet.</p>
      )}

      <div className="divide-y divide-border">
        {publications.map((pub) => (
          <div key={pub.slug} className="py-8 grid md:grid-cols-[1fr_auto] gap-6 items-start">
            <div>
              {/* Year · Venue */}
              <p className="text-sm text-muted-foreground font-mono mb-2">
                {pub.year}
                {pub.venue && <> · {pub.venue}</>}
              </p>

              {/* Title */}
              <h2 className="font-headline font-semibold text-xl leading-snug mb-2">
                {pub.url ? (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </h2>

              {/* Collaborators */}
              {pub.collaborators && (
                <p className="text-sm text-muted-foreground mb-3">{pub.collaborators}</p>
              )}

              {/* Abstract */}
              {pub.abstract && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {pub.abstract}
                </p>
              )}
            </div>

            {/* Status badge */}
            <span
              className={
                pub.status === 'published'
                  ? 'text-xs font-medium px-2.5 py-1 bg-primary text-primary-foreground uppercase tracking-wider whitespace-nowrap'
                  : 'text-xs font-medium px-2.5 py-1 bg-muted text-muted-foreground uppercase tracking-wider whitespace-nowrap'
              }
            >
              {STATUS_LABEL[pub.status] ?? pub.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
