
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { adminDb, adminStorage } from '@/lib/firebase/admin';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import type { Post } from '@/lib/types';
import { sanitizeHtml } from '@/lib/sanitize';
import { mdToHtmlSafe } from '@/lib/md';

// --- helpers -----------------------------------------------------------------

const createSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

/** Estimate reading time in minutes (avg 200 wpm). */
function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const tagsSchema = z
  .string()
  .refine(
    (value) => !value || value.split(',').map((t) => t.trim()).filter(Boolean).length <= 6,
    { message: 'You can add a maximum of 6 tags.' }
  )
  .optional();

// Firestore collection (server/Admin SDK). Fail softly and report later.
const postsCol = () => {
  try {
    return adminDb.collection('posts');
  } catch (e) {
    console.error('Failed to get Firestore collection:', e);
    return null;
  }
};


// --- validation schemas ------------------------------------------------------

const addPostSchema = z.object({
  title: z.string().min(3),
  summary: z.string().min(3),
  contentHtml: z.string().min(1, 'Content is required.'),
  tags: tagsSchema,
  series: z.string().optional(),
  publishedDate: z.string().datetime('Invalid date format').optional(),
  coverImageType: z.enum(['url', 'upload']),
  coverImageUrl: z.string().optional(),
  status: z.enum(['draft', 'published']).optional().default('published'),
});


const updatePostSchema = z.object({
  postId: z.string(),
  originalSlug: z.string(),
  title: z.string().min(3),
  summary: z.string().min(3),
  contentHtml: z.string().optional(),
  content: z.string().optional().nullable(), // legacy
  tags: tagsSchema,
  series: z.string().optional(),
  publishedDate: z.string().datetime('Invalid date format').optional(),
  coverImageType: z.enum(['url', 'upload']),
  coverImageUrl: z.string().optional(),
  status: z.enum(['draft', 'published']).optional().default('published'),
}).refine(d => (d.contentHtml && d.contentHtml.trim().length > 0) || (d.content && d.content.trim().length > 0), {
  message: 'Content required (HTML or legacy Markdown).',
  path: ['contentHtml'],
});


// --- reads -------------------------------------------------------------------

/** Get all posts (admin — includes drafts). */
export async function getAllPosts(): Promise<Post[]> {
  const col = postsCol();
  if (!col) return []; // Firestore not available (e.g., during build)
  const snap = await col.orderBy('publishedDate', 'desc').get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as Post));
}

/** Get only published posts (public-facing pages). */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => !p.status || p.status === 'published');
}

export async function getPost(slug: string): Promise<Post | null> {
  const col = postsCol();
  if (!col) return null;
  const snap = await col.where('slug', '==', slug).limit(1).get();
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...(d.data() as any) } as Post;
}

export async function getPostsBySeries(series: string): Promise<Post[]> {
  const col = postsCol();
  if (!col) return [];
  const snap = await col
    .where('series', '==', series)
    .orderBy('publishedDate', 'asc') // Order chronologically for a series
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as Post));
}

// --- create ------------------------------------------------------------------

export async function addPost(formData: FormData) {
  const col = postsCol();
  if (!col) {
    return { success: false, error: 'Database service is not available.' };
  }

  const raw = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    contentHtml: formData.get('contentHtml'),
    tags: formData.get('tags'),
    series: formData.get('series'),
    publishedDate: formData.get('publishedDate'),
    coverImageType: formData.get('coverImageType'),
    coverImageUrl: formData.get('coverImageUrl'),
    coverImageFile: formData.get('coverImageFile'),
    status: formData.get('status') || 'published',
  };

  const parsed = addPostSchema.safeParse({
    title: raw.title,
    summary: raw.summary,
    contentHtml: raw.contentHtml,
    tags: raw.tags,
    series: raw.series,
    publishedDate: raw.publishedDate,
    coverImageType: raw.coverImageType,
    coverImageUrl: raw.coverImageUrl,
    status: raw.status,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
    };
  }

  const { title, summary, contentHtml, coverImageType, coverImageUrl, publishedDate, series, status } = parsed.data;
  
  const slug = createSlug(title);
  let finalCoverImageUrl = 'https://placehold.co/1200x675.png';

  const tagsArray =
    parsed.data.tags?.split(',').map((t) => t.trim()).filter(Boolean) ?? ['General'];
  if (tagsArray.length === 0) tagsArray.push('General');

  try {
    const dup = await adminDb.collection('posts').where('slug', '==', slug).limit(1).get();
    if (!dup.empty) {
      return {
        success: false,
        error: `A post with the slug "${slug}" already exists. Please choose a different title.`,
      };
    }

    if (coverImageType === 'url' && coverImageUrl) {
      finalCoverImageUrl = coverImageUrl;
    } else if (coverImageType === 'upload') {
      if (!adminStorage) {
        return { success: false, error: 'Storage service is not available for file uploads.' };
      }
      const file = raw.coverImageFile as File | null;
      if (!file || file.size === 0) {
        return { success: false, error: 'No file uploaded for upload type.' };
      }
      const buf = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name);
      const name = `${uuidv4()}${ext}`;
      const bucket = adminStorage.bucket();
      const obj = bucket.file(`blog-covers/${name}`);
      await obj.save(buf, { metadata: { contentType: file.type } });
      finalCoverImageUrl = (await obj.getSignedUrl({ action: 'read', expires: '03-01-2500' }))[0];
    }

    const sanitizedContent = sanitizeHtml(contentHtml ?? '');
    const newPostData: any = {
      slug,
      title,
      summary,
      author: 'Rich Bartlett',
      publishedDate: publishedDate || new Date().toISOString(),
      tags: tagsArray,
      coverImage: finalCoverImageUrl,
      contentHtml: sanitizedContent,
      status: status ?? 'published',
      readingTime: estimateReadingTime(sanitizedContent),
    };

    if (series) {
      newPostData.series = series;
    }
    
    const docRef = await col.add(newPostData);

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    if (series) {
        revalidatePath(`/blog/series/${encodeURIComponent(series)}`);
    }

    return { success: true, post: { id: docRef.id, ...newPostData } };
  } catch (error) {
    console.error('Error adding post:', error);
    const msg = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, error: `Failed to save post: ${msg}` };
  }
}

