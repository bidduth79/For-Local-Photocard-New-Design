import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ActivationCode, 
  createActivationCode, 
  getActivationCodesPaginated, 
  createPremiumUser, 
  getUsersPaginated, 
  toggleBlockUser, 
  deleteUserDocument, 
  resetUserPassword, 
  deleteActivationCode 
} from '../services/codeService';
import { UserProfile } from '../services/authService';
import { showToast } from '../utils/toast';

export const useAdmin = (language: 'bn' | 'en') => {
  const [codes, setCodes] = useState<ActivationCode[]>([]);
  const [lastCodeDoc, setLastCodeDoc] = useState<any>(null);
  const [hasMoreCodes, setHasMoreCodes] = useState(true);

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [lastUserDoc, setLastUserDoc] = useState<any>(null);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMoreCodes, setLoadingMoreCodes] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMoreUsers, setLoadingMoreUsers] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'codes' | 'users' | 'anonymous'>('codes');
  const [durationMonths, setDurationMonths] = useState<number>(1);
  const [codeSearch, setCodeSearch] = useState('');
  const [codeFilter, setCodeFilter] = useState<'all' | 'active' | 'used' | 'expired'>('all');
  
  // Create User State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);

  const fetchCodes = useCallback(async (isLoadMore = false) => {
    if (isLoadMore && loadingMoreCodes) return;
    if (!isLoadMore) {
        setLoading(true);
    } else {
        setLoadingMoreCodes(true);
    }

    const { codes: fetchedCodes, lastVisible } = await getActivationCodesPaginated(20, isLoadMore ? lastCodeDoc : null);
    
    if (isLoadMore) {
        setCodes(prev => [...prev, ...fetchedCodes]);
    } else {
        setCodes(fetchedCodes);
    }
    
    setLastCodeDoc(lastVisible);
    setHasMoreCodes(fetchedCodes.length === 20);
    
    if (!isLoadMore) {
        setLoading(false);
    } else {
        setLoadingMoreCodes(false);
    }
  }, [lastCodeDoc, loadingMoreCodes]);

  const fetchUsers = useCallback(async (isLoadMore = false) => {
    if (isLoadMore && loadingMoreUsers) return;
    if (!isLoadMore) {
        setLoadingUsers(true);
    } else {
        setLoadingMoreUsers(true);
    }

    const { users: fetchedUsers, lastVisible } = await getUsersPaginated(100, isLoadMore ? lastUserDoc : null);
    
    if (isLoadMore) {
        setUsers(prev => [...prev, ...fetchedUsers]);
    } else {
        setUsers(fetchedUsers);
    }
    
    setLastUserDoc(lastVisible);
    setHasMoreUsers(fetchedUsers.length === 100);
    
    if (!isLoadMore) {
        setLoadingUsers(false);
    } else {
        setLoadingMoreUsers(false);
    }
  }, [lastUserDoc, loadingMoreUsers]);

  useEffect(() => {
    fetchCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registeredUsers = useMemo(() => users.filter(u => !u.isAnonymous), [users]);
  const anonymousUsers = useMemo(() => users.filter(u => u.isAnonymous), [users]);
  const totalDownloads = useMemo(() => users.reduce((sum, user) => sum + (user.downloadCount || 0), 0), [users]);

  const filteredCodes = useMemo(() => codes.filter(code => {
    const searchMatch = code.code.toLowerCase().includes(codeSearch.toLowerCase()) || 
                        (code.usedBy && code.usedBy.toLowerCase().includes(codeSearch.toLowerCase()));
    if (codeSearch && !searchMatch) return false;

    let isExpired = false;
    if (code.isUsed && code.usedAt) {
      const expireDate = new Date(code.usedAt);
      expireDate.setMonth(expireDate.getMonth() + (code.durationMonths || 1));
      isExpired = expireDate.getTime() < Date.now();
    }

    if (codeFilter === 'active') return !code.isUsed && !isExpired;
    if (codeFilter === 'used') return code.isUsed;
    if (codeFilter === 'expired') return isExpired;
    
    return true; 
  }), [codes, codeSearch, codeFilter]);

  const [codeToDelete, setCodeToDelete] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const confirmDeleteCode = async () => {
    if (!codeToDelete) return;
    const success = await deleteActivationCode(codeToDelete);
    if (success) {
      showToast.success(language === 'bn' ? 'কোড ডিলিট হয়েছে!' : 'Code deleted!');
      // Filter out the deleted code immediately for better UX
      setCodes(prev => prev.filter(c => c.code !== codeToDelete));
    } else {
      showToast.error(language === 'bn' ? 'ডিলিট করতে সমস্যা হয়েছে' : 'Failed to delete code');
    }
    setCodeToDelete(null);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    const success = await deleteUserDocument(userToDelete);
    if (success) {
      showToast.success(language === 'bn' ? 'ইউজার ডিলিট হয়েছে!' : 'User deleted!');
      setUsers(prev => prev.filter(u => u.uid !== userToDelete));
    } else {
      showToast.error(language === 'bn' ? 'ডিলিট করতে সমস্যা হয়েছে' : 'Failed to delete user');
    }
    setUserToDelete(null);
  };

  const handleToggleBlock = async (uid: string, isBlocked: boolean) => {
    const success = await toggleBlockUser(uid, isBlocked);
    if (success) {
      showToast.success(language === 'bn' ? 'স্ট্যাটাস আপডেট হয়েছে!' : 'Status updated!');
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, isBlocked } : u));
    } else {
      showToast.error(language === 'bn' ? 'আপডেট করতে সমস্যা হয়েছে' : 'Failed to update status');
    }
  };

  const handleDeleteUser = (uid: string) => {
    setUserToDelete(uid);
  };

  const handleResetPassword = async (userEmail: string) => {
    const result = await resetUserPassword(userEmail);
    if (result.success) {
      showToast.success(language === 'bn' ? 'পাসওয়ার্ড রিসেট ইমেইল পাঠানো হয়েছে!' : result.message);
    } else {
      showToast.error(language === 'bn' ? 'ইমেইল পাঠাতে সমস্যা হয়েছে' : result.message);
    }
  };

  const handleDeleteCode = (codeStr: string) => {
    setCodeToDelete(codeStr);
  };

  const handleGenerateCode = async () => {
    setGenerating(true);
    const newCode = await createActivationCode(durationMonths);
    if (newCode) {
      setCodes([newCode, ...codes]);
      showToast.success(language === 'bn' ? 'নতুন কোড তৈরি হয়েছে!' : 'New code generated!');
    } else {
      showToast.error(language === 'bn' ? 'কোড তৈরি করতে সমস্যা হয়েছে' : 'Failed to generate code');
    }
    setGenerating(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setCreatingUser(true);
    const result = await createPremiumUser(email, password);
    
    if (result.success) {
      showToast.success(language === 'bn' ? 'ইউজার তৈরি হয়েছে!' : result.message);
      setEmail('');
      setPassword('');
      fetchUsers();
    } else {
      showToast.error(language === 'bn' ? 'ইউজার তৈরি করতে সমস্যা হয়েছে' : result.message);
    }
    setCreatingUser(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast.success(language === 'bn' ? 'কপি করা হয়েছে!' : 'Copied to clipboard!');
  };

  return {
    codes,
    users,
    loading,
    loadingMoreCodes,
    hasMoreCodes,
    loadingUsers,
    loadingMoreUsers,
    hasMoreUsers,
    generating,
    activeTab,
    setActiveTab,
    durationMonths,
    setDurationMonths,
    codeSearch,
    setCodeSearch,
    codeFilter,
    setCodeFilter,
    email,
    setEmail,
    password,
    setPassword,
    creatingUser,
    registeredUsers,
    anonymousUsers,
    totalDownloads,
    filteredCodes,
    handleToggleBlock,
    handleDeleteUser,
    handleResetPassword,
    handleDeleteCode,
    handleGenerateCode,
    handleCreateUser,
    copyToClipboard,
    fetchCodes,
    fetchUsers,
    codeToDelete,
    setCodeToDelete,
    confirmDeleteCode,
    userToDelete,
    setUserToDelete,
    confirmDeleteUser
  };
};
