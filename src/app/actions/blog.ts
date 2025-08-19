
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { adminDb, adminStorage } from '@/lib/firebase/admin';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import type { Post } from '@/lib/types';

// Helper function to get the posts collection reference
const getPostsCollection = () => {
    if (!adminDb) {
        // Return null if the adminDb is not available.
        // This can happen during build time when server-side env vars are not set.
        console.warn("Firestore admin database is not available. This is expected during build.");
        return null;
    }
    return collection(adminDb, 'posts');
}

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// --- GET POSTS ---
export async function getAllPosts(): Promise<Post[]> {
    const postsCollection = getPostsCollection();
    // If the collection is not available (e.g., during build), return an empty array.
    if (!postsCollection) {
        return [];
    }
    const q = query(postsCollection, orderBy('publishedDate', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
}

export async function getPost(slug: string): Promise<Post | null> {
    const posts = await getAllPosts(); 
    const post = posts.find(p => p.slug === slug);
    return post || null;
}


const tagsSchema = z.string().refine(
  (value) => !value || value.split(',').map(tag => tag.trim()).filter(Boolean).length <= 3,
  { message: 'You can add a maximum of 3 tags.' }
).optional();


// --- ADD POST ---
const addPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().min(1, "Content is required"),
  tags: tagsSchema,
  publishedDate: z.string().datetime("Invalid date format").optional(),
  coverImageType: z.enum(['url', 'upload']),
  coverImageUrl: z.string().optional(),
});

export async function addPost(formData: FormData) {
  const postsCollection = getPostsCollection();
  if (!postsCollection || !adminStorage) {
    return { success: false, error: 'Database or storage service is not available.' };
  }

  const rawFormData = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    content: formData.get('content'),
    tags: formData.get('tags'),
    publishedDate: formData.get('publishedDate'),
    coverImageType: formData.get('coverImageType'),
    coverImageUrl: formData.get('coverImageUrl'),
    coverImageFile: formData.get('coverImageFile'),
  };

  const result = addPostSchema.safeParse({
    title: rawFormData.title,
    summary: rawFormData.summary,
    content: rawFormData.content,
    tags: rawFormData.tags,
    publishedDate: rawFormData.publishedDate,
    coverImageType: rawFormData.coverImageType,
    coverImageUrl: rawFormData.coverImageUrl,
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
    };
  }

  const { title, summary, content, coverImageType, coverImageUrl, publishedDate } = result.data;
  const slug = createSlug(title);
  let finalCoverImageUrl = 'https://placehold.co/1200x675.png';

  const tagsArray = result.data.tags
    ? result.data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : ['General'];
  if (tagsArray.length === 0) {
      tagsArray.push('General');
  }

  try {
    const posts = await getAllPosts();
    if (posts.some(post => post.slug === slug)) {
      return {
        success: false,
        error: `A post with the slug "${slug}" already exists. Please choose a different title.`,
      };
    }

    if (coverImageType === 'url' && coverImageUrl) {
        finalCoverImageUrl = coverImageUrl;
    } else if (coverImageType === 'upload') {
        const file = rawFormData.coverImageFile as File | null;
        if (!file || file.size === 0) {
            return { success: false, error: 'No file uploaded for upload type.' };
        }
        
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const fileExtension = path.extname(file.name);
        const fileName = `${uuidv4()}${fileExtension}`;
        const bucket = adminStorage.bucket();
        const fileUpload = bucket.file(`blog-covers/${fileName}`);

        await fileUpload.save(fileBuffer, {
            metadata: {
                contentType: file.type,
            },
        });
        
        finalCoverImageUrl = await fileUpload.getSignedUrl({
            action: 'read',
            expires: '03-01-2500', // Far-future expiration date
        }).then(urls => urls[0]);
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
    
    const docRef = await addDoc(postsCollection, newPostData);

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return { success: true, post: { id: docRef.id, ...newPostData } };
  } catch (error) {
    console.error('Error adding post:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return {
      success: false,
      error: `Failed to save post: ${errorMessage}`,
    };
  }
}

// --- UPDATE POST ---
const updatePostSchema = addPostSchema.extend({
    originalSlug: z.string(),
    postId: z.string(),
});

