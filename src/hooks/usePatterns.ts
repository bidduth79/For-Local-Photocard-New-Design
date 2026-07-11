import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, setDoc, doc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { defaultPatterns } from '../data/defaultPatterns';

export interface SavedPattern {
  id: string;
  name: string;
  url: string;
  originalName: string;
  createdAt: number;
}

const DB_NAME = 'PhotocardPatternsDB';
const STORE_NAME = 'patterns';
const DB_VERSION = 1;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
  });
};

export const usePatterns = () => {
  const [savedPatterns, setSavedPatterns] = useState<SavedPattern[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPatterns = async () => {
    try {
      if (db) {
        // Fetch from Firebase
        const q = query(collection(db, "patterns"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const patterns: SavedPattern[] = [];
        querySnapshot.forEach((doc) => {
          patterns.push({ id: doc.id, ...doc.data() } as SavedPattern);
        });
        setSavedPatterns(patterns);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error fetching patterns from Firebase:", error);
    }

    // Fallback to IndexedDB
    try {
      const localDb = await openDB();
      return new Promise<void>((resolve, reject) => {
        const transaction = localDb.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index('createdAt');
        const request = index.openCursor(null, 'prev'); // Descending order
        
        const patterns: SavedPattern[] = [];
        
        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
          if (cursor) {
            patterns.push(cursor.value);
            cursor.continue();
          } else {
            setSavedPatterns(patterns);
            setLoading(false);
            resolve();
          }
        };
        
        request.onerror = () => {
          console.error("Error fetching patterns from IndexedDB");
          setLoading(false);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error("Error opening IndexedDB: ", error);
      setLoading(false);
    }
  };

  const savePattern = async (name: string, url: string, originalName: string) => {
    try {
      let finalUrl = url;
      let id: string = crypto.randomUUID();

      if (db && storage) {
        // Upload to Firebase Storage
        const storageRef = ref(storage, `patterns/${name}_${originalName}`);
        await uploadString(storageRef, url, 'data_url');
        finalUrl = await getDownloadURL(storageRef);

        // Save to Firestore
        const docRef = await addDoc(collection(db, "patterns"), {
          name,
          url: finalUrl,
          originalName,
          createdAt: Date.now()
        });
        id = docRef.id;
      } else {
        // Fallback to IndexedDB
        const localDb = await openDB();
        await new Promise<void>((resolve, reject) => {
          const transaction = localDb.transaction(STORE_NAME, 'readwrite');
          const store = transaction.objectStore(STORE_NAME);
          const request = store.add({
            id,
            name,
            url: finalUrl,
            originalName,
            createdAt: Date.now()
          });
          
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      }

      const newPattern: SavedPattern = {
        id,
        name,
        url: finalUrl,
        originalName,
        createdAt: Date.now()
      };
      
      setSavedPatterns(prev => [newPattern, ...prev]);
      return { id, url: finalUrl };
    } catch (error) {
      console.error("Error saving pattern: ", error);
      throw error;
    }
  };

  const saveDefaultPatterns = async () => {
    if (!db) return;
    try {
      for (const pattern of defaultPatterns) {
        // Save to Firestore with the specific ID so it doesn't duplicate easily
        await setDoc(doc(db, "patterns", pattern.id), {
          name: pattern.name,
          url: pattern.url,
          originalName: pattern.originalName,
          createdAt: Date.now()
        });
      }
      console.log("Default patterns saved to Firebase successfully!");
      fetchPatterns(); // Refresh patterns
    } catch (error) {
      console.error("Error saving default patterns to Firebase:", error);
    }
  };

  useEffect(() => {
    fetchPatterns();
  }, []);

  return { savedPatterns, loading, savePattern, fetchPatterns, saveDefaultPatterns };
};
