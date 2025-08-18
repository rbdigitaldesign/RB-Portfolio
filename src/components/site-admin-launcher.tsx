'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Settings } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function SiteAdminLauncher() {
  const { user, loading, login } = useAuth();
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  if (loading) return <Skeleton className="h-9 w-28" />;

  // signed in: show menu
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Site admin
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/admin/blog">Blog management</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/admin/projects">Project management</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // signed out: open sign-in dialog on click
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpenSignIn(true)}
        aria-haspopup="dialog"
      >
        <Settings className="mr-2 h-4 w-4" />
        Site admin
      </Button>

      <Dialog open={openSignIn} onOpenChange={setOpenSignIn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to continue</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                try {
                  setSubmitting(true);
                  await login(email, pass);
                  toast({ title: 'Signed in', description: 'Welcome back.' });
                  setOpenSignIn(false);
                  router.refresh();
                } catch (err: any) {
                  const errorMessage = (err.code === 'auth/invalid-credential') 
                    ? 'Invalid email or password. Please try again.'
                    : (err.message ?? 'An unknown error occurred.');

                  toast({
                    title: 'Sign-in failed',
                    description: errorMessage,
                    variant: 'destructive',
                  });
                } finally {
                  setSubmitting(false);
                }
              }}
              disabled={submitting || !email || !pass}
            >
              {submitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
