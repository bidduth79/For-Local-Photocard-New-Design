import React from 'react';
import { X, Palette } from 'lucide-react';
import DesignSettings from '../controls/news/DesignSettings';
import { PatternSettings } from '../controls/news/PatternSettings';
import AdvancedColorSettings from '../controls/news/AdvancedColorSettings';
import { useAppContext } from '../../context/AppContext';

export default function MobileDesignSettingsModal() {
  const state = useAppContext();
  
  if (!state.isMobileDesignSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex flex-col justify-end lg:hidden backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-slate-900 w-full max-h-[85vh] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        <div className="flex justify-between items-center p-4 border-b dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
          <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-500" />
            {state.language === 'bn' ? 'ডিজাইন সেটিংস' : 'Design Settings'}
          </h3>
          <button 
            onClick={() => state.setIsMobileDesignSettingsOpen(false)} 
            className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="overflow-y-auto p-4 custom-scrollbar pb-20">
          <DesignSettings />
          <div className="mt-4">
            <PatternSettings />
          </div>
          <div className="mt-4">
            <AdvancedColorSettings />
          </div>
        </div>
      </div>
    </div>
  );
}
