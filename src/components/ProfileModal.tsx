import React, { useState, useEffect } from 'react';
import { X, Key, LogOut, ShieldCheck, Download, Crown } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { showToast } from '../utils/toast';
import { UserProfile, MAX_FREE_DOWNLOADS } from '../services/authService';
import { redeemActivationCode } from '../services/codeService';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'bn' | 'en';
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, language }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activationCode, setActivationCode] = useState('');
  const [redeeming, setRedeeming] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      if (!auth?.currentUser || !db) {
        setLoading(false);
        return;
      }
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserProfile(userSnap.data() as UserProfile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      showToast.success(language === 'bn' ? 'লগআউট সফল হয়েছে' : 'Logged out successfully');
      onClose();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activationCode.trim()) return;

    setRedeeming(true);
    try {
      const result = await redeemActivationCode(activationCode.trim());
      if (result.success) {
        showToast.success(language === 'bn' ? 'কোড সফলভাবে রিডিম হয়েছে!' : result.message);
        // Refresh profile
        const userRef = doc(db!, 'users', auth!.currentUser!.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserProfile(userSnap.data() as UserProfile);
        }
        setActivationCode('');
      } else {
        let errorMsg = result.message;
        if (language === 'bn') {
          if (result.message === 'Invalid activation code') errorMsg = 'ভুল বা অকার্যকর কোড';
          else if (result.message === 'This code has already been used') errorMsg = 'এই কোডটি ইতিমধ্যে ব্যবহার করা হয়েছে';
          else if (result.message === 'Not authenticated') errorMsg = 'আপনাকে লগইন করতে হবে';
          else errorMsg = 'কোড রিডিম করতে সমস্যা হচ্ছে';
        }
        showToast.error(errorMsg);
      }
    } catch (error) {
      console.error("Redeem error:", error);
      showToast.error(language === 'bn' ? 'একটি ত্রুটি ঘটেছে' : 'An error occurred');
    } finally {
      setRedeeming(false);
    }
  };

  const remainingDownloads = Math.max(0, MAX_FREE_DOWNLOADS - (userProfile?.downloadCount || 0));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="text-indigo-500" />
            {language === 'bn' ? 'প্রোফাইল' : 'Profile'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {loading ? (
            <div className="flex justify-center p-4">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Status Card */}
              <div className={`p-4 rounded-xl border ${userProfile?.isPremium ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700/30' : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>
                <div className="flex items-center gap-3 mb-2">
                  {userProfile?.isPremium ? (
                    <Crown className="text-amber-500" size={24} />
                  ) : (
                    <Download className="text-slate-500" size={24} />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {userProfile?.isPremium 
                        ? (language === 'bn' ? 'প্রিমিয়াম একাউন্ট' : 'Premium Account')
                        : (language === 'bn' ? 'ফ্রি একাউন্ট' : 'Free Account')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {auth?.currentUser?.email || (language === 'bn' ? 'গেস্ট ইউজার' : 'Guest User')}
                    </p>
                  </div>
                </div>
                
                {userProfile?.isPremium ? (
                  <div className="mt-4 pt-4 border-t border-amber-200/50 dark:border-amber-700/50 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-800/70 dark:text-amber-200/70">
                        {language === 'bn' ? 'মোট ডাউনলোড:' : 'Total Downloads:'}
                      </span>
                      <span className="font-bold text-amber-900 dark:text-amber-100">
                        {userProfile.downloadCount || 0}
                      </span>
                    </div>
                    {userProfile.premiumExpiresAt && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-amber-800/70 dark:text-amber-200/70">
                            {language === 'bn' ? 'মেয়াদ শেষ হবে:' : 'Expires At:'}
                          </span>
                          <span className="font-bold text-amber-900 dark:text-amber-100">
                            {new Date(userProfile.premiumExpiresAt).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-amber-800/70 dark:text-amber-200/70">
                            {language === 'bn' ? 'বাকি আছে:' : 'Days Remaining:'}
                          </span>
                          <span className="font-bold text-amber-900 dark:text-amber-100">
                            {Math.max(0, Math.ceil((userProfile.premiumExpiresAt - Date.now()) / (1000 * 60 * 60 * 24)))} {language === 'bn' ? 'দিন' : 'Days'}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">
                        {language === 'bn' ? 'বাকি ডাউনলোড:' : 'Remaining Downloads:'}
                      </span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {remainingDownloads} / {MAX_FREE_DOWNLOADS}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${(remainingDownloads / MAX_FREE_DOWNLOADS) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Redeem Code Section */}
              {!userProfile?.isPremium && !auth?.currentUser?.isAnonymous && (
                <form onSubmit={handleRedeem} className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'bn' ? 'অ্যাক্টিভেশন কোড ব্যবহার করুন' : 'Redeem Activation Code'}
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={activationCode}
                        onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                        placeholder="PRO-XXXX-XXXX"
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={redeeming || !activationCode.trim()}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center min-w-[100px]"
                    >
                      {redeeming ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        language === 'bn' ? 'রিডিম' : 'Redeem'
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Anonymous Warning */}
              {auth?.currentUser?.isAnonymous && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-xl text-sm">
                  {language === 'bn' 
                    ? 'আপনি লগিন ছাড়া ব্যবহার করছেন। প্রিমিয়াম কোড ব্যবহার করতে আগে একাউন্ট তৈরি করুন।' 
                    : 'You are using a guest account. Please create an account to redeem a premium code.'}
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                {language === 'bn' ? 'লগআউট' : 'Logout'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
