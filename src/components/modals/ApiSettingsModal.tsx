import React, { useState, useEffect } from 'react';
import { X, Key } from 'lucide-react';
import { showToast } from '../../utils/toast';

interface ApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'bn' | 'en';
  darkMode: boolean;
}

export const ApiSettingsModal: React.FC<ApiSettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  darkMode,
}) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (isOpen) {
      setApiKey(localStorage.getItem('GEMINI_API_KEY') || '');
    }
  }, [isOpen]);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('GEMINI_API_KEY', apiKey.trim());
      showToast.success(language === 'bn' ? 'API Key সংরক্ষিত হয়েছে' : 'API Key saved successfully');
    } else {
      localStorage.removeItem('GEMINI_API_KEY');
      showToast.success(language === 'bn' ? 'API Key মুছে ফেলা হয়েছে' : 'API Key removed');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${
          darkMode ? 'bg-slate-800' : 'bg-white'
        } animate-in zoom-in-95 duration-200`}
      >
        <div className={`p-4 border-b flex justify-between items-center ${
          darkMode ? 'border-slate-700' : 'border-gray-100'
        }`}>
          <div className="flex items-center gap-2">
            <Key className={darkMode ? 'text-indigo-400' : 'text-indigo-600'} size={20} />
            <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {language === 'bn' ? 'API সেটিংস' : 'API Settings'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              darkMode ? 'hover:bg-slate-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Google Gemini API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className={`w-full px-4 py-3 rounded-xl border mb-4 focus:ring-2 focus:ring-indigo-500 transition-colors ${
              darkMode 
                ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
            }`}
          />
          <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {language === 'bn' 
              ? 'এআই দিয়ে শিরোনাম তৈরি করার জন্য Google Gemini API Key প্রয়োজন। এটি শুধুমাত্র আপনার ব্রাউজারেই সেভ থাকবে।' 
              : 'Google Gemini API Key is required for AI features. It will only be stored locally in your browser.'}
          </p>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className={`px-5 py-2.5 rounded-xl font-medium transition-colors cursor-pointer ${
                darkMode 
                  ? 'bg-slate-700 text-white hover:bg-slate-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl font-medium text-white transition-colors cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg shadow-indigo-500/30"
            >
              {language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Key'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
