
'use server';

import { z } from 'zod';
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
