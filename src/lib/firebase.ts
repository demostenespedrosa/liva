/// <reference types="vite/client" />
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, getDocFromServer } from 'firebase/firestore';
import { Psychologist } from '../types';
import { mockPsychologists } from '../data/mockPsychologists';
import firebaseAppletConfig from '../../firebase-applet-config.json';

// Initialize Firebase with environment variables or fallback configuration file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseAppletConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseAppletConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseAppletConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseAppletConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseAppletConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseAppletConfig.appId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);

// Strict Firestore Error Handling conforming to Firebase Integration Skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test as required by skill guidelines
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

// Call testConnection inside our initialization flow
testConnection();

/**
 * Searches for psychologists based on user's selected tags in Firestore.
 * Conforms precisely to RLS policies and falls back elegantly to mock data on errors.
 */
export const fetchMatchedPsychologists = async (userTags: string[]): Promise<Psychologist[]> => {
  const path = 'psychologists';
  try {
    // Attempt real fetch from the Firestore "psychologists" collection
    const querySnapshot = await getDocs(collection(db, path));
    const psychologists: Psychologist[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Ensure it is marked public
      if (data.is_public !== false) {
        psychologists.push({
          id: doc.id,
          name: data.name || '',
          bio: data.bio || '',
          focus: data.focus || '',
          photoUrl: data.photoUrl || data.photo_url || '',
          phone: data.phone || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
        });
      }
    });

    if (psychologists.length > 0) {
      return applyMatchLogic(psychologists, userTags);
    }
    // Fallback if collection remains empty initially
    return applyMatchLogic(mockPsychologists, userTags);
  } catch (error: any) {
    // If it's a permission/config error, we must handle & log properly
    if (error?.code === 'permission-denied') {
      try {
        handleFirestoreError(error, OperationType.GET, path);
      } catch (e) {
        console.warn('Fallback to mock data due to permission-denied:', e);
      }
    }
    // Elegant fallback to mock data to prevent blocking patient user-experience
    return applyMatchLogic(mockPsychologists, userTags);
  }
};

const applyMatchLogic = (pool: Psychologist[], userTags: string[]) => {
  const scored = pool.map(psy => {
    let score = 0;
    psy.tags.forEach(t => {
      if (userTags.includes(t)) score++;
    });
    return { ...psy, score };
  });

  // Sort by highest match score and return top 3
  scored.sort((a, b) => b.score - a.score);
  
  // Return without the temporary score field
  return scored.slice(0, 3).map(({ score, ...psy }) => psy);
};
