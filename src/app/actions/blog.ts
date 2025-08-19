
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { adminDb, adminStorage } from '@/lib/firebase/admin';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import type { Post } from '@/lib/types';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  Timestamp,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { clientDb } from '@/lib/firebase/client';


// This function now handles cases where adminDb might fail during build but works in the browser.
const postsCol = () => {
    try {
        // Attempt to use adminDb if available (for server-side rendering if it works)
        return adminDb.collection('posts');
    } catch (e) {
        // Fallback to clientDb if adminDb fails (for client-side fetching)
        console.warn('Firestore admin database is not available. Falling back to client DB. This is expected during client-side rendering or build time.');
        return collection(clientDb, 'posts');
    }
};

const createSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// ---------- reads ----------
// These functions can be called from client components.
export async function getAllPosts(): Promise<Post[]> {
  try {
    const q = query(collection(clientDb, 'posts'), orderBy('publishedDate', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as Post));
  } catch(e) {
      console.error("Error fetching all posts:", e);
      return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const q = query(collection(clientDb, 'posts'), where('slug', '==', slug), limit(1));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...(doc.data() as any) } as Post;
  } catch(e) {
     console.error(`Error fetching post with slug "${slug}":`, e);
     return null;
  }
}
