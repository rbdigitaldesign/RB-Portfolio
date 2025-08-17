
'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const postsFilePath = path.join(process.cwd(), 'src', 'data', 'posts.json');

const formSchema = z.object({
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  coverImageType: z.enum(['url', 'upload']),
  coverImageUrl: z.string().optional(),
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

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') 
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-'); 
};

export async function addPost(formData: FormData) {
  
  const rawFormData = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    content: formData.get('content'),
    coverImageType: formData.get('coverImageType'),
    coverImageUrl: formData.get('coverImageUrl'),
    coverImageFile: formData.get('coverImageFile'),
  };

  const result = formSchema.safeParse({
    title: rawFormData.title,
    summary: rawFormData.summary,
    content: rawFormData.content,
    coverImageType: rawFormData.coverImageType,
    coverImageUrl: rawFormData.coverImageUrl,
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
    };
  }

  const { title, summary, content, coverImageType, coverImageUrl } = result.data;
  const slug = createSlug(title);
  let finalCoverImageUrl = 'https://placehold.co/1200x675.png'; // Default

  try {
    if (coverImageType === 'url' && coverImageUrl) {
        finalCoverImageUrl = coverImageUrl;
    } else if (coverImageType === 'upload') {
        const file = rawFormData.coverImageFile as File | null;
        if (!file) {
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


    const fileContent = await fs.readFile(postsFilePath, 'utf-8');
    const posts: Post[] = JSON.parse(fileContent);

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
      publishedDate: new Date().toISOString(),
      tags: ['General'], 
      coverImage: finalCoverImageUrl,
    };

    posts.unshift(newPost);

    await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');

    revalidatePath('/admin/blog');
    revalidatePath('/blog');

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
