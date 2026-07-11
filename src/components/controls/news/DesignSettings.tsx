import React, { useRef, useState } from 'react';
import { Layout, ChevronDown, ChevronUp, MoveVertical, Upload, Type, Image as ImageIcon, X } from 'lucide-react';
import { useFonts } from '../../../hooks/useFonts';
import { FontDropdown } from '../../ui/FontDropdown';
import { GradientPicker } from '../../ui/GradientPicker';
import { defaultFonts } from '../../../data/fonts';
import { showToast } from '../../../utils/toast';
import { useAppStore } from '../../../store/appStore';
import { useAppContext } from '../../../context/AppContext';
import { useShallow } from 'zustand/react/shallow';

const DesignSettings: React.FC = () => {
  const { 
    selectedDesign,
    setSelectedDesign,
    themeColor,
    setThemeColor: zustandSetThemeColor,
    setGradientStart: zustandSetGradientStart,
    setGradientEnd: zustandSetGradientEnd,
    setCardGradientStart: zustandSetCardGradientStart,
    setCardGradientEnd: zustandSetCardGradientEnd,
    language,
    darkMode,
    isDesignSettingsExpanded: isExpanded,
    setIsDesignSettingsExpanded: setIsExpanded,
    imageOffsetY,
    setImageOffsetY,
    customFontUrl,
    setCustomFontUrl,
    customFontName,
    setCustomFontName,
    brandFontUrl,
    setBrandFontUrl,
    brandFontName,
    setBrandFontName,
    overlayOpacity,
    setOverlayOpacity,
    applyGradientToAll,
    setApplyGradientToAll,
    image,
    gradientStart, gradientEnd, cardGradientStart, cardGradientEnd,
    videoResolution, setVideoResolution
  } = useAppStore(useShallow(state => ({
    selectedDesign: state.selectedDesign,
    setSelectedDesign: state.setSelectedDesign,
    themeColor: state.themeColor,
    setThemeColor: state.setThemeColor,
    setGradientStart: state.setGradientStart,
    setGradientEnd: state.setGradientEnd,
    setCardGradientStart: state.setCardGradientStart,
    setCardGradientEnd: state.setCardGradientEnd,
    language: state.language,
    darkMode: state.darkMode,
    isDesignSettingsExpanded: state.isDesignSettingsExpanded,
    setIsDesignSettingsExpanded: state.setIsDesignSettingsExpanded,
    imageOffsetY: state.imageOffsetY,
    setImageOffsetY: state.setImageOffsetY,
    customFontUrl: state.customFontUrl,
    setCustomFontUrl: state.setCustomFontUrl,
    customFontName: state.customFontName,
    setCustomFontName: state.setCustomFontName,
    brandFontUrl: state.brandFontUrl,
    setBrandFontUrl: state.setBrandFontUrl,
    brandFontName: state.brandFontName,
    setBrandFontName: state.setBrandFontName,
    overlayOpacity: state.overlayOpacity,
    setOverlayOpacity: state.setOverlayOpacity,
    applyGradientToAll: state.applyGradientToAll,
    setApplyGradientToAll: state.setApplyGradientToAll,
    image: state.image,
    gradientStart: state.gradientStart,
    gradientEnd: state.gradientEnd,
    cardGradientStart: state.cardGradientStart,
    cardGradientEnd: state.cardGradientEnd,
    videoResolution: state.videoResolution,
    setVideoResolution: state.setVideoResolution
  })));
    const setThemeColor = (c: string) => { zustandSetThemeColor(c); useAppStore.getState().setAutoColorMode(false); };
    const setGradientStart = (c: string) => { zustandSetGradientStart(c); useAppStore.getState().setAutoColorMode(false); };
    const setGradientEnd = (c: string) => { zustandSetGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };
    const setCardGradientStart = (c: string) => { zustandSetCardGradientStart(c); useAppStore.getState().setAutoColorMode(false); };
    const setCardGradientEnd = (c: string) => { zustandSetCardGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };
    


  const designs = [
    { id: 0, name: "Classic Split", color: "bg-white" },
    { id: 1, name: "Dark Gradient", color: "bg-gray-900" },
    { id: 2, name: "Red Modern", color: "bg-red-50" },
    { id: 3, name: "Full Overlay", color: "bg-black" },
    { id: 4, name: "Minimal Box", color: "bg-gray-100" },
    { id: 5, name: "Glass Morph", color: "bg-blue-50" },
    { id: 6, name: "Clean Frame", color: "bg-white" },
    { id: 7, name: "Dark Overlay", color: "bg-gray-900" },
    { id: 8, name: "Magazine", color: "bg-white" },
    { id: 9, name: "Ribbon & Box", color: "bg-slate-900" },
    { id: 10, name: "Geometric", color: "bg-[#1c1c1c]" },
    { id: 11, name: "Modern Geometric", color: "bg-slate-900" },
    { id: 12, name: "Breaking News Sidebar", color: "bg-red-600" },
    { id: 13, name: "Dark Quote Overlay", color: "bg-slate-900" },
    { id: 14, name: "Light Quote Frame", color: "bg-white" },
    { id: 15, name: "Red Diagonal Frame", color: "bg-red-800" },
    { id: 16, name: "Today's Special", color: "bg-gray-100" },
    { id: 17, name: "Theme 18", color: "bg-white" },
    { id: 18, name: "Circle Overlay", color: "bg-white" },
    { id: 19, name: "Modern Split", color: "bg-slate-900" },
    { id: 20, name: "Video Card", color: "bg-black" },
    { id: 21, name: "Quote Card", color: "bg-yellow-100" },
    { id: 22, name: "Slanted Banner", color: "bg-green-100" },
  ];

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

  const colorGroups = [
    {
      name: "Reds & Pinks",
      nameBn: "লাল ও গোলাপি",
      colors: [
        '#FFF1F2', '#FFE4E6', '#FCE4EC', '#FEE2E2', '#FEF2F2', '#FFEBEE', '#F8BBD0', '#FECDD3', '#FECACA', '#FFCDD2',
        '#FDA4AF', '#FCA5A5', '#F48FB1', '#FB7185', '#EF9A9A', '#F87171', '#F06292', '#FF8A80', '#E57373', '#EF4444',
        '#FF5252', '#EF5350', '#EC407A', '#F43F5E', '#F44336', '#DC2626', '#E53935', '#E11D48', '#FF1744', '#E91E63',
        '#D32F2F', '#D81B60', '#C62828', '#B91C1C', '#C2185B', '#BE123C', '#D50000', '#B71C1C', '#991B1B', '#AD1457',
        '#9F1239', '#7F1D1D', '#881337', '#880E4F', '#FF80AB', '#FF4081', '#F50057', '#C51162', '#FF2E63', '#D90429'
      ]
    },
    {
      name: "Oranges & Yellows",
      nameBn: "কমলা ও হলুদ",
      colors: [
        '#FEFCE8', '#FFFBEB', '#FFF7ED', '#FFF8E1', '#FEF3C7', '#FFF3E0', '#FEF08A', '#FFECB3', '#FFEDD5', '#FDE68A',
        '#FDE047', '#FFE0B2', '#FED7AA', '#FCD34d', '#FACC15', '#FFE082', '#FDBA74', '#FFCC80', '#FBBF24', '#EAB308',
        '#FFD54F', '#FFB74D', '#FB923C', '#FFCA28', '#FFA726', '#F59E0B', '#FFC107', '#F97316', '#FF9800', '#FB8C00',
        '#D97706', '#EA580C', '#F57C00', '#CA8A04', '#EF6C00', '#C2410C', '#B45309', '#E65100', '#A16207', '#9A3412',
        '#92400E', '#854D0E', '#7C2D12', '#78350F', '#713F12', '#422006', '#FFD180', '#FFAB40', '#FF9100', '#FF6D00'
      ]
    },
    {
      name: "Greens",
      nameBn: "সবুজ",
      colors: [
        '#F7FEE7', '#F0FDF4', '#ECFDF5', '#F1F8E9', '#ECFCCB', '#E8F5E9', '#DCFCE7', '#D1FAE5', '#DCEDC8', '#D9F99D',
        '#C8E6C9', '#C5E1A5', '#BBF7D0', '#A7F3D0', '#BEF264', '#A5D6A7', '#AED581', '#A3E635', '#86EFAC', '#9CCC65',
        '#81C784', '#6EE7B7', '#84CC16', '#8BC34A', '#66BB6A', '#4ADE80', '#34D399', '#65A30D', '#4CAF50', '#22C55E',
        '#43A047', '#10B981', '#16A34A', '#388E3C', '#059669', '#4D7C0F', '#15803D', '#2E7D32', '#047857', '#166534',
        '#065F46', '#3F6212', '#14532D', '#1B5E20', '#064E3B', '#365314', '#B9F6CA', '#69F0AE', '#00E676', '#00C853'
      ]
    },
    {
      name: "Teals & Cyans",
      nameBn: "টিল ও সায়ান",
      colors: [
        '#ECFEFF', '#F0FDFA', '#E0F7FA', '#CFFAFE', '#CCFBF1', '#B2EBF2', '#E0F2F1', '#A5F3FC', '#99F6E4', '#80DEEA',
        '#B2DFDB', '#67E8F9', '#5EEAD4', '#4DD0E1', '#80CBC4', '#22D3EE', '#2DD4BF', '#26C6DA', '#4DB6AC', '#06B6D4',
        '#00BCD4', '#14B8A6', '#26A69A', '#0891B2', '#00ACC1', '#0D9488', '#009688', '#0097A7', '#0E7490', '#0F766E',
        '#00897B', '#00838F', '#155E75', '#115E59', '#00796B', '#006064', '#164E63', '#134E4A', '#00695C', '#004D40',
        '#A7FFEB', '#84FFFF', '#64FFDA', '#18FFFF', '#1DE9B6', '#00E5FF', '#00BFA5', '#00B8D4', '#71C9CE', '#00ADB5'
      ]
    },
    {
      name: "Blues",
      nameBn: "নীল",
      colors: [
        '#F0F9FF', '#EFF6FF', '#EEF2FF', '#E3F2FD', '#E0F2FE', '#DBEAFE', '#E0E7FF', '#BBDEFB', '#BAE6FD', '#BFDBFE',
        '#C7D2FE', '#90CAF9', '#93C5FD', '#7DD3FC', '#A5B4FC', '#64B5F6', '#60A5FA', '#818CF8', '#38BDF8', '#42A5F5',
        '#3B82F6', '#6366F1', '#2196F3', '#0EA5E9', '#4F46E5', '#2563EB', '#1E88E5', '#0284C7', '#4338CA', '#1976D2',
        '#1D4ED8', '#0369A1', '#1565C0', '#3730A3', '#1E40AF', '#075985', '#0D47A1', '#312E81', '#1E3A8A', '#0C4A6E',
        '#82B1FF', '#448AFF', '#2979FF', '#90CDF4', '#63B3ED', '#4299E1', '#3182CE', '#2B6CB0', '#2C5282', '#2A4365'
      ]
    },
    {
      name: "Purples",
      nameBn: "বেগুনি",
      colors: [
        '#FDF4FF', '#FAF5FF', '#F5F3FF', '#F3E5F5', '#FAE8FF', '#F3E8FF', '#EDE9FE', '#EDE7F6', '#E1BEE7', '#F5D0FE',
        '#E9D5FF', '#DDD6FE', '#D1C4E9', '#CE93D8', '#F0ABFC', '#D8B4FE', '#C4B5FD', '#B39DDB', '#BA68C8', '#E879F9',
        '#C084FC', '#A78BFA', '#AB47BC', '#9575CD', '#D946EF', '#A855F7', '#8B5CF6', '#9C27B0', '#7E57C2', '#C026D3',
        '#9333EA', '#7C3AED', '#8E24AA', '#673AB7', '#A21CAF', '#7E22CE', '#6D28D9', '#7B1FA2', '#86198F', '#6B21A8',
        '#5B21B6', '#6A1B9A', '#701A75', '#581C87', '#4C1D95', '#4A148C', '#EA80FC', '#E040FB', '#D500F9', '#AA00FF'
      ]
    },
    {
      name: "Browns & Earth",
      nameBn: "বাদামি ও আর্থ টোন",
      colors: [
        '#FAFAF9', '#F5F5F4', '#EFEBE9', '#E7E5E4', '#D7CCC8', '#D6D3D1', '#BCAAA4', '#A8A29E', '#A1887F', '#8D6E63',
        '#78716C', '#795548', '#6D4C41', '#57534E', '#5D4037', '#44403C', '#4E342E', '#3E2723', '#292524', '#1C1917',
        '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00',
        '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722', '#F4511E', '#E64A19', '#D84315', '#BF360C',
        '#FFE8D6', '#DDBEA9', '#D4A373', '#CB997E', '#B7B7A4', '#A5A58D', '#6B705C', '#8D6E63', '#5D4037', '#4F4A41'
      ]
    },
    {
      name: "Grays & Neutrals",
      nameBn: "ধূসর ও নিউট্রাল",
      colors: [
        '#FFFFFF', '#FAFAFA', '#F9FAFB', '#F8FAFC', '#F4F4F5', '#F3F4F6', '#F1F5F9', '#ECEFF1', '#E5E7EB', '#E4E4E7',
        '#E2E8F0', '#D4D4D8', '#D1D5DB', '#CFD8DC', '#CBD5E1', '#B0BEC5', '#A1A1AA', '#9CA3AF', '#94A3B8', '#90A4AE',
        '#78909C', '#71717A', '#6B7280', '#64748B', '#607D8B', '#546E7A', '#52525B', '#4B5563', '#475569', '#455A64',
        '#3F3F46', '#37474F', '#374151', '#334155', '#27272A', '#263238', '#1F2937', '#1E293B', '#18181B', '#111827',
        '#0F172A', '#000000', '#F9F7F7', '#F6F6F6', '#EEEEEE', '#E5E5E5', '#DBE2EF', '#8785A2', '#393E46', '#222831'
      ]
    },
    {
      name: "Pastels & Soft",
      nameBn: "প্যাস্টেল ও সফট",
      colors: [
        '#FEFAE0', '#FCE38A', '#FAEDCD', '#F4F1DE', '#E9EDC9', '#CCD5AE', '#E3FDFD', '#CBF1F5', '#A6E3E9', '#CAF0F8',
        '#ADE8F4', '#8ECAE6', '#D8E2DC', '#81B29A', '#95E1D3', '#EAFFD0', '#F2CC8F', '#E9C46A', '#F4A261', '#FFB703',
        '#FB8500', '#E76F51', '#E07A5F', '#FFE2E2', '#FFC7C7', '#FFCAD4', '#FCD5CE', '#FFB5A7', '#FEC5BB', '#FBC4AB',
        '#FFDAB9', '#FFCDB2', '#FFE5D9', '#FAE1DD', '#F8EDEB', '#F2E9E4', '#F8AD9D', '#F4978E', '#F08080', '#F38181',
        '#FFB4A2', '#E5989B', '#F4ACB7', '#B5838D', '#9D8189', '#C9ADA7', '#9A8C98', '#6D6875', '#4A4E69', '#22223B'
      ]
    },
    {
      name: "Rich & Darks",
      nameBn: "গাঢ় ও ডার্ক",
      colors: [
        '#E94560', '#E84545', '#E74C3C', '#E36414', '#FB8B24', '#EAAC8B', '#E56B6F', '#B56576', '#9A031E', '#5F0F40',
        '#903749', '#53354A', '#6D597A', '#3D405B', '#4A5568', '#718096', '#778DA9', '#E0E1DD', '#90E0EF', '#48CAE4',
        '#00B4D8', '#0096C7', '#0077B6', '#023E8A', '#03045E', '#3498DB', '#2A9D8F', '#264653', '#0F4C5C', '#112D32',
        '#254E58', '#415A77', '#355070', '#2B6CB0', '#2C5282', '#2A4365', '#1B263B', '#14213D', '#0D1B2A', '#0F3460',
        '#16213E', '#1A1A2E', '#2B2E4A', '#2C3E50', '#2D3748', '#1A202C', '#742A2A', '#9B2C2C', '#C53030', '#000000'
      ]
    }
  ];

  const fontInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFont, setUploadingFont] = useState(false);
  const [showMoreColors, setShowMoreColors] = useState(false);
  const { savedFonts, saveFont } = useFonts();

  const allFonts = [
    ...defaultFonts.map(f => ({ id: f.name, name: f.name, originalName: f.label, url: '' })),
    ...savedFonts
  ];

  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFont(true);
    const reader = new FileReader();
    
    reader.onload = async () => {
      try {
        const url = reader.result as string;
        const fontName = `CustomFont_${Date.now()}`;
        
        const newFont = new FontFace(fontName, `url(${url})`);
        await newFont.load();
        document.fonts.add(newFont);
        
        setCustomFontUrl(url);
        setCustomFontName(fontName);
        
        try {
          const result = await saveFont(fontName, url, file.name);
          if (result && result.url) {
            setCustomFontUrl(result.url);
          }
        } catch (dbError) {
          console.error('Error saving font to database:', dbError);
        }
      } catch (error) {
        console.error("Font processing failed", error);
        showToast.error(language === 'bn' ? "ফন্ট আপলোড ব্যর্থ হয়েছে।" : "Font upload failed.");
      } finally {
        setUploadingFont(false);
        if (fontInputRef.current) {
          fontInputRef.current.value = '';
        }
      }
    };
    
    reader.onerror = () => {
      console.error("Font read failed");
      setUploadingFont(false);
      showToast.error(language === 'bn' ? "ফন্ট আপলোড ব্যর্থ হয়েছে।" : "Font upload failed.");
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className={`rounded-2xl shadow-sm border transition-all duration-300 ${
      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'
    }`}>
      <div 
        className={`border-b flex items-center justify-between px-6 py-4 cursor-pointer transition-colors w-full ${darkMode ? 'border-slate-700 hover:bg-slate-700/50' : 'border-gray-100 hover:bg-gray-50'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'bg-slate-700 text-[#5934e8]' : 'bg-[#5934e8]/10 text-[#5934e8]'
          }`}>
            <Layout size={20} />
          </div>
          <span className={`font-semibold text-lg ${
            darkMode ? 'text-gray-200' : 'text-gray-900'
          }`}>
            {language === 'bn' ? 'ডিজাইন সেটিংস' : 'Design Settings'}
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
          {/* Design Selection Grid */}
          <div className="grid grid-cols-8 gap-1.5">
            {designs.map((d) => {
              const isVideo = image?.startsWith('data:video/');
              const isDisabled = isVideo && d.id !== 20;
              
              return (
              <button
                key={d.id}
                onClick={() => {
                  if (!isDisabled) setSelectedDesign(d.id);
                }}
                disabled={isDisabled}
                className={`relative aspect-square rounded-md border-2 transition-all overflow-hidden group ${
                  selectedDesign === d.id
                    ? 'border-[#5934e8] ring-1 ring-[#5934e8] ring-offset-1'
                    : darkMode ? 'border-slate-700 hover:border-slate-500' : 'border-gray-200 hover:border-gray-300'
                } ${isDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                <div className={`absolute inset-0 ${d.color} opacity-50`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {d.id}
                  </span>
                </div>
                {selectedDesign === d.id && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#5934e8] rounded-full animate-pulse" />
                )}
              </button>
            )})}
          </div>

          {/* Video Resolution Picker for Design 20 */}
          {selectedDesign === 20 && (
            <div className="pt-2">
              <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                {language === 'bn' ? 'ভিডিও রেজোলিউশন' : 'Video Resolution'}
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setVideoResolution('1080p')}
                  className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                    videoResolution === '1080p'
                      ? 'bg-[#5934e8] text-white border-[#5934e8]'
                      : darkMode
                        ? 'border-slate-700 text-gray-300 hover:bg-slate-800'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  1080p {language === 'bn' ? '(হাই কোয়ালিটি)' : '(High Quality)'}
                </button>
                <button
                  onClick={() => setVideoResolution('720p')}
                  className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                    videoResolution === '720p'
                      ? 'bg-[#5934e8] text-white border-[#5934e8]'
                      : darkMode
                        ? 'border-slate-700 text-gray-300 hover:bg-slate-800'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  720p {language === 'bn' ? '(দ্রুত ডাউনলোড)' : '(Fast Download)'}
                </button>
              </div>
            </div>
          )}

          {/* Theme Color Picker */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              {language === 'bn' ? 'থিম কালার' : 'Theme Color'}
            </label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="h-10 w-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <span className={`text-xs font-mono uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {themeColor}
                </span>
              </div>
              <div className="grid grid-cols-10 gap-1.5">
                {modernColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setThemeColor(color);
                      setGradientStart("");
                      setGradientEnd("");
                    }}
                    className={`h-6 w-full rounded-md border transition-transform hover:scale-110 ${
                      themeColor === color && !gradientStart ? 'ring-2 ring-offset-1 ring-[#5934e8]' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setShowMoreColors(!showMoreColors)}
                className={`flex items-center justify-center gap-2 w-full py-2 mt-1 text-xs font-medium rounded-md transition-colors ${
                  darkMode ? 'bg-slate-800 text-gray-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {language === 'bn' ? 'আরও কালার দেখুন' : 'See more colors'}
                {showMoreColors ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {showMoreColors && (
                <div className="mt-4 flex flex-col gap-4">
                  {colorGroups.map((group) => (
                    <div key={group.name}>
                      <h4 className={`text-xs font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {language === 'bn' ? group.nameBn : group.name}
                      </h4>
                      <div className="grid grid-cols-10 gap-1.5">
                        {group.colors.map((color, index) => (
                          <button
                            key={`${group.name}-${index}-${color}`}
                            onClick={() => {
                              setThemeColor(color);
                              setGradientStart("");
                              setGradientEnd("");
                            }}
                            className={`h-6 w-full rounded-md border transition-transform hover:scale-110 ${
                              themeColor === color && !gradientStart ? 'ring-2 ring-offset-1 ring-[#5934e8]' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Overlay Opacity Slider */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
            <label className={`flex items-center gap-2 text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              <ImageIcon size={16} />
              {language === 'bn' 
                ? (selectedDesign === 3 ? 'ছবির ওভারলে (থিম কালার)' : 'ছবির ওভারলে (কালো শেড)') 
                : (selectedDesign === 3 ? 'Image Overlay (Theme Color)' : 'Image Overlay Opacity')}
            </label>
            <div className="flex items-center gap-4">
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>0%</span>
              <div className="flex-1 flex items-center gap-2">
                <button 
                  onClick={() => setOverlayOpacity(Math.max(0, overlayOpacity - 1))}
                  className={`p-1 rounded-md ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                >-</button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                  className="w-full accent-[#5934e8]"
                />
                <button 
                  onClick={() => setOverlayOpacity(Math.min(100, overlayOpacity + 1))}
                  className={`p-1 rounded-md ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                >+</button>
              </div>
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>100%</span>
            </div>
          </div>

          {/* Gradient Controls (Conditional) */}
          {[0, 1, 2, 4, 5, 6, 8, 14, 21].includes(selectedDesign) && (
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-700">
              {[1, 2, 4, 5, 6, 8, 14, 21].includes(selectedDesign) && (
                <GradientPicker
                  label={language === 'bn' ? (selectedDesign === 21 ? 'ব্যাকগ্রাউন্ড গ্রাডিয়েন্ট' : 'হেডলাইন গ্রাডিয়েন্ট') : (selectedDesign === 21 ? 'Background Gradient' : 'Headline Gradient')}
                  startColor={gradientStart}
                  endColor={gradientEnd}
                  onChange={(start, end) => {
                    setGradientStart(start);
                    setGradientEnd(end);
                    if (selectedDesign === 21) {
                      setThemeColor(start);
                    }
                  }}
                  darkMode={darkMode}
                  language={language}
                />
              )}
              
              {[0, 4, 5, 6, 8, 14, 17].includes(selectedDesign) && (
                <div className="pt-2">
                  <GradientPicker
                    label={language === 'bn' ? 'কার্ড গ্রাডিয়েন্ট' : 'Card Gradient'}
                    startColor={cardGradientStart}
                    endColor={cardGradientEnd}
                    onChange={(start, end) => {
                      setCardGradientStart(start);
                      setCardGradientEnd(end);
                      if (selectedDesign === 0) {
                        setThemeColor(end);
                      }
                    }}
                    darkMode={darkMode}
                    language={language}
                  />
                  
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="applyGradientToAll"
                      checked={applyGradientToAll}
                      onChange={(e) => setApplyGradientToAll(e.target.checked)}
                      className="w-4 h-4 text-[#5934e8] rounded border-gray-300 focus:ring-[#5934e8]"
                    />
                    <label htmlFor="applyGradientToAll" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'bn' ? 'সম্পূর্ণ কার্ডে গ্রাডিয়েন্ট প্রয়োগ করুন' : 'Apply gradient to entire card'}
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pattern and Font Upload */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-700 space-y-4">
          </div>
        </div>
      </div></div>
    </div>
  );
};

export default DesignSettings;
