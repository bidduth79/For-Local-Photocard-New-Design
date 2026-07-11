import React, { useState, useMemo } from 'react';
import { Settings2, Maximize, MoveHorizontal, MoveVertical, FlipHorizontal, X, Sliders } from 'lucide-react';



const generateFilters = (lang: 'bn' | 'en') => {
  const baseFilters = [
    { label: lang === 'bn' ? 'স্বাভাবিক (Normal)' : 'Normal', value: 'none' },
    { label: lang === 'bn' ? 'সাদাকালো (Grayscale)' : 'Grayscale', value: 'grayscale(100%)' },
    { label: lang === 'bn' ? 'সেপিয়া (Sepia)' : 'Sepia', value: 'sepia(100%)' },
    { label: lang === 'bn' ? 'উজ্জ্বল (Bright)' : 'Bright', value: 'brightness(120%) contrast(110%)' },
    { label: lang === 'bn' ? 'গাঢ় (Dark)' : 'Dark', value: 'brightness(80%) contrast(120%)' },
    { label: lang === 'bn' ? 'ব্লার (Blur)' : 'Blur', value: 'blur(4px)' },
    { label: '1977', value: 'sepia(50%) hue-rotate(-30deg) saturate(140%) contrast(110%)' },
    { label: 'Aden', value: 'sepia(20%) brightness(115%) saturate(140%) contrast(90%)' },
    { label: 'Amaro', value: 'sepia(35%) contrast(110%) brightness(120%) saturate(130%)' },
    { label: 'Ashby', value: 'sepia(50%) contrast(120%) saturate(180%)' },
    { label: 'Brannan', value: 'sepia(40%) contrast(125%) brightness(110%) saturate(90%)' },
    { label: 'Brooklyn', value: 'sepia(25%) contrast(125%) brightness(125%) hue-rotate(5deg)' },
    { label: 'Charmes', value: 'sepia(25%) contrast(125%) brightness(125%) saturate(135%) hue-rotate(-5deg)' },
    { label: 'Clarendon', value: 'sepia(15%) contrast(125%) brightness(125%) hue-rotate(5deg)' },
    { label: 'Crema', value: 'sepia(50%) contrast(125%) brightness(115%) saturate(90%) hue-rotate(-2deg)' },
    { label: 'Dogpatch', value: 'sepia(35%) saturate(110%) contrast(150%)' },
    { label: 'Earlybird', value: 'sepia(25%) contrast(125%) brightness(115%) saturate(90%) hue-rotate(-5deg)' },
    { label: 'Gingham', value: 'sepia(50%) contrast(110%) brightness(110%)' },
    { label: 'Ginza', value: 'sepia(25%) contrast(115%) brightness(120%) saturate(135%) hue-rotate(-5deg)' },
    { label: 'Hefe', value: 'sepia(40%) contrast(150%) brightness(120%) saturate(140%) hue-rotate(-10deg)' },
    { label: 'Helena', value: 'sepia(50%) contrast(105%) brightness(105%) saturate(135%)' },
    { label: 'Hudson', value: 'sepia(25%) contrast(120%) brightness(120%) saturate(105%) hue-rotate(-15deg)' },
    { label: 'Inkwell', value: 'grayscale(100%) contrast(110%) brightness(110%)' },
    { label: 'Kelvin', value: 'sepia(15%) contrast(150%) brightness(110%) hue-rotate(10deg)' },
    { label: 'Juno', value: 'sepia(35%) contrast(115%) brightness(115%) saturate(180%)' },
    { label: 'Lark', value: 'sepia(25%) contrast(120%) brightness(130%) saturate(125%)' },
    { label: 'Lo-Fi', value: 'saturate(110%) contrast(150%)' },
    { label: 'Ludwig', value: 'sepia(25%) contrast(105%) brightness(105%) saturate(200%)' },
    { label: 'Maven', value: 'sepia(25%) contrast(105%) brightness(105%) saturate(150%) hue-rotate(-5deg)' },
    { label: 'Mayfair', value: 'contrast(110%) brightness(115%) saturate(110%)' },
    { label: 'Moon', value: 'grayscale(100%) contrast(110%) brightness(140%)' },
    { label: 'Nashville', value: 'sepia(25%) contrast(150%) brightness(90%) hue-rotate(-15deg)' },
    { label: 'Perpetua', value: 'sepia(25%) contrast(110%) brightness(125%)' },
    { label: 'Poprocket', value: 'sepia(15%) contrast(100%) brightness(120%) saturate(100%)' },
    { label: 'Reyes', value: 'sepia(75%) contrast(75%) brightness(125%) saturate(140%)' },
    { label: 'Rise', value: 'sepia(25%) contrast(125%) brightness(120%) saturate(90%)' },
    { label: 'Sierra', value: 'sepia(24%) contrast(149%) brightness(91%) hue-rotate(-14deg)' },
    { label: 'Skyline', value: 'sepia(15%) contrast(125%) brightness(125%) saturate(120%)' },
    { label: 'Slumber', value: 'sepia(35%) contrast(125%) saturate(125%)' },
    { label: 'Stinson', value: 'sepia(35%) contrast(125%) brightness(115%) saturate(125%)' },
    { label: 'Sutro', value: 'sepia(40%) contrast(120%) brightness(90%) saturate(140%) hue-rotate(-10deg)' },
    { label: 'Toaster', value: 'sepia(26%) contrast(151%) brightness(89%) hue-rotate(-16deg)' },
    { label: 'Valencia', value: 'sepia(25%) contrast(108%) brightness(108%) saturate(114%)' },
    { label: 'Vesper', value: 'sepia(35%) contrast(115%) brightness(120%) saturate(130%)' },
    { label: 'Walden', value: 'sepia(30%) contrast(100%) brightness(110%) saturate(160%) hue-rotate(-10deg)' },
    { label: 'Willow', value: 'grayscale(100%) contrast(95%) brightness(120%)' },
    { label: 'X-Pro II', value: 'sepia(45%) contrast(125%) brightness(125%) saturate(130%) hue-rotate(-5deg)' },
  ];

  // Generate more variations to reach ~100
  const generated = [];
  const hues = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  const brightnesses = [80, 90, 110, 120, 130];
  
  hues.forEach((h, i) => {
    generated.push({ label: `Hue Shift ${i + 1}`, value: `hue-rotate(${h}deg) saturate(120%)` });
    generated.push({ label: `Cinematic ${i + 1}`, value: `hue-rotate(${h}deg) contrast(120%) brightness(90%)` });
  });

  brightnesses.forEach((b, i) => {
    generated.push({ label: `Fade ${i + 1}`, value: `brightness(${b}%) contrast(80%) saturate(80%)` });
    generated.push({ label: `Vivid ${i + 1}`, value: `brightness(${b}%) contrast(130%) saturate(150%)` });
    generated.push({ label: `Antique ${i + 1}`, value: `sepia(80%) brightness(${b}%) contrast(110%)` });
  });

  return [...baseFilters, ...generated];
};

