import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, query, getDocs, orderBy, updateDoc, deleteDoc, limit, startAfter } from 'firebase/firestore';
import { db, auth, firebaseConfig } from '../firebase';
import { UserProfile } from './authService';

// Secondary app for admin to create users without logging out
const secondaryApp = initializeApp(firebaseConfig, 'SecondaryApp');
const secondaryAuth = getAuth(secondaryApp);

export interface ActivationCode {
  code: string;
  createdAt: number;
  createdBy: string;
  isUsed: boolean;
  usedBy?: string;
  usedAt?: number;
  durationMonths: number;
}

// Generate a random code
const generateRandomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'PRO-';
  for (let i = 0; i < 8; i++) {
    if (i === 4) result += '-';
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Create a premium user directly (Admin only)
export const createPremiumUser = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
  if (!db || !auth.currentUser) return { success: false, message: 'Not authenticated' };
  
  try {
    // Create user with secondary app to avoid logging out the admin
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const user = userCredential.user;
    
    // Create user doc as premium
    const newUser: UserProfile = {
      uid: user.uid,
      isAnonymous: false,
      downloadCount: 0,
      isPremium: true,
      isAdmin: false,
    };
    if (user.email) {
      newUser.email = user.email;
    }
    
    await setDoc(doc(db, 'users', user.uid), newUser);
    
    // Sign out the secondary app user just in case
    await secondaryAuth.signOut();
    
    return { success: true, message: 'Premium user created successfully!' };
  } catch (error: any) {
    console.error("Error creating premium user:", error);
    let errorMessage = error.message;
    if (error.code === 'auth/configuration-not-found') {
      errorMessage = 'Email/Password authentication is not enabled in Firebase. Please enable it in Firebase Console > Authentication > Sign-in method.';
    } else if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already in use.';
    }
    return { success: false, message: errorMessage || 'Failed to create user' };
  }
};
export const createActivationCode = async (durationMonths: number = 1): Promise<ActivationCode | null> => {
  if (!db || !auth.currentUser) return null;
  
  try {
    const codeStr = generateRandomCode();
    const newCode: ActivationCode = {
      code: codeStr,
      createdAt: Date.now(),
      createdBy: auth.currentUser.uid,
      isUsed: false,
      durationMonths,
    };
    
    await setDoc(doc(db, 'activationCodes', codeStr), newCode);
    return newCode;
  } catch (error) {
    console.error("Error creating activation code:", error);
    return null;
  }
};

// Get all users paginated (Admin only)
export const getUsersPaginated = async (limitCount: number = 20, lastVisibleDoc: any = null) => {
  if (!db) return { users: [], lastVisible: null };
  
  try {
    let q = query(collection(db, 'users'), limit(limitCount));
    if (lastVisibleDoc) {
      q = query(collection(db, 'users'), startAfter(lastVisibleDoc), limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    
    const users: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserProfile);
    });
    
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    
    return { users, lastVisible };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], lastVisible: null };
  }
};

export const getAllUsers = async (): Promise<UserProfile[]> => {
  if (!db) return [];
  
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    
    const users: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserProfile);
    });
    
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Toggle Block Status
export const toggleBlockUser = async (uid: string, isBlocked: boolean): Promise<boolean> => {
  if (!db) return false;
  try {
    await updateDoc(doc(db, 'users', uid), { isBlocked });
    return true;
  } catch (error) {
    console.error("Error blocking user:", error);
    return false;
  }
};

// Delete Activation Code
export const deleteActivationCode = async (codeStr: string): Promise<boolean> => {
  if (!db) return false;
  try {
    await deleteDoc(doc(db, 'activationCodes', codeStr));
    return true;
  } catch (error) {
    console.error("Error deleting activation code:", error);
    return false;
  }
};

// Delete User Document
export const deleteUserDocument = async (uid: string): Promise<boolean> => {
  if (!db) return false;
  try {
    await deleteDoc(doc(db, 'users', uid));
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};

// Reset User Password
export const resetUserPassword = async (email: string): Promise<{success: boolean, message: string}> => {
  if (!auth) return {success: false, message: 'Auth not initialized'};
  try {
    await sendPasswordResetEmail(auth, email);
    return {success: true, message: 'Password reset email sent successfully'};
  } catch (error: any) {
    console.error("Error resetting password:", error);
    return {success: false, message: error.message || 'Failed to send reset email'};
  }
};
export const getActivationCodesPaginated = async (limitCount: number = 20, lastVisibleDoc: any = null) => {
  if (!db) return { codes: [], lastVisible: null };
  
  try {
    let q = query(collection(db, 'activationCodes'), orderBy('createdAt', 'desc'), limit(limitCount));
    if (lastVisibleDoc) {
      q = query(collection(db, 'activationCodes'), orderBy('createdAt', 'desc'), startAfter(lastVisibleDoc), limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    
    const codes: ActivationCode[] = [];
    querySnapshot.forEach((doc) => {
      codes.push(doc.data() as ActivationCode);
    });
    
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    
    return { codes, lastVisible };
  } catch (error) {
    console.error("Error fetching activation codes:", error);
    return { codes: [], lastVisible: null };
  }
};

export const getAllActivationCodes = async (): Promise<ActivationCode[]> => {
  if (!db) return [];
  
  try {
    const q = query(collection(db, 'activationCodes'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const codes: ActivationCode[] = [];
    querySnapshot.forEach((doc) => {
      codes.push(doc.data() as ActivationCode);
    });
    
    return codes;
  } catch (error) {
    console.error("Error fetching activation codes:", error);
    return [];
  }
};

// Redeem an activation code
export const redeemActivationCode = async (codeStr: string): Promise<{ success: boolean; message: string }> => {
  if (!db || !auth.currentUser) return { success: false, message: 'Not authenticated' };
  
  try {
    const codeRef = doc(db, 'activationCodes', codeStr);
    const codeSnap = await getDoc(codeRef);
    
    if (!codeSnap.exists()) {
      return { success: false, message: 'Invalid activation code' };
    }
    
    const codeData = codeSnap.data() as ActivationCode;
    
    if (codeData.isUsed) {
      return { success: false, message: 'This code has already been used' };
    }
    
    // Mark code as used
    await updateDoc(codeRef, {
      isUsed: true,
      usedBy: auth.currentUser.uid,
      usedAt: Date.now()
    });
    
    // Upgrade user to premium
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data() as UserProfile;
    
    const durationMs = (codeData.durationMonths || 1) * 30 * 24 * 60 * 60 * 1000;
    let newExpiry = Date.now() + durationMs;
    
    // If user is already premium and has an active expiration, extend it
    if (userData.isPremium && userData.premiumExpiresAt && userData.premiumExpiresAt > Date.now()) {
      newExpiry = userData.premiumExpiresAt + durationMs;
    }
    
    await updateDoc(userRef, {
      isPremium: true,
      premiumExpiresAt: newExpiry
    });
    
    return { success: true, message: 'Successfully upgraded to Premium!' };
  } catch (error: any) {
    console.error("Error redeeming code:", error);
    if (error.code === 'permission-denied') {
        return { success: false, message: 'Permission denied. Please check your login status.' };
    }
    return { success: false, message: 'An error occurred while redeeming the code' };
  }
};
