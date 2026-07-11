import { signInAnonymously, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { auth, db } from '../firebase';

export interface UserProfile {
  uid: string;
  email?: string;
  isAnonymous: boolean;
  downloadCount: number;
  isPremium: boolean;
  isAdmin: boolean;
  premiumExpiresAt?: number;
  isBlocked?: boolean;
  ipAddress?: string;
  location?: string;
  lastLoginAt?: string;
  createdAt?: string;
}

export const MAX_FREE_DOWNLOADS = 25;

// Helper to fetch IP and Location
const fetchIpData = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      return {
        ip: data.ip,
        location: data.city && data.country_name ? `${data.city}, ${data.country_name}` : undefined
      };
    }
  } catch (e) {
    // Silently fail if IP fetch fails (e.g., adblocker or CORS)
  }
  return { ip: undefined, location: undefined };
};

// Initialize user in Firestore if they don't exist
export const initializeUserDoc = async (user: User) => {
  if (!db) return null;
  
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  const ipData = await fetchIpData();
  const currentTime = new Date().toISOString();

  if (!userSnap.exists()) {
    const isAdminUser = user.email === 'rkbbd79@gmail.com';
    const newUser: UserProfile = {
      uid: user.uid,
      isAnonymous: user.isAnonymous,
      downloadCount: 0,
      isPremium: isAdminUser, // Admin is also premium
      isAdmin: isAdminUser,
      lastLoginAt: currentTime,
      createdAt: currentTime,
    };
    if (ipData.ip) newUser.ipAddress = ipData.ip;
    if (ipData.location) newUser.location = ipData.location;
    if (user.email) {
      newUser.email = user.email;
    }
    await setDoc(userRef, newUser);
    return newUser;
  } else {
    // Update existing user with latest IP and login time
    const updateData: any = { lastLoginAt: currentTime };
    if (ipData.ip) updateData.ipAddress = ipData.ip;
    if (ipData.location) updateData.location = ipData.location;
    await updateDoc(userRef, updateData);
    
    return { ...userSnap.data(), ...updateData } as UserProfile;
  }
};

// Ensure user is logged in (anonymously by default)
export const ensureAuthenticated = async (): Promise<User | null> => {
  if (!auth) return null;
  
  if (auth.currentUser) {
    return auth.currentUser;
  }
  
  try {
    const userCredential = await signInAnonymously(auth);
    await initializeUserDoc(userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing in anonymously:", error);
    if (error.code === 'auth/configuration-not-found') {
      console.error("Anonymous authentication is not enabled in Firebase. Please enable it in Firebase Console > Authentication > Sign-in method.");
    }
    return null;
  }
};

// Check download limit
export const checkDownloadLimit = async (): Promise<{ allowed: boolean; remaining: number; isPremium: boolean }> => {
  if (!auth || !db) return { allowed: true, remaining: 999, isPremium: true };
  
  if (!auth.currentUser) {
    return { allowed: true, remaining: MAX_FREE_DOWNLOADS, isPremium: false };
  }
  
  const user = auth.currentUser;
  
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    return { allowed: true, remaining: MAX_FREE_DOWNLOADS, isPremium: false };
  }
  
  const userData = userSnap.data() as UserProfile;
  
  if (userData.isBlocked) {
    return { allowed: false, remaining: 0, isPremium: false };
  }
  
  let isPremium = userData.isPremium || userData.isAdmin;
  
  // Check if premium has expired
  if (userData.isPremium && !userData.isAdmin && userData.premiumExpiresAt) {
    if (Date.now() > userData.premiumExpiresAt) {
      isPremium = false;
      // Optionally update the database to reflect expired status, 
      // but returning false is enough to restrict access.
    }
  }
  
  if (isPremium) {
    return { allowed: true, remaining: 999, isPremium: true };
  }
  
  const remaining = Math.max(0, MAX_FREE_DOWNLOADS - (userData.downloadCount || 0));
  return { 
    allowed: remaining > 0, 
    remaining, 
    isPremium: false 
  };
};

// Record a download
export const recordDownload = async (): Promise<void> => {
  if (!auth || !db) return;
  
  const user = await ensureAuthenticated();
  if (!user) return;
  
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await initializeUserDoc(user);
  }
  
  await updateDoc(userRef, {
    downloadCount: increment(1)
  });
};
