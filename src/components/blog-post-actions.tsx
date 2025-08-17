
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogPostActionsProps {
  slug: string;
}

export function BlogPostActions({ slug }: BlogPostActionsProps) {
  const { toast } = useToast();
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const handleShare = () => {
    if (!origin) return;
    const postUrl = `${origin}/blog/${slug}`;
    navigator.clipboard.writeText(postUrl)
      .then(() => {
        toast({
          title: 'Link Copied!',
          description: 'The blog post link has been copied to your clipboard.',
        });
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast({
          title: 'Error',
          description: 'Could not copy link to clipboard.',
          variant: 'destructive',
        });
      });
  };

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" onClick={handleShare}>
        <Share2 className="mr-2 h-4 w-4" />
        Share Post
      </Button>
    </div>
  );
}
