import React, { useRef, useState } from 'react';
import { DebouncedInput } from '../../ui/DebouncedInput';
import { Settings, Upload, Type, Palette, ChevronDown, ChevronUp, X, Layout } from 'lucide-react';
import { useFonts } from '../../../hooks/useFonts';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { FontDropdown } from '../../ui/FontDropdown';
import { defaultFonts } from '../../../data/fonts';
import { showToast } from '../../../utils/toast';
import { useAppContext } from '../../../context/AppContext';

const BrandSettings: React.FC = () => {
  const {
    brandName,
    setBrandName,
    brandFontSize,
    setBrandFontSize,
    brandColor,
    setBrandColor,
    customWebsite,
    setCustomWebsite,
    customLogo,
    setCustomLogo,
    logoInputRef,
    handleImageUpload,
    language,
    darkMode,
    isBrandingExpanded: isExpanded,
    setIsBrandingExpanded: setIsExpanded,
    showBrandFontSizeControl,
    setShowBrandFontSizeControl,
    showBrandColorControl,
    setShowBrandColorControl,
    brandFontUrl,
    setBrandFontUrl,
    brandFontName,
    setBrandFontName,
    selectedDesign,
    showSocialIcons,
    setShowSocialIcons,
    fullBrandLogo,
    setFullBrandLogo,
    videoLogo,
    setVideoLogo,
    videoLogoScale,
    setVideoLogoScale,
    videoLogoX,
    setVideoLogoX,
    videoLogoY,
    setVideoLogoY,
    design18LogoHeight,
    setDesign18LogoHeight,
    fullBrandLogoHeight,
    setFullBrandLogoHeight,
    setAutoColorMode,
  } = useAppContext();

  const brandFontInputRef = useRef<HTMLInputElement>(null);
  const fullLogoInputRef = useRef<HTMLInputElement>(null);
  const videoLogoInputRef = useRef<HTMLInputElement>(null);
  const [uploadingBrandFont, setUploadingBrandFont] = useState(false);
  const { savedFonts, saveFont } = useFonts();
  const controlsRef = useRef<HTMLDivElement>(null);

  const activeLogoHeight = selectedDesign === 18 ? design18LogoHeight : fullBrandLogoHeight;
  const setActiveLogoHeight = selectedDesign === 18 ? setDesign18LogoHeight : setFullBrandLogoHeight;

  useClickOutside(controlsRef, () => {
    if (showBrandFontSizeControl) setShowBrandFontSizeControl(false);
    if (showBrandColorControl) setShowBrandColorControl(false);
  });

  const allFonts = [
    ...defaultFonts.map(f => ({ id: f.name, name: f.name, originalName: f.label, url: '' })),
    ...savedFonts
  ];

  const handleBrandFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingBrandFont(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        await new Promise<void>((resolve, reject) => {
          reader.onload = async () => {
            try {
              const url = reader.result as string;
              const fontName = `CustomBrandFont_${Date.now()}_${i}`;
              
              const newFont = new FontFace(fontName, `url(${url})`);
              await newFont.load();
              document.fonts.add(newFont);
              
              // Set the last uploaded font as the active one
              if (i === files.length - 1) {
                setBrandFontUrl(url);
                setBrandFontName(fontName);
              }
              
              try {
                const result = await saveFont(fontName, url, file.name);
                if (result && result.url && i === files.length - 1) {
                  setBrandFontUrl(result.url);
                }
              } catch (dbError) {
                console.error('Error saving font to database:', dbError);
              }
              resolve();
            } catch (error) {
              console.error('Error processing brand font:', error);
              reject(error);
            }
          };
          
          reader.onerror = () => {
            console.error("Font read failed");
            reject(new Error("Font read failed"));
          };
          
          reader.readAsDataURL(file);
        });
      }
    } catch (error) {
      showToast.error('Failed to process brand font. Please try again.');
    } finally {
      setUploadingBrandFont(false);
      if (brandFontInputRef.current) {
        brandFontInputRef.current.value = '';
      }
    }
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
            <Settings size={20} />
          </div>
          <span className={`font-semibold text-lg ${
            darkMode ? 'text-gray-200' : 'text-gray-900'
          }`}>
            {language === 'bn' ? 'ব্র্যান্ডিং' : 'Branding'}
          </span>
        </div>

        <div className="flex items-center gap-3">
            {/* Brand Font Controls */}
            <div ref={controlsRef} className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                <button 
                  onClick={() => setShowBrandFontSizeControl(!showBrandFontSizeControl)}
                  className={`p-1.5 rounded-lg transition-colors ${showBrandFontSizeControl ? 'bg-[#5934e8]/10 text-[#5934e8]' : (darkMode ? 'hover:bg-slate-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500')}`}
                  title="Brand Font Size"
                >
                  <Type size={16} />
                </button>
                {showBrandFontSizeControl && (
                  <div className={`absolute top-full right-0 mt-2 p-4 rounded-xl shadow-2xl border z-[100] w-56 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                     <p className="text-xs font-semibold mb-3 text-gray-400 uppercase tracking-wider">
                       {language === 'bn' ? 'ফন্ট সাইজ' : 'Font Size'} ({brandFontSize}px)
                     </p>
                     <div className="flex items-center gap-2">
                       <button 
                         onClick={() => setBrandFontSize(Math.max(20, brandFontSize - 1))}
                         className={`p-1 rounded-md ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                       >-</button>
                       <input 
                         type="range" min="20" max="80" 
                         value={brandFontSize}
                         onChange={(e) => setBrandFontSize(Number(e.target.value))}
                         className="w-full accent-[#5934e8]"
                       />
                       <button 
                         onClick={() => setBrandFontSize(Math.min(80, brandFontSize + 1))}
                         className={`p-1 rounded-md ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                       >+</button>
                     </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowBrandColorControl(!showBrandColorControl)}
                  className={`p-1.5 rounded-lg transition-colors ${showBrandColorControl ? 'bg-[#5934e8]/10 text-[#5934e8]' : (darkMode ? 'hover:bg-slate-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500')}`}
                  title="Brand Color"
                >
                  <Palette size={16} />
                </button>
                {showBrandColorControl && (
                  <div className={`absolute top-full right-0 mt-2 p-4 rounded-xl shadow-2xl border z-[100] w-56 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                     <p className="text-xs font-semibold mb-3 text-gray-400 uppercase tracking-wider">
                       {language === 'bn' ? 'ব্র্যান্ড কালার' : 'Brand Color'}
                     </p>
                     <div className="grid grid-cols-5 gap-2 mb-4">
                       {['#000000', '#111827', '#1f2937', '#374151', '#4b5563', '#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb', '#ffffff',
                         '#7f1d1d', '#b91c1c', '#ef4444', '#f87171', '#fca5a5',
                         '#7c2d12', '#c2410c', '#f97316', '#fb923c', '#fdba74',
                         '#78350f', '#b45309', '#f59e0b', '#fbbf24', '#fcd34d',
                         '#14532d', '#15803d', '#22c55e', '#4ade80', '#86efac',
                         '#1e3a8a', '#1d4ed8', '#3b82f6', '#60a5fa', '#93c5fd',
                         '#4c1d95', '#6d28d9', '#8b5cf6', '#a78bfa', '#c4b5fd',
                         '#831843', '#be185d', '#ec4899', '#f472b6', '#fbcfe8'].map(c => (
                         <button 
                           key={c}
                           onClick={() => setBrandColor(c)}
                           className={`w-6 h-6 rounded-full border ${brandColor === c ? 'ring-2 ring-offset-2 ring-[#5934e8]' : 'border-gray-200'}`}
                           style={{ backgroundColor: c }}
                         />
                       ))}
                     </div>
                     <input 
                       type="color" 
                       value={brandColor}
                       onChange={(e) => setBrandColor(e.target.value)}
                       className="w-full h-8 rounded cursor-pointer"
                     />
                  </div>
                )}
              </div>
            </div>
            <button 
              className={`p-1 rounded-md transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

      <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden">
        <div className="p-6 space-y-6 ">
          {/* Brand Name */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              {language === 'bn' ? 'মিডিয়া নাম' : 'Media Name'}
            </label>
            <DebouncedInput
              type="text"
              value={brandName}
              onChange={setBrandName}
              placeholder={language === 'bn' ? 'নিউজ সাইটের নাম' : 'News Site Name'}
              className={`block w-full px-4 py-3 border-2 rounded-xl focus:ring-0 transition-all ${
                darkMode 
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-[#5934e8]' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#5934e8]'
              }`}
            />
          </div>

          {/* Website */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              {language === 'bn' ? 'ওয়েবসাইট' : 'Website'}
            </label>
            <DebouncedInput
              type="text"
              value={customWebsite}
              onChange={setCustomWebsite}
              className={`block w-full px-4 py-3 border-2 rounded-xl focus:ring-0 transition-all ${
                darkMode 
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-[#5934e8]' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#5934e8]'
              }`}
            />
          </div>

          {/* Social Icons Toggle (Design 11 & 12) */}
          {(selectedDesign === 10 || selectedDesign === 11) && setShowSocialIcons && (
            <div className="flex items-center justify-between">
              <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'bn' ? 'সোশ্যাল আইকন দেখান' : 'Show Social Icons'}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showSocialIcons}
                  onChange={(e) => setShowSocialIcons(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5934e8]/30 dark:peer-focus:ring-[#5934e8]/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#5934e8]"></div>
              </label>
            </div>
          )}

          
          {/* Video Logo Upload (Only for Video Card) */}
          {selectedDesign === 20 && (
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                {language === 'bn' ? 'ভিডিও লোগো (ছবি/গিফ/ভিডিও)' : 'Video Logo (Image/GIF/Video)'}
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => videoLogoInputRef.current?.click()}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-xl transition-all ${
                    darkMode 
                      ? 'border-slate-700 hover:border-[#5934e8] hover:bg-slate-700/50 text-gray-300' 
                      : 'border-gray-300 hover:border-[#5934e8] hover:bg-[#5934e8]/10 text-gray-600'
                  }`}
                >
                  <Upload size={18} />
                  {language === 'bn' ? 'লোগো আপলোড' : 'Upload Logo'}
                </button>
                {videoLogo && setVideoLogo && (
                  <button
                    onClick={() => {
                      setVideoLogo("");
                      setVideoLogoScale(100);
                      setVideoLogoX(0);
                      setVideoLogoY(0);
                    }}
                    className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                      darkMode 
                        ? 'border-red-900/50 text-red-400 hover:bg-red-900/20' 
                        : 'border-red-100 text-red-600 hover:bg-red-50'
                    }`}
                  >
                    {language === 'bn' ? 'মুছুন' : 'Remove'}
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={videoLogoInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0] && setVideoLogo) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        setVideoLogo(event.target.result as string);
                      }
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
                className="hidden"
                accept="image/*,video/*"
              />
              {videoLogo && setVideoLogoScale && setVideoLogoX && setVideoLogoY && (
                <div className="mt-4 space-y-4">
                  <div className="p-4 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                    {videoLogo.startsWith('data:video/') ? (
                      <video src={videoLogo} className="object-contain h-[80px]" autoPlay loop muted />
                    ) : (
                      <img src={videoLogo} alt="Video Logo Preview" className="object-contain h-[80px]" />
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        {language === 'bn' ? 'সাইজ' : 'Size'}
                      </label>
                      <span className={`text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600`}>
                        {videoLogoScale}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="300"
                      value={videoLogoScale}
                      onChange={(e) => setVideoLogoScale(parseInt(e.target.value))}
                      className="w-full accent-[#5934e8]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        {language === 'bn' ? 'ডানে/বামে (X)' : 'Left/Right (X)'}
                      </label>
                      <span className={`text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600`}>
                        {videoLogoX}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-1500"
                      max="500"
                      value={videoLogoX}
                      onChange={(e) => setVideoLogoX(parseInt(e.target.value))}
                      className="w-full accent-[#5934e8]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        {language === 'bn' ? 'উপরে/নিচে (Y)' : 'Up/Down (Y)'}
                      </label>
                      <span className={`text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600`}>
                        {videoLogoY}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-1500"
                      max="1500"
                      value={videoLogoY}
                      onChange={(e) => setVideoLogoY(parseInt(e.target.value))}
                      className="w-full accent-[#5934e8]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Logo Upload */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              {language === 'bn' ? 'আইকন লোগো' : 'Icon Logo'}
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => logoInputRef.current?.click()}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-xl transition-all ${
                  darkMode 
                    ? 'border-slate-700 hover:border-[#5934e8] hover:bg-slate-700/50 text-gray-300' 
                    : 'border-gray-300 hover:border-[#5934e8] hover:bg-[#5934e8]/10 text-gray-600'
                }`}
              >
                <Upload size={18} />
                {language === 'bn' ? 'আইকন আপলোড' : 'Upload Icon'}
              </button>
              {customLogo && (
                <button
                  onClick={() => setCustomLogo("")}
                  className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                    darkMode 
                      ? 'border-red-900/50 text-red-400 hover:bg-red-900/20' 
                      : 'border-red-100 text-red-600 hover:bg-red-50'
                  }`}
                >
                  {language === 'bn' ? 'মুছুন' : 'Remove'}
                </button>
              )}
            </div>
            <input
              type="file"
              ref={logoInputRef}
              onChange={(e) => handleImageUpload(e, 'logo')}
              className="hidden"
              accept="image/*"
            />
            {customLogo && (
              <div className="mt-4 p-4 rounded-xl bg-gray-100 flex items-center justify-center">
                <img src={customLogo} alt="Logo Preview" className="h-12 object-contain" />
              </div>
            )}
          </div>

          {/* Full Brand Logo Upload */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              {language === 'bn' ? 'ফুল লোগো (টেক্সট সহ)' : 'Full Logo (with text)'}
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => fullLogoInputRef.current?.click()}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-xl transition-all ${
                  darkMode 
                    ? 'border-slate-700 hover:border-[#5934e8] hover:bg-slate-700/50 text-gray-300' 
                    : 'border-gray-300 hover:border-[#5934e8] hover:bg-[#5934e8]/10 text-gray-600'
                }`}
              >
                <Upload size={18} />
                {language === 'bn' ? 'ফুল লোগো আপলোড' : 'Upload Full Logo'}
              </button>
              {fullBrandLogo && setFullBrandLogo && (
                <button
                  onClick={() => setFullBrandLogo("")}
                  className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                    darkMode 
                      ? 'border-red-900/50 text-red-400 hover:bg-red-900/20' 
                      : 'border-red-100 text-red-600 hover:bg-red-50'
                  }`}
                >
                  {language === 'bn' ? 'মুছুন' : 'Remove'}
                </button>
              )}
            </div>
            <input
              type="file"
              ref={fullLogoInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0] && setFullBrandLogo) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    if (event.target?.result) {
                      setFullBrandLogo(event.target.result as string);
                    }
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
              className="hidden"
              accept="image/*"
            />
            {fullBrandLogo && setActiveLogoHeight && activeLogoHeight && (
              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-gray-100 flex items-center justify-center">
                  <img src={fullBrandLogo} alt="Full Logo Preview" className="object-contain h-[60px]" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                      {language === 'bn' ? 'লোগোর সাইজ' : 'Logo Size'}
                    </label>
                    <span className={`text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600`}>
                      {activeLogoHeight}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="300"
                    value={activeLogoHeight}
                    onChange={(e) => setActiveLogoHeight(parseInt(e.target.value))}
                    className="w-full accent-[#5934e8]"
                  />
                </div>
              </div>
            )}
          </div>
          {/* Brand Font Upload */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              {language === 'bn' ? 'ব্র্যান্ড ফন্ট (TTF/WOFF)' : 'Brand Font (TTF/WOFF)'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".ttf,.woff,.woff2"
                ref={brandFontInputRef}
                onChange={handleBrandFontUpload}
                className="hidden"
                multiple
              />
              <button
                onClick={() => brandFontInputRef.current?.click()}
                disabled={uploadingBrandFont}
                title={language === 'bn' ? 'ফন্ট আপলোড করুন' : 'Upload Font'}
                className={`flex-shrink-0 p-2.5 rounded-lg transition-colors ${
                  darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {uploadingBrandFont ? (
                  <span className="animate-pulse text-xs">...</span>
                ) : (
                  <Upload size={18} />
                )}
              </button>
              {allFonts.length > 0 && (
                <div className="flex-1 min-w-0">
                  <FontDropdown
                    fonts={allFonts}
                    selectedFontName={brandFontName}
                    onSelect={async (font) => {
                      if (font.url) {
                        const newFont = new FontFace(font.name, `url(${font.url})`);
                        await newFont.load();
                        document.fonts.add(newFont);
                      }
                      setBrandFontUrl(font.url);
                      setBrandFontName(font.name);
                    }}
                    language={language}
                    darkMode={darkMode}
                  />
                </div>
              )}
              {brandFontName && (
                <button
                  onClick={() => {
                    setBrandFontUrl('');
                    setBrandFontName('');
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Remove Font"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {brandFontName && (
              <div className="mt-2 text-xs text-green-500 flex items-center gap-1">
                <Type size={12} /> {language === 'bn' ? 'ফন্ট যুক্ত করা হয়েছে' : 'Font added'}
              </div>
            )}
          </div>
        </div>
      </div></div>
    </div>
  );
};

export default BrandSettings;
