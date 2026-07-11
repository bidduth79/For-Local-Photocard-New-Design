import { useAppStore } from '../../../store/appStore';
import { useShallow } from 'zustand/react/shallow';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Palette, RotateCcw } from 'lucide-react';

const modernColors = [
  '#000000', '#1f2937', '#4b5563', '#9ca3af', '#e5e7eb',
  '#7f1d1d', '#b91c1c', '#ef4444', '#f87171', '#fca5a5',
  '#7c2d12', '#c2410c', '#f97316', '#fb923c', '#fdba74',
  '#78350f', '#b45309', '#f59e0b', '#fbbf24', '#fcd34d',
  '#14532d', '#15803d', '#22c55e', '#4ade80', '#86efac',
  '#1e3a8a', '#1d4ed8', '#3b82f6', '#60a5fa', '#93c5fd',
  '#4c1d95', '#6d28d9', '#8b5cf6', '#a78bfa', '#c4b5fd',
  '#831843', '#be185d', '#ec4899', '#f472b6', '#fbcfe8'
];



export default function AdvancedColorSettings() {
  const { customDateColor, setCustomDateColor, customDateBgColor, setCustomDateBgColor, customDetailsTextColor, setCustomDetailsTextColor, customVisitTextColor, setCustomVisitTextColor, customLogoTextColor, setCustomLogoTextColor, customLogoBgColor, setCustomLogoBgColor, customQrColor, setCustomQrColor, customSocialIconColor, setCustomSocialIconColor, language, darkMode, isAdvancedColorsExpanded: isExpanded, setIsAdvancedColorsExpanded: setIsExpanded } = useAppStore(useShallow(state => ({ customDateColor: state.customDateColor, setCustomDateColor: state.setCustomDateColor, customDateBgColor: state.customDateBgColor, setCustomDateBgColor: state.setCustomDateBgColor, customDetailsTextColor: state.customDetailsTextColor, setCustomDetailsTextColor: state.setCustomDetailsTextColor, customVisitTextColor: state.customVisitTextColor, setCustomVisitTextColor: state.setCustomVisitTextColor, customLogoTextColor: state.customLogoTextColor, setCustomLogoTextColor: state.setCustomLogoTextColor, customLogoBgColor: state.customLogoBgColor, setCustomLogoBgColor: state.setCustomLogoBgColor, customQrColor: state.customQrColor, setCustomQrColor: state.setCustomQrColor, customSocialIconColor: state.customSocialIconColor, setCustomSocialIconColor: state.setCustomSocialIconColor, language: state.language, darkMode: state.darkMode, isAdvancedColorsExpanded: state.isAdvancedColorsExpanded, setIsAdvancedColorsExpanded: state.setIsAdvancedColorsExpanded })));

  const resetColors = () => {
    setCustomDateColor("");
    setCustomDateBgColor("");
    setCustomDetailsTextColor("");
    setCustomVisitTextColor("");
    setCustomLogoTextColor("");
    setCustomLogoBgColor("");
    setCustomQrColor("");
    setCustomSocialIconColor("");
  };

  const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openUpwards, setOpenUpwards] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleOpen = () => {
      if (!isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        // If the button is in the bottom half of the screen, open upwards
        if (rect.bottom > window.innerHeight / 2) {
          setOpenUpwards(true);
        } else {
          setOpenUpwards(false);
        }
      }
      setIsOpen(!isOpen);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    return (
      <div className="flex items-center justify-between relative">
        <label className="text-sm text-gray-600 dark:text-gray-300">{label}</label>
        <div className="flex items-center gap-2">
          {value && (
            <button 
              onClick={() => onChange("")}
              className="text-xs text-red-500 hover:text-red-600 dark:text-red-400"
              title={language === 'bn' ? 'রিসেট করুন' : 'Reset'}
            >
              <RotateCcw size={14} />
            </button>
          )}
          <div className="relative" ref={popoverRef}>
            <button
              ref={buttonRef}
              onClick={toggleOpen}
              className={`w-8 h-8 rounded-md overflow-hidden border border-gray-200 dark:border-slate-700 flex items-center justify-center ${!value ? 'bg-gray-100 dark:bg-slate-800' : ''}`}
              style={{ backgroundColor: value || 'transparent' }}
              title={!value ? (language === 'bn' ? 'ডিফল্ট থিম কালার' : 'Default Theme Color') : ''}
            >
              {!value && (
                <span className="text-[10px] text-gray-400">Auto</span>
              )}
            </button>

            {isOpen && (
              <div className={`absolute ${openUpwards ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 p-4 rounded-xl shadow-2xl border z-[100] w-64 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {modernColors.map(c => (
                    <button 
                      key={c}
                      onClick={() => {
                        onChange(c);
                        setIsOpen(false);
                      }}
                      className={`w-8 h-8 rounded-full border transition-transform hover:scale-110 ${value === c ? 'ring-2 ring-offset-2 ring-[#5934e8]' : 'border-gray-200'}`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 border-t pt-3 border-gray-100 dark:border-slate-700">
                  <input 
                    type="color" 
                    value={value || "#000000"}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <span className={`text-xs font-mono uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {value || 'Auto'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`rounded-2xl shadow-sm border transition-all duration-300 ${
      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'
    }`} id="panel-advanced-colors">
      <div 
        className={`border-b flex items-center justify-between px-6 py-4 cursor-pointer transition-colors w-full ${darkMode ? 'border-slate-700 hover:bg-slate-700/50' : 'border-gray-100 hover:bg-gray-50'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'bg-slate-700 text-[#5934e8]' : 'bg-[#5934e8]/10 text-[#5934e8]'
          }`}>
            <Palette size={20} />
          </div>
          <span className={`font-semibold text-lg ${
            darkMode ? 'text-gray-200' : 'text-gray-900'
          }`}>
            {language === 'bn' ? 'অ্যাডভান্সড কালার' : 'Advanced Colors'}
          </span>
        </div>
        <button 
          className={`p-1 rounded-md transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
        >
          <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden">
        <div className="p-6 space-y-6 ">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {language === 'bn' ? 'অটোমেটিক কালার পরিবর্তন করতে রিসেট করুন' : 'Reset to use automatic theme colors'}
            </p>
            <button 
              onClick={resetColors}
              className="text-xs flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <RotateCcw size={12} />
              {language === 'bn' ? 'সব রিসেট' : 'Reset All'}
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {language === 'bn' ? 'হেডার ও লোগো' : 'Header & Logo'}
            </h4>
            <ColorInput 
              label={language === 'bn' ? 'তারিখের টেক্সট কালার' : 'Date Text Color'} 
              value={customDateColor} 
              onChange={setCustomDateColor} 
            />
            <ColorInput 
              label={language === 'bn' ? 'তারিখের ব্যাকগ্রাউন্ড' : 'Date Background'} 
              value={customDateBgColor} 
              onChange={setCustomDateBgColor} 
            />
            <ColorInput 
              label={language === 'bn' ? 'ডিফল্ট লোগো টেক্সট' : 'Default Logo Text'} 
              value={customLogoTextColor} 
              onChange={setCustomLogoTextColor} 
            />
            <ColorInput 
              label={language === 'bn' ? 'ডিফল্ট লোগো ব্যাকগ্রাউন্ড' : 'Default Logo Background'} 
              value={customLogoBgColor} 
              onChange={setCustomLogoBgColor} 
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-700">
            <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {language === 'bn' ? 'ফুটার ও অন্যান্য' : 'Footer & Other'}
            </h4>
            <ColorInput 
              label={language === 'bn' ? '"বিস্তারিত কমেন্টে" কালার' : '"Details in comments" Color'} 
              value={customDetailsTextColor} 
              onChange={setCustomDetailsTextColor} 
            />
            <ColorInput 
              label={language === 'bn' ? '"আরও বিস্তারিত জানতে" কালার' : '"Visit for more details" Color'} 
              value={customVisitTextColor} 
              onChange={setCustomVisitTextColor} 
            />
            <ColorInput 
              label={language === 'bn' ? 'কিউআর কোড কালার' : 'QR Code Color'} 
              value={customQrColor} 
              onChange={setCustomQrColor} 
            />
            <ColorInput 
              label={language === 'bn' ? 'সোশ্যাল মিডিয়া আইকন' : 'Social Media Icons'} 
              value={customSocialIconColor} 
              onChange={setCustomSocialIconColor} 
            />
          </div>
        </div>
      </div></div>
    </div>
  );
}