export async function updatePost(formData: FormData) {
    const postsCollection = getPostsCollection();
    if (!postsCollection || !adminStorage) {
        return { success: false, error: 'Database or storage service is not available.' };
    }
    const rawFormData = {
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

    const result = updatePostSchema.safeParse(rawFormData);

    if (!result.success) {
        return {
            success: false,
            error: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
        };
    }

    const { title, summary, content, coverImageType, coverImageUrl, originalSlug, publishedDate, postId } = result.data;
    const newSlug = createSlug(title);
    
    const tagsArray = result.data.tags
      ? result.data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : ['General'];
    if (tagsArray.length === 0) {
        tagsArray.push('General');
    }

    try {
        const postRef = doc(postsCollection, postId);
        const postSnap = await getDoc(postRef);

        if (!postSnap.exists()) {
            return { success: false, error: 'Post to update not found.' };
        }
        
        if (originalSlug !== newSlug) {
            const allPosts = await getAllPosts();
            if (allPosts.some(p => p.slug === newSlug && p.id !== postId)) {
                 return {
                    success: false,
                    error: `A post with the new slug "${newSlug}" already exists. Please choose a different title.`,
                };
            }
        }

        const existingPost = postSnap.data();
        let finalCoverImageUrl = existingPost.coverImage;

        if (coverImageType === 'url' && coverImageUrl) {
            finalCoverImageUrl = coverImageUrl;
        } else if (coverImageType === 'upload') {
            const file = rawFormData.coverImageFile as File | null;
             if (file && file.size > 0) {
                const fileBuffer = Buffer.from(await file.arrayBuffer());
                const fileExtension = path.extname(file.name);
                const fileName = `${uuidv4()}${fileExtension}`;
                const bucket = adminStorage.bucket();
                const fileUpload = bucket.file(`blog-covers/${fileName}`);

                await fileUpload.save(fileBuffer, {
                    metadata: { contentType: file.type },
                });
                 
                finalCoverImageUrl = await fileUpload.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2500',
                }).then(urls => urls[0]);
             }
        }

        const updatedPostData = {
            slug: newSlug,
            title,
            summary,
            content,
            tags: tagsArray,
            publishedDate: publishedDate || existingPost.publishedDate,
            coverImage: finalCoverImageUrl,
        };

        await updateDoc(postRef, updatedPostData);
        
        revalidatePath('/admin/blog');
        revalidatePath('/blog');
        if (originalSlug !== newSlug) {
            revalidatePath(`/blog/${originalSlug}`);
        }
        revalidatePath(`/blog/${newSlug}`);

        return { success: true, post: { id: postId, ...existingPost, ...updatedPostData } };

    } catch (error) {
        console.error('Error updating post:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, error: `Failed to update post: ${errorMessage}` };
    }
}


// --- DELETE POST ---
export async function deletePost(postId: string) {
    const postsCollection = getPostsCollection();
    if (!postsCollection || !adminStorage) {
        return { success: false, error: 'Database or storage service is not available.' };
    }
    try {
        const postRef = doc(postsCollection, postId);
        const postSnap = await getDoc(postRef);

        if (!postSnap.exists()) {
            return { success: false, error: 'Post to delete not found.' };
        }
        
        const deletedPost = postSnap.data();
        
        if (deletedPost.coverImage && deletedPost.coverImage.includes('firebasestorage.googleapis.com')) {
            try {
                const bucket = adminStorage.bucket();
                // Extract the object path from the URL.
                // URL format: https://firebasestorage.googleapis.com/v0/b/YOUR-BUCKET/o/OBJECT-PATH?alt=media&token=...
                const url = new URL(deletedPost.coverImage);
                // The pathname is /v0/b/design-portfolio-v2.appspot.com/o/blog-covers%2F...
                const objectPath = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
                await bucket.file(objectPath).delete();
            } catch (storageError) {
                console.warn(`Could not delete cover image from storage: ${storageError}`);
            }
        }

        await deleteDoc(postRef);

        revalidatePath('/admin/blog');
        revalidatePath('/blog');
        revalidatePath(`/blog/${deletedPost.slug}`);

        return { success: true };
    } catch (error) {
        console.error('Error deleting post:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, error: `Failed to delete post: ${errorMessage}` };
    }
}
