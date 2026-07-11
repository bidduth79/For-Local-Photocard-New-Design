import React from 'react';
import { ChevronDown, ChevronUp, Grid3X3, Upload, Trash2 } from 'lucide-react';
import PatternDropdown from '../../ui/PatternDropdown';
import { defaultPatterns } from '../../../data/defaultPatterns';
import { usePatterns } from '../../../hooks/usePatterns';
import { showToast } from '../../../utils/toast';



import { useAppStore } from '../../../store/appStore';
import { useAppContext } from '../../../context/AppContext';
import { useShallow } from 'zustand/react/shallow';
import { DebouncedInput } from '../../ui/DebouncedInput';

export const PatternSettings: React.FC = () => {
  const { randomizeGeometricShapes, resetGeometricShapes } = useAppContext();
  const { 
    backgroundPatterns,
    setBackgroundPatterns,
    patternScale,
    setPatternScale,
    patternRotation,
    setPatternRotation,
    patternOpacity,
    setPatternOpacity,
    patternColor,
    setPatternColor,
    showGeometricShapes,
    setShowGeometricShapes,
    geometricShapeColor,
    setGeometricShapeColor,
    geometricShapeOpacity,
    setGeometricShapeOpacity,
    geometricShapesConfig,
            language,
    darkMode,
    isPatternSettingsExpanded: isExpanded,
    setIsPatternSettingsExpanded: setIsExpanded,
  } = useAppStore(useShallow(state => ({
    backgroundPatterns: state.backgroundPatterns,
    setBackgroundPatterns: state.setBackgroundPatterns,
    patternScale: state.patternScale,
    setPatternScale: state.setPatternScale,
    patternRotation: state.patternRotation,
    setPatternRotation: state.setPatternRotation,
    patternOpacity: state.patternOpacity,
    setPatternOpacity: state.setPatternOpacity,
    patternColor: state.patternColor,
    setPatternColor: state.setPatternColor,
    showGeometricShapes: state.showGeometricShapes,
    setShowGeometricShapes: state.setShowGeometricShapes,
    geometricShapeColor: state.geometricShapeColor,
    setGeometricShapeColor: state.setGeometricShapeColor,
    geometricShapeOpacity: state.geometricShapeOpacity,
    setGeometricShapeOpacity: state.setGeometricShapeOpacity,
    geometricShapesConfig: state.geometricShapesConfig,
            language: state.language,
    darkMode: state.darkMode,
    isPatternSettingsExpanded: state.isPatternSettingsExpanded,
    setIsPatternSettingsExpanded: state.setIsPatternSettingsExpanded,
  })));

  const { savedPatterns, savePattern, fetchPatterns } = usePatterns();
  const [uploadingPattern, setUploadingPattern] = React.useState(false);
  
  // Filter out any saved patterns that have the same ID as default patterns
  // to prevent duplicate keys in the dropdown
  const allPatterns = [
    ...defaultPatterns, 
    ...savedPatterns.filter(sp => !defaultPatterns.some(dp => dp.id === sp.id))
  ];

  const handlePatternUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const file = target.files?.[0];
    if (!file) return;

    setUploadingPattern(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result as string;
      setBackgroundPatterns([...useAppStore.getState().backgroundPatterns, base64String]);
      
      try {
        const patternName = `Pattern_${Date.now()}`;
        const result = await savePattern(patternName, base64String, file.name);
        if (result && result.url) {
          setBackgroundPatterns([...useAppStore.getState().backgroundPatterns.filter(p => p !== base64String), result.url]);
          fetchPatterns();
        }
      } catch (dbError) {
        console.error('Error saving pattern to database:', dbError);
      } finally {
        setUploadingPattern(false);
        target.value = '';
      }
    };
    reader.onerror = () => {
      console.error("Pattern upload failed");
      setUploadingPattern(false);
      target.value = '';
      showToast.error(language === 'bn' ? "প্যাটার্ন আপলোড ব্যর্থ হয়েছে।" : "Pattern upload failed.");
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
            <Grid3X3 size={20} />
          </div>
          <span className={`font-semibold text-lg ${
            darkMode ? 'text-gray-200' : 'text-gray-900'
          }`}>
            {language === 'bn' ? 'ব্যাকগ্রাউন্ড প্যাটার্ন' : 'Background Pattern'}
          </span>
        </div>
        <button 
          className={`p-1 rounded-md transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
        >
          <ChevronDown size={20} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden">
        <div className="p-6 space-y-6 ">
          {/* Pattern Selection */}
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === 'bn' ? 'প্যাটার্ন নির্বাচন করুন' : 'Select Pattern'}
            </label>
            <div className="flex gap-2">
              <button
                onClick={(e) => { const fileInput = e.currentTarget.parentElement?.querySelector('input[type="file"]'); if(fileInput) { (fileInput as HTMLElement).click(); } }}
                disabled={uploadingPattern}
                className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-colors shrink-0 ${
                  darkMode ? 'border-slate-600 hover:bg-slate-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-600'
                }`}
                title={language === 'bn' ? 'প্যাটার্ন আপলোড করুন' : 'Upload Pattern'}
              >
                {uploadingPattern ? (
                  <span className="animate-pulse text-xs">...</span>
                ) : (
                  <Upload size={18} />
                )}
              </button>
              <input
                id="pattern-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePatternUpload}
              />
              {allPatterns.length > 0 && (
                <div className="flex-1 min-w-0">
                  <PatternDropdown
                    patterns={allPatterns}
                    selectedPatternUrls={backgroundPatterns}
                    onSelect={(pattern) => {
                      if (backgroundPatterns.includes(pattern.url)) {
                        setBackgroundPatterns(backgroundPatterns.filter(p => p !== pattern.url));
                      } else {
                        setBackgroundPatterns([...backgroundPatterns, pattern.url]);
                      }
                    }}
                    language={language}
                    darkMode={darkMode}
                  />
                </div>
              )}
            </div>
            {backgroundPatterns.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {backgroundPatterns.map((url, idx) => {
                  const pattern = allPatterns.find(p => p.url === url);
                  return (
                    <div key={idx} className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs border ${
                      darkMode ? 'bg-slate-700 border-slate-600 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}>
                      <div className="w-4 h-4 rounded-sm bg-black/10" style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }} />
                      <span className="truncate max-w-[100px]">{pattern?.name || 'Custom'}</span>
                      <button
                        onClick={() => setBackgroundPatterns(backgroundPatterns.filter(p => p !== url))}
                        className={`p-0.5 rounded-sm hover:bg-red-500/20 hover:text-red-500 transition-colors ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pattern Controls */}
          {backgroundPatterns.length > 0 && (
            <div className="space-y-4 pt-2">
              {/* Scale Control */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'bn' ? 'প্যাটার্ন সাইজ (স্কেল)' : 'Pattern Size (Scale)'}
                  </label>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{patternScale}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={patternScale}
                  onChange={(e) => setPatternScale(Number(e.target.value))}
                  className="w-full accent-[#5934e8]"
                />
              </div>

              {/* Rotation Control */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'bn' ? 'রোটেশন (অ্যাঙ্গেল)' : 'Rotation (Angle)'}
                  </label>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{patternRotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={patternRotation}
                  onChange={(e) => setPatternRotation(Number(e.target.value))}
                  className="w-full accent-[#5934e8]"
                />
              </div>

              {/* Opacity Control */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'bn' ? 'অপাসিটি (স্বচ্ছতা)' : 'Opacity'}
                  </label>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{patternOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={patternOpacity}
                  onChange={(e) => setPatternOpacity(Number(e.target.value))}
                  className="w-full accent-[#5934e8]"
                />
              </div>

              {/* Color Control */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {language === 'bn' ? 'প্যাটার্ন কালার' : 'Pattern Color'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={patternColor}
                    onChange={(e) => setPatternColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                  />
                  <DebouncedInput
                    type="text"
                    value={patternColor}
                    onChange={setPatternColor}
                    className={`flex-1 px-3 py-1.5 text-sm rounded-md border ${
                      darkMode 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-white border-gray-200 text-gray-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Geometric Shapes */}
          <div className={`pt-6 mt-6 border-t ${darkMode ? 'border-slate-700' : 'border-gray-100'}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  {language === 'bn' ? 'জ্যামিতিক আকার দেখান' : 'Show Geometric Shapes'}
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={showGeometricShapes}
                    onChange={(e) => setShowGeometricShapes(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5934e8]/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-[#5934e8]"></div>
                </label>
              </div>

              {showGeometricShapes && (
                <div className={`space-y-4 pl-4 border-l-2 ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'bn' ? 'আকারের রঙ' : 'Shape Color'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={geometricShapeColor}
                        onChange={(e) => setGeometricShapeColor(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                      />
                      <DebouncedInput
                        type="text"
                        value={geometricShapeColor}
                        onChange={setGeometricShapeColor}
                        className={`flex-1 px-3 py-1.5 text-sm rounded-md border ${
                          darkMode 
                            ? 'bg-slate-800 border-slate-700 text-white' 
                            : 'bg-white border-gray-200 text-gray-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {language === 'bn' ? 'স্বচ্ছতা' : 'Opacity'}
                      </label>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {Math.round(geometricShapeOpacity * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={geometricShapeOpacity}
                      onChange={(e) => setGeometricShapeOpacity(parseFloat(e.target.value))}
                      className="w-full accent-[#5934e8]"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={randomizeGeometricShapes}
                      className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                        darkMode 
                          ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      {language === 'bn' ? 'রেন্ডমাইজ শেপ' : 'Randomize Shapes'}
                    </button>
                    {geometricShapesConfig && geometricShapesConfig.length > 0 && (
                      <button
                        onClick={resetGeometricShapes}
                        className="px-3 py-2 text-xs font-medium rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        {language === 'bn' ? 'ডিফল্ট' : 'Default'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div></div>
    </div>
  );
};
