import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Type, Search } from 'lucide-react';
import { SavedFont } from '../../hooks/useFonts';

interface FontDropdownProps {
  fonts: SavedFont[];
  selectedFontName: string;
  onSelect: (font: SavedFont) => void;
  language: 'bn' | 'en';
  darkMode: boolean;
}

export const FontDropdown: React.FC<FontDropdownProps> = ({
  fonts,
  selectedFontName,
  onSelect,
  language,
  darkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const selectedFont = fonts.find(f => f.name === selectedFontName);

  const filteredFonts = useMemo(() => {
    if (!searchQuery.trim()) return fonts;
    const query = searchQuery.toLowerCase();
    return fonts.filter(font => 
      font.originalName.toLowerCase().includes(query) || 
      font.name.toLowerCase().includes(query)
    );
  }, [fonts, searchQuery]);

  if (fonts.length === 0) return null;

  const toBengaliNumber = (num: number) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(d => bengaliDigits[parseInt(d)]).join('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
          darkMode 
            ? 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600' 
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span className="truncate mr-2">
          {selectedFont ? selectedFont.originalName : (language === 'bn' ? 'ফন্ট নির্বাচন করুন' : 'Select Font')}
        </span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 w-full min-w-full mt-1 py-1 rounded-lg shadow-lg border flex flex-col ${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        }`}>
          <div className={`px-3 py-2 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className={`flex items-center px-2 py-1.5 rounded-md ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <Search size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'bn' ? 'ফন্ট খুঁজুন...' : 'Search fonts...'}
                className={`w-full ml-2 bg-transparent border-none outline-none text-sm ${
                  darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {filteredFonts.length > 0 ? (
              filteredFonts.map((font, index) => (
                <button
                  key={font.id || font.name}
                  onClick={() => {
                    onSelect(font);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                    selectedFontName === font.name
                      ? (darkMode ? 'bg-[#5934e8]/20 text-[#5934e8]' : 'bg-[#5934e8]/10 text-[#5934e8]')
                      : (darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100')
                  }`}
                >
                  <span className="flex-1 truncate text-lg" style={{ fontFamily: font.name }}>
                    {language === 'bn' ? 'আমার সোনার বাংলা' : 'The quick brown fox'}
                    <span className="block text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {toBengaliNumber(index + 1)}. {font.originalName}
                    </span>
                  </span>
                  {selectedFontName === font.name && <div className="w-1.5 h-1.5 rounded-full bg-[#5934e8]" />}
                </button>
              ))
            ) : (
              <div className={`px-4 py-3 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'bn' ? 'কোনো ফন্ট পাওয়া যায়নি' : 'No fonts found'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
