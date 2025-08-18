
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import { onAuthStateChanged, User, signInWithEmailAndPassword, signOut, Auth, getAuth } from 'firebase/auth';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<any>;
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "design-portfolio-v2.firebaseapp.com",
  projectId: "design-portfolio-v2",
  storageBucket: "design-portfolio-v2.appspot.com",
  messagingSenderId: "738515003817",
  appId: "1:738515003817:web:e996b105dcaf8f4e827cb8"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const authInstance = getAuth(app);
    setAuth(authInstance);

    const unsubscribe = onAuthStateChanged(authInstance, (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, pass: string) => {
    if (!auth) return Promise.reject(new Error("Auth not initialized"));
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    if (!auth) return Promise.reject(new Error("Auth not initialized"));
    await signOut(auth);
  };

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading, auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
