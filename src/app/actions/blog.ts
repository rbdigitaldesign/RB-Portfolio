
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { adminDb, adminStorage } from '@/lib/firebase/admin';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import type { Post } from '@/lib/types';

// This function now handles cases where adminDb might fail during build but works in the browser.
const postsCol = () => {
  if (!adminDb) {
    console.warn('Firestore admin database is not available. This is expected during build time. Client-side fetching will be used.');
    return null;
  }
  return adminDb.collection('posts');
};

const createSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// ---------- reads ----------
export async function getAllPosts(): Promise<Post[]> {
  const col = postsCol();
  if (!col) return [];
  try {
    const snap = await col.orderBy('publishedDate', 'desc').get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as Post));
  } catch(e) {
      console.error("Error fetching all posts:", e);
      // Return empty array on error to prevent crashing the client
      return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const col = postsCol();
  if (!col) return null;
  try {
    const snap = await col.where('slug', '==', slug).limit(1).get();
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...(doc.data() as any) } as Post;
  } catch(e) {
     console.error(`Error fetching post with slug "${slug}":`, e);
     return null;
  }
}

// ---------- validation ----------
const tagsSchema = z
  .string()
  .refine(
    (value) => !value || value.split(',').map((t) => t.trim()).filter(Boolean).length <= 3,
    { message: 'You can add a maximum of 3 tags.' }
  )
  .optional();

const addPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  summary: z.string().min(1, 'Summary is required'),
  content: z.string().min(1, 'Content is required'),
  tags: tagsSchema,
  publishedDate: z.string().datetime('Invalid date format').optional(),
  coverImageType: z.enum(['url', 'upload']),
  coverImageUrl: z.string().optional(),
});

// ---------- create ----------
export async function addPost(formData: FormData) {
  const col = postsCol();
  if (!col || !adminStorage) {
    return { success: false, error: 'Database or storage service is not available.' };
  }

  const raw = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    content: formData.get('content'),
    tags: formData.get('tags'),
    publishedDate: formData.get('publishedDate'),
    coverImageType: formData.get('coverImageType'),
    coverImageUrl: formData.get('coverImageUrl'),
    coverImageFile: formData.get('coverImageFile'),
  };

  const parsed = addPostSchema.safeParse({
    title: raw.title,
    summary: raw.summary,
    content: raw.content,
    tags: raw.tags,
    publishedDate: raw.publishedDate,
    coverImageType: raw.coverImageType,
    coverImageUrl: raw.coverImageUrl,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
    };
  }

  const { title, summary, content, coverImageType, coverImageUrl, publishedDate } = parsed.data;
  const slug = createSlug(title);
  let finalCoverImageUrl = 'https://placehold.co/1200x675.png';

  const tagsArray =
    parsed.data.tags?.split(',').map((t) => t.trim()).filter(Boolean) ?? ['General'];
  if (tagsArray.length === 0) tagsArray.push('General');

  try {
    // unique slug check
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
      finalCoverImageUrl = (
        await obj.getSignedUrl({ action: 'read', expires: '03-01-2500' })
      )[0];
    }

    const newPostData = {
      slug,
      title,
      summary,
      content,
      author: 'Rich Bartlett',
      publishedDate: publishedDate || new Date().toISOString(),
      tags: tagsArray,
      coverImage: finalCoverImageUrl,
    };

    const docRef = await col.add(newPostData);

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return { success: true, post: { id: docRef.id, ...newPostData } };
  } catch (error) {
    console.error('Error adding post:', error);
    const msg = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, error: `Failed to save post: ${msg}` };
  }
}

// ---------- update ----------
const updatePostSchema = addPostSchema.extend({
  originalSlug: z.string(),
  postId: z.string(),
});

export async function updatePost(formData: FormData) {
  const col = postsCol();
  if (!col || !adminStorage) {
    return { success: false, error: 'Database or storage service is not available.' };
  }

  const raw = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    content: formData.get('content'),
    tags: formData.get('tags'),
    publishedDate: formData.get('publishedDate'),
    coverImageType: formData.get('coverImageType'),
    coverImageUrl: formData.get('coverImageUrl'),
    coverImageFile: formData.get('coverImageFile'),
    originalSlug: formData.get('originalSlug'),
    postId: formData.get('postId'),
  };

  const parsed = updatePostSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
    };
  }

  const {
    title,
    summary,
    content,
    coverImageType,
    coverImageUrl,
    originalSlug,
    publishedDate,
    postId,
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

    const updated = {
      slug: newSlug,
      title,
      summary,
      content,
      tags:
        parsed.data.tags?.split(',').map((t) => t.trim()).filter(Boolean) ?? existing.tags ?? ['General'],
      publishedDate: publishedDate || existing.publishedDate,
      coverImage: finalCoverImageUrl,
    };

    await postRef.update(updated);

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    if (originalSlug !== newSlug) revalidatePath(`/blog/${originalSlug}`);
    revalidatePath(`/blog/${newSlug}`);

    return { success: true, post: { id: postId, ...existing, ...updated } };
  } catch (error) {
    console.error('Error updating post:', error);
    const msg = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, error: `Failed to update post: ${msg}` };
  }
}

// ---------- delete ----------
export async function deletePost(postId: string) {
  const col = postsCol();
  if (!col || !adminStorage) {
    return { success: false, error: 'Database or storage service is not available.' };
  }

  try {
    const postRef = col.doc(postId);
    const snap = await postRef.get();
    if (!snap.exists) return { success: false, error: 'Post to delete not found.' };

    const deleted = snap.data() as any;

    // best-effort storage cleanup
    if (deleted.coverImage && deleted.coverImage.includes('firebasestorage.googleapis.com')) {
      try {
        const bucket = adminStorage.bucket();
        const url = new URL(deleted.coverImage);
        const objectPath = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
        await bucket.file(objectPath).delete();
      } catch (e) {
        console.warn(`Could not delete cover image from storage: ${e}`);
      }
    }

    await postRef.delete();

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${deleted.slug}`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting post:', error);
    const msg = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, error: `Failed to delete post: ${msg}` };
  }
}
