import React, { useState, useRef, useEffect } from 'react';
import { Newspaper, Moon, Sun, Languages, RotateCcw, Maximize, MoreVertical, Palette, LogIn, User, ShieldCheck, Settings } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  language: 'bn' | 'en';
  toggleLanguage: () => void;
  reloadApp: () => void;
  toggleFullscreen: () => void;
  onOpenDesignSettings?: () => void;
  loadDemoSetup?: () => void;
  onOpenAuth?: () => void;
  onOpenProfile?: () => void;
  onOpenAdmin?: () => void;
  onOpenApiSettings?: () => void;
  isAuthenticated?: boolean;
  isAdmin?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleTheme,
  language,
  toggleLanguage,
  reloadApp,
  toggleFullscreen,
  onOpenDesignSettings,
  loadDemoSetup,
  onOpenAuth,
  onOpenProfile,
  onOpenAdmin,
  onOpenApiSettings,
  isAuthenticated,
  isAdmin,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
      darkMode 
        ? 'bg-slate-900/80 border-slate-700/50' 
        : 'bg-white/80 border-gray-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={reloadApp}>
            <div className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer group-hover:scale-110 ${
              darkMode 
                ? 'bg-gradient-to-br from-[#5934e8] to-blue-600 shadow-lg shadow-[#5934e8]/20' 
                : 'bg-gradient-to-br from-[#5934e8] to-blue-600 shadow-lg shadow-[#5934e8]/30'
            }`}>
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                MediaCell
                <span className="text-[#5934e8]">.News</span>
              </h1>
              <p className={`text-[10px] font-medium tracking-wider uppercase ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Professional Card Maker
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Design Settings Quick Action (Mobile) */}
            {onOpenDesignSettings && (
              <button
                onClick={onOpenDesignSettings}
                className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer lg:hidden ${
                  darkMode 
                    ? 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30' 
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
                title={language === 'bn' ? 'ডিজাইন সেটিংস' : 'Design Settings'}
              >
                <Palette size={20} />
              </button>
            )}

            {/* Actions Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                  darkMode 
                    ? 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
                title={language === 'bn' ? 'মেনু' : 'Menu'}
              >
                <MoreVertical size={20} />
              </button>

              {isMenuOpen && (
                <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg border py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right ${
                  darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                }`}>
                  {onOpenDesignSettings && (
                    <button
                      onClick={() => { onOpenDesignSettings(); setIsMenuOpen(false); }}
                      className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-sm transition-colors lg:hidden ${
                        darkMode ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'}
                      }`}
                    >
                      <Palette size={16} className="text-indigo-500" />
                      {language === 'bn' ? 'ডিজাইন সেটিংস' : 'Design Settings'}
                    </button>
                  )}

                  <button
                    onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
                    className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-sm transition-colors ${
                      darkMode ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'}
                    }`}
                  >
                    {darkMode ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} />}
                    {language === 'bn' ? (darkMode ? 'লাইট মোড' : 'ডার্ক মোড') : (darkMode ? 'Light Mode' : 'Dark Mode')}
                  </button>

                  <button
                    onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                    className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-sm transition-colors ${
                      darkMode ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'}
                    }`}
                  >
                    <Languages size={16} />
                    {language === 'bn' ? 'English' : 'বাংলা'}
                  </button>

                  <div className={`h-px w-full my-1 ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`} />

                  <button
                    onClick={() => { onOpenApiSettings?.(); setIsMenuOpen(false); }}
                    className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-sm transition-colors ${
                      darkMode ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'}
                    }`}
                  >
                    <Settings size={16} className="text-indigo-500" />
                    {language === 'bn' ? 'API সেটিংস' : 'API Settings'}
                  </button>

                  <button
                    onClick={() => { toggleFullscreen(); setIsMenuOpen(false); }}
                    className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-sm transition-colors ${
                      darkMode ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'}
                    }`}
                  >
                    <Maximize size={16} />
                    {language === 'bn' ? 'ফুলস্ক্রিন' : 'Fullscreen'}
                  </button>

                  <button
                    onClick={() => { reloadApp(); setIsMenuOpen(false); }}
                    className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-sm transition-colors ${
                      darkMode ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'}
                    }`}
                  >
                    <RotateCcw size={16} />
                    {language === 'bn' ? 'রিলোড' : 'Reload'}
                  </button>

                  {loadDemoSetup && (
                    <button
                      onClick={() => { loadDemoSetup(); setIsMenuOpen(false); }}
                      className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-sm transition-colors ${
                        darkMode ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'}
                      }`}
                    >
                      <Palette size={16} className="text-pink-500" />
                      {language === 'bn' ? 'ডেমো ডাটা লোড করুন' : 'Load Demo Data'}
                    </button>
                  )}

                  <div className={`h-px w-full my-1 ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`} />

                  {isAuthenticated ? (
                    <button
                      onClick={() => { onOpenProfile?.(); setIsMenuOpen(false); }}
                      className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-sm transition-colors ${
                        darkMode ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'}
                      }`}
                    >
                      <User size={16} className="text-indigo-500" />
                      {language === 'bn' ? 'প্রোফাইল' : 'Profile'}
                    </button>
                  ) : (
                    <button
                      onClick={() => { onOpenAuth?.(); setIsMenuOpen(false); }}
                      className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-sm transition-colors ${
                        darkMode ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'}
                      }`}
                    >
                      <LogIn size={16} className="text-indigo-500" />
                      {language === 'bn' ? 'লগইন / সাইন আপ' : 'Login / Sign Up'}
                    </button>
                  )}

                  {isAdmin && (
                    <button
                      onClick={() => { onOpenAdmin?.(); setIsMenuOpen(false); }}
                      className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-sm transition-colors ${
                        darkMode ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'}
                      }`}
                    >
                      <ShieldCheck size={16} className="text-emerald-500" />
                      {language === 'bn' ? 'এডমিন প্যানেল' : 'Admin Panel'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