export const filters = generateFilters('en');

import { useAppStore } from '../../../store/appStore';
import { useAppContext } from '../../../context/AppContext';
import { useShallow } from 'zustand/react/shallow';

export const ImageSettings: React.FC = () => {
  const { 
    darkMode,
    language,
    selectedDesign,
    imageScale,
    setImageScale,
    imageOffsetX,
    setImageOffsetX,
    imageOffsetY,
    setImageOffsetY,
    imageFlipH,
    setImageFlipH,
    imageFilter,
    setImageFilter,
    imageVignette,
    setImageVignette,
    image2Scale,
    setImage2Scale,
    image2OffsetX,
    setImage2OffsetX,
    image2OffsetY,
    setImage2OffsetY,
    image2FlipH,
    setImage2FlipH,
    image2Filter,
    setImage2Filter,
    image2Vignette,
    setImage2Vignette,
    videoFit,
    setVideoFit,
    videoFadeEdges,
    setVideoFadeEdges,
    videoBgColor,
    setVideoBgColor,
  } = useAppStore(useShallow(state => ({
    darkMode: state.darkMode,
    language: state.language,
    selectedDesign: state.selectedDesign,
    imageScale: state.imageScale,
    setImageScale: state.setImageScale,
    imageOffsetX: state.imageOffsetX,
    setImageOffsetX: state.setImageOffsetX,
    imageOffsetY: state.imageOffsetY,
    setImageOffsetY: state.setImageOffsetY,
    imageFlipH: state.imageFlipH,
    setImageFlipH: state.setImageFlipH,
    imageFilter: state.imageFilter,
    setImageFilter: state.setImageFilter,
    imageVignette: state.imageVignette,
    setImageVignette: state.setImageVignette,
    image2Scale: state.image2Scale,
    setImage2Scale: state.setImage2Scale,
    image2OffsetX: state.image2OffsetX,
    setImage2OffsetX: state.setImage2OffsetX,
    image2OffsetY: state.image2OffsetY,
    setImage2OffsetY: state.setImage2OffsetY,
    image2FlipH: state.image2FlipH,
    setImage2FlipH: state.setImage2FlipH,
    image2Filter: state.image2Filter,
    setImage2Filter: state.setImage2Filter,
    image2Vignette: state.image2Vignette,
    setImage2Vignette: state.setImage2Vignette,
    videoFit: state.videoFit,
    setVideoFit: state.setVideoFit,
    videoFadeEdges: state.videoFadeEdges,
    setVideoFadeEdges: state.setVideoFadeEdges,
    videoBgColor: state.videoBgColor,
    setVideoBgColor: state.setVideoBgColor,
  })));

  const hasSecondImage = selectedDesign === 17;


  const { handleImageUpload, fileInputRef, fileInputRef2 } = useAppContext();

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'img1' | 'img2'>('img1');

  const filters = useMemo(() => generateFilters(language), [language]);

  const parseFilterStr = (filterStr: string) => {
    const defaultValues = { brightness: 100, contrast: 100, sepia: 0, saturate: 100 };
    if (!filterStr || filterStr === 'none') return defaultValues;
    
    const bMatch = filterStr.match(/brightness\((\d+)%\)/);
    const cMatch = filterStr.match(/contrast\((\d+)%\)/);
    const sMatch = filterStr.match(/sepia\((\d+)%\)/);
    const satMatch = filterStr.match(/saturate\((\d+)%\)/);
    
    return {
      brightness: bMatch ? parseInt(bMatch[1]) : 100,
      contrast: cMatch ? parseInt(cMatch[1]) : 100,
      sepia: sMatch ? parseInt(sMatch[1]) : 0,
      saturate: satMatch ? parseInt(satMatch[1]) : 100,
    };
  };

  const constructFilterStr = (b: number, c: number, s: number, sat: number, existingFilter: string) => {
    // Keep other properties if they exist (like hue-rotate, blur, etc.)
    let base = existingFilter;
    if (base === 'none') base = '';
    
    // Remove existing b, c, s, sat
    base = base.replace(/brightness\(\d+%\)/g, '')
               .replace(/contrast\(\d+%\)/g, '')
               .replace(/sepia\(\d+%\)/g, '')
               .replace(/saturate\(\d+%\)/g, '')
               .trim();
    
    const newParts = [];
    if (b !== 100) newParts.push(`brightness(${b}%)`);
    if (c !== 100) newParts.push(`contrast(${c}%)`);
    if (s !== 0) newParts.push(`sepia(${s}%)`);
    if (sat !== 100) newParts.push(`saturate(${sat}%)`);
    
    const finalStr = `${base} ${newParts.join(' ')}`.trim();
    return finalStr || 'none';
  };

  const renderControls = (isSecondary: boolean) => {
    const scale = isSecondary ? image2Scale : imageScale;
    const setScale = isSecondary ? setImage2Scale : setImageScale;
    const offsetX = isSecondary ? image2OffsetX : imageOffsetX;
    const setOffsetX = isSecondary ? setImage2OffsetX : setImageOffsetX;
    const offsetY = isSecondary ? image2OffsetY : imageOffsetY;
    const setOffsetY = isSecondary ? setImage2OffsetY : setImageOffsetY;
    const flipH = isSecondary ? image2FlipH : imageFlipH;
    const setFlipH = isSecondary ? setImage2FlipH : setImageFlipH;
    const filter = isSecondary ? image2Filter : imageFilter;
    const setFilter = isSecondary ? setImage2Filter : setImageFilter;

    const parsedFilter = parseFilterStr(filter);

    const handleSliderChange = (type: 'brightness' | 'contrast' | 'sepia' | 'saturate', val: number) => {
      const vals = { ...parsedFilter, [type]: val };
      setFilter(constructFilterStr(vals.brightness, vals.contrast, vals.sepia, vals.saturate, filter));
    };

    const clearFilter = () => setFilter('none');

    return (
      <div className="space-y-5">

      {selectedDesign === 20 && !isSecondary && (
        <div className="mb-6 space-y-4">
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {language === 'bn' ? 'ভিডিও থিম (Landscape Video)' : 'Video Theme (Landscape)'}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setVideoFit('cover')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${videoFit === 'cover' ? 'bg-[#5934e8] text-white border-[#5934e8]' : (darkMode ? 'bg-slate-700 border-slate-600 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700')}`}
              >
                {language === 'bn' ? 'ফুলস্ক্রিন' : 'Fullscreen'}
              </button>
              <button
                onClick={() => setVideoFit('contain')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${videoFit === 'contain' ? 'bg-[#5934e8] text-white border-[#5934e8]' : (darkMode ? 'bg-slate-700 border-slate-600 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700')}`}
              >
                {language === 'bn' ? 'সলিড ব্যাকগ্রাউন্ড' : 'Solid Background'}
              </button>
            </div>
          </div>
          
          {videoFit === 'contain' && (
            <div className="space-y-2 mt-4">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {language === 'bn' ? 'ব্যাকগ্রাউন্ড কালার' : 'Background Color'}
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={videoBgColor}
                  onChange={(e) => setVideoBgColor(e.target.value)}
                  className="w-10 h-10 rounded border-none cursor-pointer p-0"
                />
                <input
                  type="text"
                  value={videoBgColor}
                  onChange={(e) => setVideoBgColor(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm uppercase font-mono ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                  maxLength={7}
                />
              </div>
            
            <label className="flex items-center gap-2 cursor-pointer mt-4">
              <input
                type="checkbox"
                checked={videoFadeEdges}
                onChange={(e) => setVideoFadeEdges(e.target.checked)}
                className={`rounded border-gray-300 text-[#5934e8] focus:ring-[#5934e8] ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white'}`}
              />
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'bn' ? 'ভিডিওর প্রান্ত ব্লার করুন' : 'Fade Video Edges'}
              </span>
            </label>
            </div>
          )}
        </div>
      )}

        {/* Transformations */}
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-100 shadow-sm'}`}>
          <h4 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {language === 'bn' ? 'ট্রান্সফর্ম' : 'Transform'}
          </h4>
          
          <div className="space-y-4">
            {/* Zoom */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`text-xs font-medium flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Maximize size={14} />
                  {language === 'bn' ? 'জুম' : 'Zoom'} ({scale}%)
                </label>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setScale(Math.max(10, scale - 5))} className={`p-1 rounded w-8 h-8 flex items-center justify-center transition-colors ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>-</button>
                <input type="range" min="10" max="2000" value={scale} onChange={(e) => setScale(Number(e.target.value))} className="flex-1 accent-[#5934e8]" />
                <button onClick={() => setScale(Math.min(2000, scale + 5))} className={`p-1 rounded w-8 h-8 flex items-center justify-center transition-colors ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>+</button>
              </div>
            </div>

            {/* Pan X */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`text-xs font-medium flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <MoveHorizontal size={14} />
                  {language === 'bn' ? 'ডানে-বামে' : 'Pan X'}
                </label>
              </div>
              <input type="range" min="-2000" max="2000" value={offsetX} onChange={(e) => setOffsetX(Number(e.target.value))} className="w-full accent-[#5934e8]" />
            </div>

            {/* Pan Y */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`text-xs font-medium flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <MoveVertical size={14} />
                  {language === 'bn' ? 'উপরে-নিচে' : 'Pan Y'}
                </label>
              </div>
              <input type="range" min="-2000" max="2000" value={offsetY} onChange={(e) => setOffsetY(Number(e.target.value))} className="w-full accent-[#5934e8]" />
            </div>

            {/* Flip */}
            <div className="flex items-center justify-between pt-1">
              <label className={`text-xs font-medium flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <FlipHorizontal size={14} />
                {language === 'bn' ? 'উল্টান (Flip)' : 'Flip Horizontal'}
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={flipH} onChange={(e) => setFlipH(e.target.checked)} />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5934e8]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Filters & Color Correction */}
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="flex justify-between items-center mb-4">
            <h4 className={`text-sm font-semibold flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Sliders size={16} />
              {language === 'bn' ? 'রং ও ফিল্টার' : 'Color & Filters'}
            </h4>
            {filter !== 'none' && (
              <button 
                onClick={clearFilter}
                className="flex items-center gap-1 text-xs px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 rounded transition-colors"
              >
                <X size={12} />
                {language === 'bn' ? 'বাতিল' : 'Clear'}
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Filter Presets Dropdown */}
            <div>
              <label className={`text-xs font-medium block mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'bn' ? 'ফিল্টার প্রিসেট (১০০+)' : 'Filter Presets (100+)'}
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-sm border focus:ring-2 focus:ring-[#5934e8] outline-none ${
                  darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <option value="none" className="italic">{language === 'bn' ? 'কাস্টম / স্বাভাবিক' : 'Custom / Normal'}</option>
                {filters.filter(f => f.value !== 'none').map(f => (
                  <option key={f.label} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>

            {/* Fine-tuning Sliders */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'bn' ? 'ব্রাইটনেস' : 'Brightness'}</label>
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{parsedFilter.brightness}%</span>
                </div>
                <input type="range" min="0" max="200" value={parsedFilter.brightness} onChange={(e) => handleSliderChange('brightness', Number(e.target.value))} className="w-full accent-[#5934e8] h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'bn' ? 'কনট্রাস্ট' : 'Contrast'}</label>
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{parsedFilter.contrast}%</span>
                </div>
                <input type="range" min="0" max="200" value={parsedFilter.contrast} onChange={(e) => handleSliderChange('contrast', Number(e.target.value))} className="w-full accent-[#5934e8] h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'bn' ? 'শার্পনেস (স্যাচুরেশন)' : 'Sharpness (Saturation)'}</label>
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{parsedFilter.saturate}%</span>
                </div>
                <input type="range" min="0" max="200" value={parsedFilter.saturate} onChange={(e) => handleSliderChange('saturate', Number(e.target.value))} className="w-full accent-[#5934e8] h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'bn' ? 'ভিনিটেট (Vignette)' : 'Vignette'}</label>
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{isSecondary ? image2Vignette : imageVignette}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={isSecondary ? image2Vignette : imageVignette} 
                  onChange={(e) => isSecondary ? setImage2Vignette(Number(e.target.value)) : setImageVignette(Number(e.target.value))} 
                  className="w-full accent-[#5934e8] h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`rounded-xl border overflow-hidden transition-all duration-300 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} mb-6 shadow-sm hover:shadow-md`}>
      <button onClick={() => setIsExpanded(!isExpanded)} className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${darkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'} cursor-pointer`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
            <Settings2 size={20} />
          </div>
          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'bn' ? (selectedDesign === 20 ? 'ভিডিও কন্ট্রোলস' : 'ইমেজ কন্ট্রোলস') : (selectedDesign === 20 ? 'Video Controls' : 'Image Controls')}
          </span>
        </div>
        <svg className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden">
        <div className={`p-5 border-t ${darkMode ? 'border-slate-700 bg-slate-900/30' : 'border-gray-100 bg-gray-50/50'}`}>
          {hasSecondImage && (
            <div className="flex gap-2 mb-4 p-1 bg-gray-200 dark:bg-slate-700 rounded-lg">
              <button
                onClick={() => setActiveTab('img1')}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'img1' ? 'bg-white dark:bg-slate-600 shadow-sm text-[#5934e8] dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                {language === 'bn' ? 'ছবি ১' : 'Image 1'}
              </button>
              <button
                onClick={() => setActiveTab('img2')}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'img2' ? 'bg-white dark:bg-slate-600 shadow-sm text-[#5934e8] dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                {language === 'bn' ? 'ছবি ২' : 'Image 2'}
              </button>
            </div>
          )}

          {activeTab === 'img1' ? renderControls(false) : renderControls(true)}
        </div>
      </div></div>
    </div>
  );
};

