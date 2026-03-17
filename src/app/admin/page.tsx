'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { FileText, Newspaper, FolderKanban, ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/app/actions/blog";
import { getAllProjects } from "@/app/actions/projects";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
}

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [posts, projects] = await Promise.all([getAllPosts(), getAllProjects()]);
        setStats({
          totalPosts: posts.length,
          publishedPosts: posts.filter((p) => !p.status || p.status === 'published').length,
          draftPosts: posts.filter((p) => p.status === 'draft').length,
          totalProjects: projects.length,
          publishedProjects: projects.filter((p) => !p.status || p.status === 'published').length,
          draftProjects: projects.filter((p) => p.status === 'draft').length,
        });
      } catch (e) {
        console.error('Failed to load stats', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="container mx-auto max-w-5xl py-16 px-4">
      <header className="flex justify-between items-center mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard className="h-6 w-6 text-muted-foreground" />
            <h1 className="text-4xl font-bold font-headline">Admin Dashboard</h1>
          </div>
          {user && (
            <p className="text-lg text-muted-foreground">
              Welcome back, <span className="font-medium text-foreground">{user.email}</span>
            </p>
          )}
        </div>
      </header>

      {/* Stats strip */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
      ) : stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Posts" value={stats.totalPosts} />
          <StatCard label="Published Posts" value={stats.publishedPosts} accent="green" />
          <StatCard label="Total Projects" value={stats.totalProjects} />
          <StatCard label="Draft Items" value={stats.draftPosts + stats.draftProjects} accent={stats.draftPosts + stats.draftProjects > 0 ? "amber" : "default"} />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <ManagementCard
          icon={<Newspaper className="h-6 w-6" />}
          title="Blog Posts"
          description="Write, edit, and publish blog articles. Set posts as draft while you work on them."
          href="/admin/blog"
          stats={stats ? [
            { label: 'Published', value: stats.publishedPosts, color: 'green' },
            { label: 'Drafts', value: stats.draftPosts, color: 'amber' },
          ] : undefined}
          isLoading={isLoading}
        />

        <ManagementCard
          icon={<FolderKanban className="h-6 w-6" />}
          title="Portfolio Projects"
          description="Add and edit portfolio projects. Each category has its own content template."
          href="/admin/projects"
          stats={stats ? [
            { label: 'Published', value: stats.publishedProjects, color: 'green' },
            { label: 'Drafts', value: stats.draftProjects, color: 'amber' },
          ] : undefined}
          isLoading={isLoading}
        />
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <FileText className="h-5 w-5" />
            Quick Links
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/blog" target="_blank">View Blog</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects" target="_blank">View Projects</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/blog/new">New Blog Post</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/projects/new">New Project</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = 'default',
}: {
  label: string;
  value: number;
  accent?: 'green' | 'amber' | 'default';
}) {
  const colors = {
    green: 'text-emerald-600 dark:text-emerald-400',
    amber: 'text-amber-600 dark:text-amber-400',
    default: 'text-foreground',
  };
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${colors[accent]}`}>{value}</p>
    </div>
  );
}

function ManagementCard({
  icon,
  title,
  description,
  href,
  stats,
  isLoading,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  stats?: { label: string; value: number; color: string }[];
  isLoading: boolean;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        {isLoading ? (
          <Skeleton className="h-6 w-32" />
        ) : stats && (
          <div className="flex gap-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <span className={`text-sm font-semibold ${s.color === 'green' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {s.value}
                </span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        )}
        <Button asChild className="mt-auto">
          <Link href={href}>
            Manage {title}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
