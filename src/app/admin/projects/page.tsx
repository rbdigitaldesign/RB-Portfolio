'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects, deleteProject } from '@/app/actions/projects';
import type { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Pencil, Trash2, Eye, ExternalLink } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CATEGORY_COLORS } from '@/lib/project-categories';

export default function AdminProjectsPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    const all = await getAllProjects();
    setProjects(all);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (slug: string, title: string) => {
    const result = await deleteProject(slug);
    if (result.success) {
      toast({ title: 'Project deleted', description: `"${title}" has been removed.` });
      setProjects((prev) => prev.filter((p) => p.slug !== slug));
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
  };

  const byCategory = projects.reduce<Record<string, Project[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <div className="container mx-auto max-w-5xl py-16 px-4">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold font-headline">Project Management</h1>
          <p className="text-xl text-muted-foreground">Add, edit, and organise your portfolio projects.</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Project
          </Link>
        </Button>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(byCategory).map(([category, catProjects]) => (
            <section key={category}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold font-headline">{category}</h2>
                <Badge
                  className={`${CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]?.badge ?? 'bg-muted text-muted-foreground'}`}
                >
                  {catProjects.length}
                </Badge>
              </div>
              <Card>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {catProjects.map((project) => (
                      <li key={project.slug} className="flex items-center gap-4 p-4">
                        <div className="relative h-14 w-24 rounded overflow-hidden shrink-0 bg-muted">
                          {project.coverImage && (
                            <Image
                              src={project.coverImage}
                              alt={project.title}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold truncate">{project.title}</span>
                            {project.status === 'draft' && (
                              <Badge variant="outline" className="text-xs text-amber-600 border-amber-400">
                                Draft
                              </Badge>
                            )}
                            {project.featured && (
                              <Badge variant="secondary" className="text-xs">Featured</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate mt-0.5">{project.summary}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{project.year}</span>
                            {project.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs py-0 px-1.5">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={project.links?.page || `/projects/${project.slug}`} target="_blank">
                              <Eye className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/projects/edit/${project.slug}`}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete "{project.title}"?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove this project from your portfolio. This cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(project.slug, project.title)}>
                                  Yes, delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No projects yet. Add your first one!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
