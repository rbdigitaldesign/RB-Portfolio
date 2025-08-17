
'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const postsFilePath = path.join(process.cwd(), 'src', 'data', 'posts.json');

const postSchema = z.object({
  title: z.string(),
  summary: z.string(),
  content: z.string(),
});

interface Post {
  slug: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedDate: string;
  tags: string[];
  coverImage: string;
}

// Helper to generate a slug from a title
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
};

export async function addPost(formData: unknown) {
  const result = postSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      error: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
    };
  }

  const { title, summary, content } = result.data;
  const slug = createSlug(title);

  try {
    const fileContent = await fs.readFile(postsFilePath, 'utf-8');
    const posts: Post[] = JSON.parse(fileContent);

    // Check for duplicate slugs
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
      author: 'Rich Bartlett', // Default author
      publishedDate: new Date().toISOString(),
      tags: ['General'], // Default tags
      coverImage: 'https://placehold.co/1200x675.png', // Default cover image
    };

    posts.unshift(newPost); // Add to the beginning of the array

    await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');

    // Revalidate paths to show the new post
    revalidatePath('/admin/blog');
    revalidatePath('/blog'); // If you have a public blog listing page

    return { success: true, post: newPost };
  } catch (error) {
    console.error('Error adding post:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return {
      success: false,
      error: `Failed to write to posts.json: ${errorMessage}`,
    };
  }
}
