import React, { useState } from 'react';
import { X, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { showToast } from '../utils/toast';
import { initializeUserDoc } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'bn' | 'en';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, language }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        showToast.success(language === 'bn' ? 'লগিন সফল হয়েছে!' : 'Login successful!');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await initializeUserDoc(userCredential.user);
        showToast.success(language === 'bn' ? 'একাউন্ট তৈরি সফল হয়েছে!' : 'Account created successfully!');
      }
      onClose();
    } catch (error: any) {
      let errorMessage = error.message;
      if (error.code === 'auth/configuration-not-found') {
        console.error("Auth error:", error);
        errorMessage = language === 'bn' 
          ? 'ফায়ারবেস কনসোলে Email/Password লগইন চালু করা নেই। অনুগ্রহ করে Firebase Console > Authentication > Sign-in method থেকে Email/Password চালু করুন।'
          : 'Email/Password authentication is not enabled in Firebase. Please enable it in Firebase Console > Authentication > Sign-in method.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = language === 'bn' ? 'এই ইমেইলটি ইতিমধ্যে ব্যবহৃত হয়েছে' : 'This email is already in use';
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        errorMessage = language === 'bn' ? 'ইমেইল বা পাসওয়ার্ড ভুল' : 'Invalid email or password';
      } else {
        console.error("Auth error:", error);
      }
      
      showToast.error(errorMessage || (language === 'bn' ? 'একটি ত্রুটি ঘটেছে' : 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {isLogin 
              ? (language === 'bn' ? 'লগিন করুন' : 'Login') 
              : (language === 'bn' ? 'একাউন্ট তৈরি করুন' : 'Create Account')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'bn' ? 'ইমেইল এড্রেস' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isLogin ? (
              <>
                <LogIn size={18} />
                {language === 'bn' ? 'লগিন' : 'Login'}
              </>
            ) : (
              <>
                <UserPlus size={18} />
                {language === 'bn' ? 'একাউন্ট তৈরি করুন' : 'Create Account'}
              </>
            )}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isLogin 
                ? (language === 'bn' ? 'একাউন্ট নেই? নতুন তৈরি করুন' : "Don't have an account? Sign up") 
                : (language === 'bn' ? 'আগে থেকে একাউন্ট আছে? লগিন করুন' : 'Already have an account? Login')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
