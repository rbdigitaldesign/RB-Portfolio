'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { addProject, updateProject } from '@/app/actions/projects';
import type { Project, ProjectCategory } from '@/lib/types';
import { ALL_CATEGORIES, CATEGORY_SECTIONS } from '@/lib/project-categories';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  slug: z.string().optional(),
  category: z.enum([
    'User Experience',
    'Learning Design',
    'Hackathons',
    'Coding Projects',
    'Publications',
  ]),
  summary: z.string().min(5, 'Summary must be at least 5 characters.'),
  tags: z.string().optional(),
  coverImage: z.string().optional(),
  overview: z.string().optional(),
  problem: z.string().optional(),
  process: z.string().optional(),
  outcomes: z.string().optional(),
  role: z.string().optional(),
  year: z.coerce.number().int().min(2000).max(2100),
  duration: z.string().optional(),
  team: z.string().optional(),
  tools: z.string().optional(),
  status: z.enum(['draft', 'published']),
  featured: z.boolean(),
  linkLive: z.string().optional(),
  linkGithub: z.string().optional(),
  linkPage: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
  mode: 'new' | 'edit';
  initialProject?: Project;
}

export default function ProjectForm({ mode, initialProject }: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: FormValues = initialProject
    ? {
        title: initialProject.title,
        slug: initialProject.slug,
        category: initialProject.category,
        summary: initialProject.summary,
        tags: initialProject.tags.join(', '),
        coverImage: initialProject.coverImage || '',
        overview: initialProject.overview || '',
        problem: initialProject.problem || '',
        process: initialProject.process || '',
        outcomes: initialProject.outcomes || '',
        role: initialProject.role || '',
        year: initialProject.year,
        duration: initialProject.duration || '',
        team: initialProject.team || '',
        tools: initialProject.tools.join(', '),
        status: (initialProject.status as 'draft' | 'published') ?? 'published',
        featured: initialProject.featured ?? false,
        linkLive: initialProject.links?.live ?? '',
        linkGithub: initialProject.links?.github ?? '',
        linkPage: initialProject.links?.page ?? '',
      }
    : {
        title: '',
        slug: '',
        category: 'User Experience',
        summary: '',
        tags: '',
        coverImage: '',
        overview: '',
        problem: '',
        process: '',
        outcomes: '',
        role: '',
        year: new Date().getFullYear(),
        duration: '',
        team: '',
        tools: '',
        status: 'published',
        featured: false,
        linkLive: '',
        linkGithub: '',
        linkPage: '',
      };

  const form = useForm<FormValues>({ resolver: zodResolver(formSchema), defaultValues });
  const watchedCategory = form.watch('category') as ProjectCategory;
  const sections = CATEGORY_SECTIONS[watchedCategory] ?? CATEGORY_SECTIONS['User Experience'];

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) formData.append(k, String(v));
    });
    if (mode === 'edit' && initialProject) {
      formData.append('originalSlug', initialProject.slug);
    }

    try {
      const result = mode === 'new' ? await addProject(formData) : await updateProject(formData);
      if (result.success) {
        toast({
          title: mode === 'new' ? 'Project added!' : 'Project updated!',
          description: mode === 'new'
            ? 'The new project is now in your portfolio.'
            : 'Your changes have been saved.',
        });
        router.push('/admin/projects');
        router.refresh();
      } else {
        throw new Error((result as any).error ?? 'Unknown error');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* ── Core info ─────────────────────────────────── */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl><Input placeholder="Project title" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ALL_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="summary" render={({ field }) => (
              <FormItem>
                <FormLabel>Summary *</FormLabel>
                <FormControl><Textarea placeholder="One or two sentence description of the project..." rows={2} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid md:grid-cols-3 gap-6">
              <FormField control={form.control} name="year" render={({ field }) => (
                <FormItem>
                  <FormLabel>Year *</FormLabel>
                  <FormControl><Input type="number" min={2000} max={2100} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="duration" render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl><Input placeholder="e.g. 6 Weeks" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Role</FormLabel>
                  <FormControl><Input placeholder="e.g. UX Designer" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField control={form.control} name="team" render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <FormControl><Input placeholder="e.g. Solo, or team members" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="tools" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tools</FormLabel>
                  <FormControl><Input placeholder="Figma, Miro, Notion (comma-separated)" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="tags" render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl><Input placeholder="UX Design, Research, Figma (comma-separated)" {...field} /></FormControl>
                <FormDescription>Enter tags separated by commas.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="coverImage" render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl><Input placeholder="https://i.imgur.com/..." {...field} /></FormControl>
                <FormDescription>Paste an image URL (Imgur, etc.). Leave blank to use a placeholder.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            {/* ── Category-aware content sections ────────── */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold font-headline border-b pb-2">Content Sections</h3>

              <FormField control={form.control} name="overview" render={({ field }) => (
                <FormItem>
                  <FormLabel>{sections.overview}</FormLabel>
                  <FormControl><Textarea placeholder={`Write the ${sections.overview.toLowerCase()} here...`} rows={4} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="problem" render={({ field }) => (
                <FormItem>
                  <FormLabel>{sections.problem}</FormLabel>
                  <FormControl><Textarea placeholder={`Describe the ${sections.problem.toLowerCase()}...`} rows={4} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="process" render={({ field }) => (
                <FormItem>
                  <FormLabel>{sections.process}</FormLabel>
                  <FormControl><Textarea placeholder={`Describe the ${sections.process.toLowerCase()}...`} rows={5} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="outcomes" render={({ field }) => (
                <FormItem>
                  <FormLabel>{sections.outcomes}</FormLabel>
                  <FormControl><Textarea placeholder={`Describe the ${sections.outcomes.toLowerCase()}...`} rows={4} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* ── Advanced / optional ────────────────────── */}
            <Accordion type="single" collapsible className="border rounded-lg px-4">
              <AccordionItem value="advanced" className="border-none">
                <AccordionTrigger className="text-sm font-medium">Advanced & Links</AccordionTrigger>
                <AccordionContent className="space-y-6 pt-2">
                  <FormField control={form.control} name="slug" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug (auto-generated if blank)</FormLabel>
                      <FormControl><Input placeholder="my-project-slug" {...field} /></FormControl>
                      <FormDescription>URL-safe identifier. Leave blank to auto-generate from title.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField control={form.control} name="linkLive" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Live URL</FormLabel>
                        <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="linkGithub" render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="linkPage" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom page path</FormLabel>
                        <FormControl><Input placeholder="/projects/my-project or https://..." {...field} /></FormControl>
                        <FormDescription>Override the default link for this project card.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="flex gap-8">
                    <FormField control={form.control} name="status" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Draft projects are only visible in admin.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="featured" render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Featured</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormDescription>Featured projects may be highlighted on the homepage.</FormDescription>
                      </FormItem>
                    )} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (mode === 'new' ? 'Adding...' : 'Saving...') : (mode === 'new' ? 'Add Project' : 'Save Changes')}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
