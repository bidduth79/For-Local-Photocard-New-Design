import React, { useState } from 'react';
import { RotateCcw, Wand2, Share2, Download, Maximize, DownloadCloud, Check } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface PreviewControlsProps {
  onDownload: () => void;
  onShare: () => void;
  onFullscreen: () => void;
  isMobile?: boolean;
}

export default function PreviewControls({ onDownload, onShare, onFullscreen, isMobile = false }: PreviewControlsProps) {
  const { 
    language, 
    darkMode, 
    activeTab, 
    selectedDesign, 
    resetAll, 
    applyRandomDesign,
    loadDemoSetup
  } = useAppContext();
  
  const [showSaveToast, setShowSaveToast] = useState(false);

  const handleLoadDemo = async () => {
    if (loadDemoSetup) {
      const success = await loadDemoSetup();
      if (success) {
        setShowSaveToast(true);
        setTimeout(() => setShowSaveToast(false), 3000);
      }
    }
  };

  return (
    <div className={`px-${isMobile ? '3' : '4'} py-${isMobile ? '2' : '3'} border-b flex items-center justify-between ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-100 border-gray-200'}`}>
      <div className="flex flex-col">
        <span className={`text-${isMobile ? 'xs' : 'sm'} font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {language === 'bn' ? 'প্রিভিউ' : 'Preview'}
        </span>
        <span className={`text-[10px] uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {activeTab === "news" 
            ? (language === 'bn' ? `ডিজাইন ${selectedDesign}` : `Design ${selectedDesign}`)
            : (language === 'bn' ? "উক্তি কার্ড" : "Quote Card")}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {showSaveToast && (
          <div className="bg-green-500 text-white px-2 py-1 rounded shadow text-xs font-medium flex items-center gap-1 animate-in fade-in duration-300">
            <Check size={12} />
            <span className="hidden sm:inline">{language === 'bn' ? 'লোড হয়েছে' : 'Loaded'}</span>
          </div>
        )}
        <button
          onClick={handleLoadDemo}
          className={isMobile 
            ? `p-1.5 rounded-md border transition-all hover:scale-110 active:scale-95 cursor-pointer ${darkMode ? 'border-indigo-900/50 text-indigo-400 hover:bg-indigo-900/20' : 'border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`
            : `text-xs font-medium px-3 py-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95 cursor-pointer ${darkMode ? 'border-indigo-900/50 text-indigo-400 hover:bg-indigo-900/20' : 'border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`
          }
          title={language === 'bn' ? 'ডেমো লোড করুন' : 'Load Demo'}
        >
          {isMobile ? <DownloadCloud size={16} /> : <><DownloadCloud size={14} className="inline-block mr-1" />{language === 'bn' ? 'লোড' : 'Load'}</>}
        </button>
        <button
          onClick={resetAll}
          className={isMobile 
            ? `p-1.5 rounded-md border transition-all hover:scale-110 active:scale-95 cursor-pointer ${darkMode ? 'border-red-900/50 text-red-400 hover:bg-red-900/20' : 'border-red-200 text-red-600 hover:bg-red-50'}`
            : `text-xs font-medium px-3 py-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95 cursor-pointer ${darkMode ? 'border-red-900/50 text-red-400 hover:bg-red-900/20' : 'border-red-200 text-red-600 hover:bg-red-50'}`
          }
          title={language === 'bn' ? 'রিসেট' : 'Reset'}
        >
          {isMobile ? <RotateCcw size={16} /> : <><RotateCcw size={14} className="inline-block mr-1" />{language === 'bn' ? 'রিসেট' : 'Reset'}</>}
        </button>
        <button
          onClick={applyRandomDesign}
          className={isMobile
            ? `p-1.5 rounded-md transition-all hover:scale-110 active:scale-95 cursor-pointer ${darkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`
            : `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer ${darkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`
          }
          title={language === 'bn' ? 'র‍্যান্ডম ডিজাইন' : 'Random Design'}
        >
          {isMobile ? <Wand2 size={16} /> : <Wand2 size={14} />}
        </button>
        <button
          onClick={onShare}
          className={isMobile
            ? `p-1.5 rounded-md transition-all hover:scale-110 active:scale-95 cursor-pointer ${darkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`
            : `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer ${darkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`
          }
          title={language === 'bn' ? 'শেয়ার' : 'Share'}
        >
          {isMobile ? <Share2 size={16} /> : <><Share2 size={14} />{language === 'bn' ? 'শেয়ার' : 'Share'}</>}
        </button>
        <button
          onClick={onDownload}
          className={isMobile
            ? `p-1.5 rounded-md transition-all hover:scale-110 active:scale-95 cursor-pointer ${darkMode ? 'bg-[#5934e8] text-white hover:bg-[#5934e8]/90' : 'bg-gray-900 text-white hover:bg-gray-800'}`
            : `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer ${darkMode ? 'bg-[#5934e8] text-white hover:bg-[#5934e8]/90' : 'bg-gray-900 text-white hover:bg-gray-800'}`
          }
          title={language === 'bn' ? 'ডাউনলোড' : 'Download'}
        >
          {isMobile ? <Download size={16} /> : <><Download size={14} />{language === 'bn' ? 'ডাউনলোড' : 'Download'}</>}
        </button>
        <button
          onClick={onFullscreen}
          className={isMobile
            ? `p-1.5 rounded-md transition-all hover:scale-110 active:scale-95 cursor-pointer ${darkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`
            : `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer ${darkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`
          }
          title={language === 'bn' ? 'ফুলস্ক্রিন' : 'Fullscreen'}
        >
          {isMobile ? <Maximize size={16} /> : <Maximize size={14} />}
        </button>
      </div>
    </div>
  );
}
