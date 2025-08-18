
'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import type { Post } from '@/lib/types';

const postsFilePath = path.join(process.cwd(), 'src', 'data', 'posts.json');

// Helper to read posts
async function getPosts(): Promise<Post[]> {
  try {
    const fileContent = await fs.readFile(postsFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If file doesn't exist, return empty array
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper to write posts
async function writePosts(posts: Post[]): Promise<void> {
  await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
}


const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') 
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-'); 
};

// --- GET POSTS ---
export async function getPost(slug: string): Promise<Post | null> {
    const posts = await getPosts();
    return posts.find(p => p.slug === slug) || null;
}

const tagsSchema = z.string().refine(
  (value) => value.split(',').map(tag => tag.trim()).filter(Boolean).length <= 3,
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
  let finalCoverImageUrl = 'https://placehold.co/1200x675.png'; // Default

  const tagsArray = result.data.tags 
    ? result.data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : ['General'];
  if (tagsArray.length === 0) {
      tagsArray.push('General');
  }

  try {
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
        const storageRef = ref(storage, `blog-covers/${fileName}`);

        await uploadBytes(storageRef, fileBuffer, {
            contentType: file.type,
        });

        finalCoverImageUrl = await getDownloadURL(storageRef);
    }

    const posts = await getPosts();

    if (posts.some(post => post.slug === slug)) {
      return {
        success: false,
        error: `A post with the slug "${slug}" already exists. Please choose a different title.`,
      };
    }

    const newPost: Post = {
      slug,
      title,
      summary,
      content,
      author: 'Rich Bartlett', 
      publishedDate: publishedDate || new Date().toISOString(),
      tags: tagsArray, 
      coverImage: finalCoverImageUrl,
    };

    posts.unshift(newPost);
    await writePosts(posts);

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return { success: true, post: newPost };
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
});

export async function updatePost(formData: FormData) {
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
    };

    const result = updatePostSchema.safeParse({
      title: rawFormData.title,
      summary: rawFormData.summary,
      content: rawFormData.content,
      tags: rawFormData.tags,
      publishedDate: rawFormData.publishedDate,
      coverImageType: rawFormData.coverImageType,
      coverImageUrl: rawFormData.coverImageUrl,
      originalSlug: rawFormData.originalSlug,
    });


    if (!result.success) {
        return {
            success: false,
            error: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
        };
    }

    const { title, summary, content, coverImageType, coverImageUrl, originalSlug, publishedDate } = result.data;
    const newSlug = createSlug(title);
    
    const tagsArray = result.data.tags 
      ? result.data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : ['General'];
    if (tagsArray.length === 0) {
        tagsArray.push('General');
    }

    try {
        const posts = await getPosts();
        const postIndex = posts.findIndex(p => p.slug === originalSlug);

        if (postIndex === -1) {
            return { success: false, error: 'Post to update not found.' };
        }
        
        // Check if new slug conflicts with another post
        if (originalSlug !== newSlug && posts.some(p => p.slug === newSlug)) {
             return {
                success: false,
                error: `A post with the new slug "${newSlug}" already exists. Please choose a different title.`,
            };
        }

        const existingPost = posts[postIndex];
        let finalCoverImageUrl = existingPost.coverImage;

        if (coverImageType === 'url' && coverImageUrl) {
            finalCoverImageUrl = coverImageUrl;
        } else if (coverImageType === 'upload') {
            const file = rawFormData.coverImageFile as File | null;
             if (file && file.size > 0) {
                const fileBuffer = Buffer.from(await file.arrayBuffer());
                const fileExtension = path.extname(file.name);
                const fileName = `${uuidv4()}${fileExtension}`;
                const storageRef = ref(storage, `blog-covers/${fileName}`);
                await uploadBytes(storageRef, fileBuffer, { contentType: file.type });
                finalCoverImageUrl = await getDownloadURL(storageRef);
            }
        }

        const updatedPost: Post = {
            ...existingPost,
            slug: newSlug,
            title,
            summary,
            content,
            tags: tagsArray,
            publishedDate: publishedDate || existingPost.publishedDate,
            coverImage: finalCoverImageUrl,
        };

        posts[postIndex] = updatedPost;
        await writePosts(posts);
        
        revalidatePath('/admin/blog');
        revalidatePath('/blog');
        if (originalSlug !== newSlug) {
            revalidatePath(`/blog/${originalSlug}`);
        }
        revalidatePath(`/blog/${newSlug}`);

        return { success: true, post: updatedPost };

    } catch (error) {
        console.error('Error updating post:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, error: `Failed to update post: ${errorMessage}` };
    }
}


// --- DELETE POST ---
export async function deletePost(slug: string) {
    try {
        const posts = await getPosts();
        const postIndex = posts.findIndex(p => p.slug === slug);

        if (postIndex === -1) {
            return { success: false, error: 'Post to delete not found.' };
        }
        
        const [deletedPost] = posts.splice(postIndex, 1);
        
        // If image is from firebase storage, delete it
        if (deletedPost.coverImage.includes('firebasestorage.googleapis.com')) {
            try {
                const imageRef = ref(storage, deletedPost.coverImage);
                await deleteObject(imageRef);
            } catch (storageError) {
                 // Log error but don't block post deletion if file doesn't exist
                console.warn(`Could not delete cover image from storage: ${storageError}`);
            }
        }

        await writePosts(posts);

        revalidatePath('/admin/blog');
        revalidatePath('/blog');
        revalidatePath(`/blog/${slug}`);

        return { success: true };
    } catch (error) {
        console.error('Error deleting post:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, error: `Failed to delete post: ${errorMessage}` };
    }
}