// --- update ------------------------------------------------------------------

export async function updatePost(formData: FormData) {
  const col = postsCol();
  if (!col) {
    return { success: false, error: 'Database service is not available.' };
  }

  const raw = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    content: formData.get('content'),
    contentHtml: formData.get('contentHtml'),
    tags: formData.get('tags'),
    series: formData.get('series'),
    publishedDate: formData.get('publishedDate'),
    coverImageType: formData.get('coverImageType'),
    coverImageUrl: formData.get('coverImageUrl'),
    coverImageFile: formData.get('coverImageFile'),
    originalSlug: formData.get('originalSlug'),
    postId: formData.get('postId'),
    status: formData.get('status') || 'published',
  };

  const parsed = updatePostSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
    };
  }

  const {
    postId,
    originalSlug,
    title,
    summary,
    content,
    contentHtml,
    coverImageType,
    coverImageUrl,
    publishedDate,
    series,
    status,
  } = parsed.data;

  const newSlug = createSlug(title);

  try {
    const postRef = col.doc(postId);
    const snap = await postRef.get();
    if (!snap.exists) return { success: false, error: 'Post to update not found.' };

    if (originalSlug !== newSlug) {
      const dup = await adminDb.collection('posts').where('slug', '==', newSlug).limit(1).get();
      if (!dup.empty && dup.docs[0].id !== postId) {
        return {
          success: false,
          error: `A post with the new slug "${newSlug}" already exists. Please choose a different title.`,
        };
      }
    }

    const existing = snap.data() as any;
    let finalCoverImageUrl = existing.coverImage;

    if (coverImageType === 'url' && coverImageUrl) {
      finalCoverImageUrl = coverImageUrl;
    } else if (coverImageType === 'upload') {
      if (!adminStorage) {
        return { success: false, error: 'Storage service is not available for file uploads.' };
      }
      const file = raw.coverImageFile as File | null;
      if (file && file.size > 0) {
        const buf = Buffer.from(await file.arrayBuffer());
        const ext = path.extname(file.name);
        const name = `${uuidv4()}${ext}`;
        const bucket = adminStorage.bucket();
        const obj = bucket.file(`blog-covers/${name}`);
        await obj.save(buf, { metadata: { contentType: file.type } });
        finalCoverImageUrl = (await obj.getSignedUrl({ action: 'read', expires: '03-01-2500' }))[0];
      }
    }

    const finalHtml = contentHtml?.trim()
      ? contentHtml
      : content?.trim()
      ? mdToHtmlSafe(content)
      : '';

    const sanitizedFinalHtml = sanitizeHtml(finalHtml);
    const updated: any = {
      slug: newSlug,
      title,
      summary,
      tags:
        parsed.data.tags?.split(',').map((t) => t.trim()).filter(Boolean) ??
        existing.tags ??
        ['General'],
      publishedDate: publishedDate || existing.publishedDate,
      coverImage: finalCoverImageUrl,
      contentHtml: sanitizedFinalHtml,
      series: series || null,
      status: status ?? 'published',
      readingTime: estimateReadingTime(sanitizedFinalHtml),
    };

    await postRef.update(updated);

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    if (originalSlug !== newSlug) revalidatePath(`/blog/${originalSlug}`);
    revalidatePath(`/blog/${newSlug}`);
    if (series) revalidatePath(`/blog/series/${encodeURIComponent(series)}`);
    if (existing.series && existing.series !== series) {
        revalidatePath(`/blog/series/${encodeURIComponent(existing.series)}`);
    }

    return { success: true, post: { id: postId, ...existing, ...updated } };
  } catch (error) {
    console.error('Error updating post:', error);
    const msg = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, error: `Failed to update post: ${msg}` };
  }
}

// --- delete ------------------------------------------------------------------

export async function deletePost(postId: string) {
  const col = postsCol();
  if (!col) {
    return { success: false, error: 'Database service is not available.' };
  }

  try {
    const postRef = col.doc(postId);
    const snap = await postRef.get();
    if (!snap.exists) return { success: false, error: 'Post to delete not found.' };

    const deleted = snap.data() as any;

    // Best-effort storage cleanup; do not block the delete
    if (deleted.coverImage && deleted.coverImage.includes('firebasestorage.googleapis.com')) {
      try {
        if (adminStorage) {
          const bucket = adminStorage.bucket();
          const url = new URL(deleted.coverImage);
          const objectPath = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
          await bucket.file(objectPath).delete();
        }
      } catch (e) {
        console.warn(`Could not delete cover image from storage: ${e}`);
      }
    }

    await postRef.delete();

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${deleted.slug}`);
    if (deleted.series) {
        revalidatePath(`/blog/series/${encodeURIComponent(deleted.series)}`);
    }


    return { success: true };
  } catch (error) {
    console.error('Error deleting post:', error);
    const msg = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, error: `Failed to delete post: ${msg}` };
  }
}
