import React from 'react';
import { Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';

const WatermarkSettings: React.FC = () => {
  const {
    showWatermark,
    setShowWatermark,
    watermarkScale,
    setWatermarkScale,
    watermarkOpacity,
    setWatermarkOpacity,
    language,
    darkMode,
    isWatermarkExpanded: isExpanded,
    setIsWatermarkExpanded: setIsExpanded,
  } = useAppContext();

  return (
    <div className={`rounded-2xl shadow-sm border transition-all duration-300 ${
      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'
    }`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'bg-slate-700 text-[#5934e8]' : 'bg-[#5934e8]/10 text-[#5934e8]'
            }`}>
              <ImageIcon size={20} />
            </div>
            <span className={`font-semibold text-lg ${
              darkMode ? 'text-gray-200' : 'text-gray-900'
            }`}>
              {language === 'bn' ? 'ওয়াটারমার্ক' : 'Watermark'}
            </span>
          </div>
          <ChevronDown className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
        </button>

      <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden">
        <div className="px-6 pb-6 space-y-6 ">
          {/* Toggle Watermark */}
          <div className="flex items-center justify-between">
            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'bn' ? 'ওয়াটারমার্ক দেখান' : 'Show Watermark'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={showWatermark}
                onChange={(e) => setShowWatermark(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5934e8]/30 dark:peer-focus:ring-[#5934e8]/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#5934e8]"></div>
            </label>
          </div>

          {showWatermark && (
            <>
              {/* Watermark Scale */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'bn' ? 'সাইজ' : 'Size'}
                  </label>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {watermarkScale}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setWatermarkScale(Math.max(10, watermarkScale - 1))}
                    className={`p-1 rounded-md ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                  >-</button>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={watermarkScale}
                    onChange={(e) => setWatermarkScale(Number(e.target.value))}
                    className="w-full accent-[#5934e8]"
                  />
                  <button 
                    onClick={() => setWatermarkScale(Math.min(100, watermarkScale + 1))}
                    className={`p-1 rounded-md ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                  >+</button>
                </div>
              </div>

              {/* Watermark Opacity */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'bn' ? 'স্বচ্ছতা' : 'Opacity'}
                  </label>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {watermarkOpacity}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setWatermarkOpacity(Math.max(0, watermarkOpacity - 1))}
                    className={`p-1 rounded-md ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                  >-</button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={watermarkOpacity}
                    onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                    className="w-full accent-[#5934e8]"
                  />
                  <button 
                    onClick={() => setWatermarkOpacity(Math.min(100, watermarkOpacity + 1))}
                    className={`p-1 rounded-md ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                  >+</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div></div>
    </div>
  );
};

export default WatermarkSettings;
