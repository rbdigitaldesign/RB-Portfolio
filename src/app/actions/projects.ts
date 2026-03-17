'use server';

import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import type { Project, ProjectCategory } from '@/lib/types';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'projects.json');

async function readProjects(): Promise<Project[]> {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as Project[];
}

async function writeProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2), 'utf-8');
}

const CATEGORIES: ProjectCategory[] = [
  'User Experience',
  'Learning Design',
  'Hackathons',
  'Coding Projects',
  'Publications',
];

const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  category: z.enum([
    'User Experience',
    'Learning Design',
    'Hackathons',
    'Coding Projects',
    'Publications',
  ]),
  summary: z.string().min(5, 'Summary must be at least 5 characters.'),
  tags: z.string().optional(), // comma-separated
  coverImage: z.string().url('Cover image must be a valid URL.').or(z.literal('')),
  overview: z.string().optional().default(''),
  problem: z.string().optional().default(''),
  process: z.string().optional().default(''),
  outcomes: z.string().optional().default(''),
  role: z.string().optional().default(''),
  year: z.coerce.number().int().min(2000).max(2100),
  duration: z.string().optional().default(''),
  team: z.string().optional().default(''),
  tools: z.string().optional(), // comma-separated
  status: z.enum(['draft', 'published']).default('published'),
  featured: z.boolean().default(false),
  linkLive: z.string().url().optional().or(z.literal('')),
  linkGithub: z.string().url().optional().or(z.literal('')),
  linkPage: z.string().optional().or(z.literal('')),
});

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function formDataToRaw(formData: FormData) {
  return {
    slug: formData.get('slug') as string,
    title: formData.get('title') as string,
    category: formData.get('category') as string,
    summary: formData.get('summary') as string,
    tags: formData.get('tags') as string,
    coverImage: (formData.get('coverImage') as string) || '',
    overview: (formData.get('overview') as string) || '',
    problem: (formData.get('problem') as string) || '',
    process: (formData.get('process') as string) || '',
    outcomes: (formData.get('outcomes') as string) || '',
    role: (formData.get('role') as string) || '',
    year: formData.get('year') as string,
    duration: (formData.get('duration') as string) || '',
    team: (formData.get('team') as string) || '',
    tools: (formData.get('tools') as string) || '',
    status: (formData.get('status') as string) || 'published',
    featured: formData.get('featured') === 'true',
    linkLive: (formData.get('linkLive') as string) || '',
    linkGithub: (formData.get('linkGithub') as string) || '',
    linkPage: (formData.get('linkPage') as string) || '',
  };
}

function buildProject(parsed: z.infer<typeof projectSchema>): Project {
  const project: Project = {
    slug: parsed.slug,
    title: parsed.title,
    category: parsed.category,
    summary: parsed.summary,
    tags: parsed.tags?.split(',').map((t) => t.trim()).filter(Boolean) ?? [],
    coverImage: parsed.coverImage || 'https://placehold.co/1200x675.png',
    gallery: [],
    overview: parsed.overview,
    problem: parsed.problem,
    process: parsed.process,
    outcomes: parsed.outcomes,
    role: parsed.role,
    year: parsed.year,
    duration: parsed.duration,
    team: parsed.team,
    tools: parsed.tools?.split(',').map((t) => t.trim()).filter(Boolean) ?? [],
    status: parsed.status,
    featured: parsed.featured,
  };

  const links: Project['links'] = {};
  if (parsed.linkLive) links.live = parsed.linkLive;
  if (parsed.linkGithub) links.github = parsed.linkGithub;
  if (parsed.linkPage) links.page = parsed.linkPage;
  if (Object.keys(links).length > 0) project.links = links;

  return project;
}

// ---- reads ----

export async function getAllProjects(): Promise<Project[]> {
  return readProjects();
}

export async function getProject(slug: string): Promise<Project | null> {
  const projects = await readProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

// ---- create ----

export async function addProject(formData: FormData) {
  const raw = formDataToRaw(formData);

  // Auto-generate slug from title if not provided
  if (!raw.slug || raw.slug.trim() === '') {
    raw.slug = createSlug(raw.title);
  }

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
    };
  }

  const projects = await readProjects();

  if (projects.some((p) => p.slug === parsed.data.slug)) {
    return {
      success: false,
      error: `A project with slug "${parsed.data.slug}" already exists. Change the title or provide a unique slug.`,
    };
  }

  const newProject = buildProject(parsed.data);
  projects.push(newProject);
  await writeProjects(projects);

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  revalidatePath(`/projects/${newProject.slug}`);
  revalidatePath('/');

  return { success: true, project: newProject };
}

// ---- update ----

export async function updateProject(formData: FormData) {
  const originalSlug = formData.get('originalSlug') as string;
  const raw = formDataToRaw(formData);

  if (!raw.slug || raw.slug.trim() === '') {
    raw.slug = createSlug(raw.title);
  }

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
    };
  }

  const projects = await readProjects();
  const idx = projects.findIndex((p) => p.slug === originalSlug);

  if (idx === -1) {
    return { success: false, error: `Project with slug "${originalSlug}" not found.` };
  }

  // Check slug uniqueness if slug changed
  if (parsed.data.slug !== originalSlug && projects.some((p, i) => p.slug === parsed.data.slug && i !== idx)) {
    return {
      success: false,
      error: `A project with slug "${parsed.data.slug}" already exists.`,
    };
  }

  // Preserve gallery from existing project
  const existing = projects[idx];
  const updatedProject = buildProject(parsed.data);
  updatedProject.gallery = existing.gallery ?? [];

  projects[idx] = updatedProject;
  await writeProjects(projects);

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  revalidatePath(`/projects/${originalSlug}`);
  revalidatePath(`/projects/${updatedProject.slug}`);
  revalidatePath('/');

  return { success: true, project: updatedProject };
}

// ---- delete ----

export async function deleteProject(slug: string) {
  const projects = await readProjects();
  const idx = projects.findIndex((p) => p.slug === slug);

  if (idx === -1) {
    return { success: false, error: `Project with slug "${slug}" not found.` };
  }

  projects.splice(idx, 1);
  await writeProjects(projects);

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  revalidatePath(`/projects/${slug}`);
  revalidatePath('/');

  return { success: true };
}

// ---- reorder ----

export async function reorderProjects(slugs: string[]) {
  const projects = await readProjects();
  const projectMap = new Map(projects.map((p) => [p.slug, p]));

  const reordered = slugs
    .map((slug) => projectMap.get(slug))
    .filter((p): p is Project => p !== undefined);

  // Append any projects not in the slugs list at the end
  const inList = new Set(slugs);
  const remainder = projects.filter((p) => !inList.has(p.slug));

  await writeProjects([...reordered, ...remainder]);

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  revalidatePath('/');

  return { success: true };
}
