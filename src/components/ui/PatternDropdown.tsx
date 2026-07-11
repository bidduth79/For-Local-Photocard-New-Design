import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Image as ImageIcon } from 'lucide-react';
import { SavedPattern } from '../../hooks/usePatterns';

interface PatternDropdownProps {
  patterns: SavedPattern[];
  selectedPatternUrls: string[];
  onSelect: (pattern: SavedPattern) => void;
  language: 'en' | 'bn';
  darkMode: boolean;
}

const PatternDropdown: React.FC<PatternDropdownProps> = ({
  patterns,
  selectedPatternUrls,
  onSelect,
  language,
  darkMode
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUpwards(spaceBelow < 300); // Need about 300px for the dropdown
    }
    setIsOpen(!isOpen);
  };

  const selectedCount = selectedPatternUrls.length;
  const selectedText = selectedCount > 0 
    ? (language === 'bn' ? `${selectedCount}টি প্যাটার্ন নির্বাচিত` : `${selectedCount} patterns selected`)
    : (language === 'bn' ? 'প্যাটার্ন নির্বাচন করুন' : 'Select Pattern');

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={toggleOpen}
        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border transition-colors ${
          darkMode 
            ? 'bg-slate-800 border-slate-700 text-gray-200 hover:border-slate-600' 
            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
        }`}
      >
        <span className="truncate flex items-center gap-2">
          <ImageIcon size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          {selectedText}
        </span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 w-full ${openUpwards ? 'bottom-full mb-1' : 'mt-1'} py-1 rounded-lg shadow-xl border max-h-60 overflow-y-auto ${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        }`}>
          {patterns.length === 0 ? (
            <div className={`px-4 py-3 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === 'bn' ? 'কোনো প্যাটার্ন পাওয়া যায়নি' : 'No patterns found'}
            </div>
          ) : (
            patterns.map((pattern, index) => (
              <button
                key={`${pattern.id}-${index}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(pattern);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                  darkMode 
                    ? 'hover:bg-slate-700 text-gray-200' 
                    : 'hover:bg-gray-50 text-gray-700'
                } ${selectedPatternUrls.includes(pattern.url) ? (darkMode ? 'bg-slate-700/50' : 'bg-gray-50') : ''}`}
              >
                <div className="flex items-center gap-3 truncate">
                  <div 
                    className="w-6 h-6 rounded border border-gray-200 dark:border-slate-600 flex-shrink-0"
                    style={{
                      backgroundImage: `url(${pattern.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <span className="truncate">{pattern.originalName}</span>
                </div>
                {selectedPatternUrls.includes(pattern.url) && (
                  <Check size={16} className="text-[#5934e8] flex-shrink-0 ml-2" />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PatternDropdown;
