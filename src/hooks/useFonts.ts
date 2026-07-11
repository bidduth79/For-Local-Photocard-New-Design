import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export interface SavedFont {
  id: string;
  name: string;
  url: string;
  originalName: string;
  createdAt: number;
}

const DB_NAME = 'PhotocardFontsDB';
const STORE_NAME = 'fonts';
const DB_VERSION = 1;

const loadedFonts = new Set<string>();

const loadFontIntoDocument = async (name: string, url: string) => {
  if (loadedFonts.has(name)) return;
  loadedFonts.add(name);
  try {
    let finalUrl = url;
    
    // If it's an external URL, fetch it and convert to data URL for better html-to-image compatibility
    if (url.startsWith('http')) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        finalUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch (fetchErr) {
        console.error('Failed to fetch font as blob, falling back to original URL', fetchErr);
      }
    }

    const newFont = new FontFace(name, `url(${finalUrl})`);
    newFont.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      
      // Also inject a <style> tag so html-to-image can clone it
      const styleId = `custom-font-${name.replace(/\s+/g, '-')}`;
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          @font-face {
            font-family: '${name}';
            src: url('${finalUrl}');
          }
        `;
        document.head.appendChild(style);
      }
    }).catch(e => console.error('Failed to load font', e));
  } catch (e) {
    console.error('Error creating FontFace', e);
  }
};

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

export const useFonts = () => {
  const [savedFonts, setSavedFonts] = useState<SavedFont[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFonts = async () => {
    const allFonts = new Map<string, SavedFont>();

    // Fetch from IndexedDB first
    try {
      const localDb = await openDB();
      await new Promise<void>((resolve, reject) => {
        const transaction = localDb.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index('createdAt');
        const request = index.openCursor(null, 'prev');
        
        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
          if (cursor) {
            allFonts.set(cursor.value.name, cursor.value);
            loadFontIntoDocument(cursor.value.name, cursor.value.url);
            cursor.continue();
          } else {
            resolve();
          }
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error fetching fonts from IndexedDB: ", error);
    }

    // Fetch from Firebase
    try {
      if (db) {
        const q = query(collection(db, "fonts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<SavedFont, 'id'>;
          const font = { id: doc.id, ...data };
          allFonts.set(font.name, font); // Overwrite or add
          loadFontIntoDocument(font.name, font.url);
        });
      }
    } catch (error) {
      console.error("Error fetching fonts from Firebase:", error);
    }

    setSavedFonts(Array.from(allFonts.values()).sort((a, b) => b.createdAt - a.createdAt));
    setLoading(false);
  };

  const saveFont = async (name: string, url: string, originalName: string) => {
    try {
      let finalUrl = url;
      let id: string = crypto.randomUUID();

      if (db && storage) {
        // Upload to Firebase Storage
        const storageRef = ref(storage, `fonts/${name}_${originalName}`);
        await uploadString(storageRef, url, 'data_url');
        finalUrl = await getDownloadURL(storageRef);

        // Save to Firestore
        const docRef = await addDoc(collection(db, "fonts"), {
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

      const newFont: SavedFont = {
        id,
        name,
        url: finalUrl,
        originalName,
        createdAt: Date.now()
      };
      
      loadFontIntoDocument(name, finalUrl);
      
      setSavedFonts(prev => [newFont, ...prev]);
      return { id, url: finalUrl };
    } catch (error) {
      console.error("Error saving font: ", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  return { savedFonts, loading, saveFont, fetchFonts };
};
