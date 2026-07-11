import React, { useState } from 'react';
import { Link as LinkIcon, Loader2, Image as ImageIcon, ChevronDown, ChevronUp, Upload, Type, Palette, Code, LayoutTemplate, Info, X, MoveVertical, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useFonts } from '../../../hooks/useFonts';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { FontDropdown } from '../../ui/FontDropdown';
import { defaultFonts } from '../../../data/fonts';
import { showToast } from '../../../utils/toast';



import { useAppContext } from '../../../context/AppContext';
import { useAppStore } from '../../../store/appStore';
import { useShallow } from 'zustand/react/shallow';
import { DebouncedInput, DebouncedTextarea } from '../../ui/DebouncedInput';

const ContentEditor: React.FC = () => {
  const { fetchLinkData, handleImageUpload, fileInputRef, fileInputRef2 } = useAppContext();
  const {
    url, setUrl, loading, error, title, setTitle, visualTitle, setVisualTitle,
    isVisualMode, setIsVisualMode, image, image2, date, setDate, language, darkMode,
    isContentEditorExpanded: isExpanded, setIsContentEditorExpanded: setIsExpanded,
    headlineFontSize, setHeadlineFontSize, headlineColor,
    showFontSizeControl, setShowFontSizeControl,  showColorControl, setShowColorControl,
    textAlign, setTextAlign, selectedDesign, description, setDescription, hashtag, setHashtag,
    descriptionFontSize, setDescriptionFontSize, descriptionColor, setDescriptionColor,
    descriptionBgColor, setDescriptionBgColor, showDescriptionBg, setShowDescriptionBg,
    descriptionTextAlign, setDescriptionTextAlign, descriptionOffsetX, setDescriptionOffsetX,
    descriptionOffsetY, setDescriptionOffsetY, customFontUrl, setCustomFontUrl,
    customFontName, setCustomFontName, illustrationPrompt, setIllustrationPrompt,
    isGeneratingIllustration, setIsGeneratingIllustration, setImage, imageOffsetY, setImageOffsetY,
    setAutoColorMode, showDetailedNewsBox, setShowDetailedNewsBox, removeBackground, setRemoveBackground
      } = useAppStore(useShallow(state => ({
    url: state.url, setUrl: state.setUrl, loading: state.loading, error: state.error, title: state.title, setTitle: state.setTitle,
    visualTitle: state.visualTitle, setVisualTitle: state.setVisualTitle, isVisualMode: state.isVisualMode, setIsVisualMode: state.setIsVisualMode,
    image: state.image, image2: state.image2, date: state.date, setDate: state.setDate, language: state.language, darkMode: state.darkMode,
    isContentEditorExpanded: state.isContentEditorExpanded, setIsContentEditorExpanded: state.setIsContentEditorExpanded,
    headlineFontSize: state.headlineFontSize, setHeadlineFontSize: state.setHeadlineFontSize, headlineColor: state.headlineColor,
    showFontSizeControl: state.showFontSizeControl, setShowFontSizeControl: state.setShowFontSizeControl, showColorControl: state.showColorControl,
    setShowColorControl: state.setShowColorControl, textAlign: state.textAlign, setTextAlign: state.setTextAlign, selectedDesign: state.selectedDesign,
    description: state.description, setDescription: state.setDescription, hashtag: state.hashtag, setHashtag: state.setHashtag,
    descriptionFontSize: state.descriptionFontSize, setDescriptionFontSize: state.setDescriptionFontSize, descriptionColor: state.descriptionColor,
    setDescriptionColor: state.setDescriptionColor, descriptionBgColor: state.descriptionBgColor, setDescriptionBgColor: state.setDescriptionBgColor,
    showDescriptionBg: state.showDescriptionBg, setShowDescriptionBg: state.setShowDescriptionBg, descriptionTextAlign: state.descriptionTextAlign,
    setDescriptionTextAlign: state.setDescriptionTextAlign, descriptionOffsetX: state.descriptionOffsetX, setDescriptionOffsetX: state.setDescriptionOffsetX,
    descriptionOffsetY: state.descriptionOffsetY, setDescriptionOffsetY: state.setDescriptionOffsetY, customFontUrl: state.customFontUrl,
    setCustomFontUrl: state.setCustomFontUrl, customFontName: state.customFontName, setCustomFontName: state.setCustomFontName,
    illustrationPrompt: state.illustrationPrompt, setIllustrationPrompt: state.setIllustrationPrompt, isGeneratingIllustration: state.isGeneratingIllustration,
    setIsGeneratingIllustration: state.setIsGeneratingIllustration, setImage: state.setImage, imageOffsetY: state.imageOffsetY, setImageOffsetY: state.setImageOffsetY,
    setAutoColorMode: state.setAutoColorMode, showDetailedNewsBox: state.showDetailedNewsBox, setShowDetailedNewsBox: state.setShowDetailedNewsBox,
    removeBackground: state.removeBackground, setRemoveBackground: state.setRemoveBackground,
      })));

  const setHeadlineColor = (c: string) => {
    useAppStore.getState().setHeadlineColor(c);
    setAutoColorMode(false);
  };

  const [showFormatGuide, setShowFormatGuide] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);

  const handleRemoveBackgroundNow = async () => {
    if (!image) return;
    setIsRemovingBg(true);
    showToast.loading(language === 'bn' ? 'ছবির ব্যাকগ্রাউন্ড রিমুভ করা হচ্ছে...' : 'Removing background...', { id: 'bg-remove-now' });
    try {
      const { removeBackground } = await import('@imgly/background-removal');
      const config = {
        publicPath: "https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/",
        progress: (key: string, current: number, total: number) => {
          if (total > 0 && current <= total) {
            const percent = Math.round((current / total) * 100);
            const msgBn = key.includes('fetch') ? `মডেল ডাউনলোড হচ্ছে (${percent}%)...` : `ব্যাকগ্রাউন্ড রিমুভ হচ্ছে (${percent}%)...`;
            const msgEn = key.includes('fetch') ? `Downloading model (${percent}%)...` : `Processing (${percent}%)...`;
            showToast.loading(language === 'bn' ? msgBn : msgEn, { id: 'bg-remove-now' });
          }
        }
      };
      const blob = await removeBackground(image, config);
      const blobReader = new FileReader();
      blobReader.onloadend = () => {
        setImage(blobReader.result as string);
        showToast.success(language === 'bn' ? 'ব্যাকগ্রাউন্ড সফলভাবে রিমুভ করা হয়েছে!' : 'Background removed successfully!', { id: 'bg-remove-now' });
      };
      blobReader.readAsDataURL(blob);
    } catch (err: any) {
      console.error("Background removal error:", err);
      showToast.error(language === 'bn' ? `রিমুভ ব্যর্থ: ${err.message || 'অজানা ত্রুটি'}` : `Failed to remove background: ${err.message || 'Unknown error'}`, { id: 'bg-remove-now' });
    } finally {
      setIsRemovingBg(false);
    }
  };

  const [isFetching, setIsFetching] = useState(false);
  const [historyScope, setHistoryScope] = useState<'bangladesh' | 'international'>('bangladesh');
  const [fetchedContent, setFetchedContent] = useState({ bangladesh: '', international: '' });
  const [hasAutoFetched, setHasAutoFetched] = useState({ bangladesh: false, international: false });
  const fontInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadingFont, setUploadingFont] = useState(false);
  const { savedFonts, saveFont } = useFonts();
  const controlsRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(controlsRef, () => {
    if (showFontSizeControl) setShowFontSizeControl(false);
    if (showColorControl) setShowColorControl(false);
  });

  React.useEffect(() => {
    if (selectedDesign === 16) {
      setFetchedContent(prev => {
        if (prev[historyScope] !== description) {
          return { ...prev, [historyScope]: description || '' };
        }
        return prev;
      });
    }
  }, [description, historyScope, selectedDesign]);

  React.useEffect(() => {
    if (selectedDesign === 16 && !hasAutoFetched[historyScope] && !isFetching && setDescription) {
      const autoFetch = async () => {
        try {
          setIsFetching(true);
          const formattedDate = format(date, 'MMMM d');
          const prompt = historyScope === 'bangladesh'
            ? `Generate 3-4 bullet points in Bengali about significant historical events or special days related to Bangladesh that occurred on ${formattedDate}. Format each point on a new line. Do not include any introductory or concluding text.`
            : `Generate 3-4 bullet points in Bengali about significant international historical events or special days that occurred on ${formattedDate}. Format each point on a new line. Do not include any introductory or concluding text.`;
          
          const { GoogleGenAI } = await import('@google/genai');
          const apiKey = localStorage.getItem('GEMINI_API_KEY') || process.env.GEMINI_API_KEY;
          if (!apiKey) {
            showToast.error(language === 'bn' ? 'API Key পাওয়া যায়নি। দয়া করে সেটিংস থেকে সেট করুন।' : 'API Key missing. Please set it in Settings.');
            setIsFetching(false);
            return;
          }
          const ai = new GoogleGenAI({ apiKey });
          let response;
          try {
            response = await ai.models.generateContent({
              model: "gemini-3.1-flash-lite-preview",
              contents: prompt,
            });
          } catch (firstError) {
            console.warn("Primary model failed, falling back to gemini-3-flash-preview", firstError);
            response = await ai.models.generateContent({
              model: "gemini-3-flash-preview",
              contents: prompt,
            });
          }
          
          if (response.text) {
            const newText = response.text.trim();
            setDescription(newText);
            setFetchedContent(prev => ({ ...prev, [historyScope]: newText }));
            setHasAutoFetched(prev => ({ ...prev, [historyScope]: true }));
          }
        } catch (err) {
          console.error('Error auto-generating content:', err);
        } finally {
          setIsFetching(false);
        }
      };
      autoFetch();
    }
  }, [selectedDesign, hasAutoFetched, isFetching, date, setDescription, historyScope]);

  const handleScopeChange = (newScope: 'bangladesh' | 'international') => {
    if (newScope === historyScope) return;
    setHistoryScope(newScope);
    if (setDescription) {
      setDescription(fetchedContent[newScope] || '');
    }
  };

  const allFonts = [
    ...defaultFonts.map(f => ({ id: f.name, name: f.name, originalName: f.label, url: '' })),
    ...savedFonts
  ];
  
  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingFont(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        await new Promise<void>((resolve, reject) => {
          reader.onload = async () => {
            try {
              const url = reader.result as string;
              const fontName = `CustomHeadlineFont_${Date.now()}_${i}`;
              
              const newFont = new FontFace(fontName, `url(${url})`);
              await newFont.load();
              document.fonts.add(newFont);
              
              if (i === files.length - 1) {
                if (setCustomFontUrl) setCustomFontUrl(url);
                if (setCustomFontName) setCustomFontName(fontName);
              }
              
              try {
                const result = await saveFont(fontName, url, file.name);
                if (result && result.url && i === files.length - 1) {
                  if (setCustomFontUrl) setCustomFontUrl(result.url);
                }
              } catch (dbError) {
                console.error('Error saving font to database:', dbError);
              }
              resolve();
            } catch (error) {
              console.error('Error processing font:', error);
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
      showToast.error(language === 'bn' ? 'ফন্ট আপলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।' : 'Failed to process font. Please try again.');
    } finally {
      setUploadingFont(false);
      if (fontInputRef.current) {
        fontInputRef.current.value = '';
      }
    }
  };

  const handleVisualModeToggle = (toVisual: boolean) => {
    if (toVisual && !isVisualMode) {
      // Sync Text -> Visual
      // Check if the plain text version of visualTitle is different from the current title
      const temp = document.createElement('div');
      temp.innerHTML = visualTitle.replace(/<br\s*[\/]?>/gi, '\n').replace(/<\/p>\s*<p>/gi, '\n');
      const visualPlainText = (temp.textContent || temp.innerText || '').trim();
      
      // Only update visualTitle if the plain text has actually changed in Text mode
      if (visualPlainText !== title.trim()) {
        const htmlFormatted = title ? title.split('\n').map(line => `<p>${line}</p>`).join('') : '';
        setVisualTitle(htmlFormatted);
      }
      setIsVisualMode(true);
    } else if (!toVisual && isVisualMode) {
      // Sync Visual -> Text
      const temp = document.createElement('div');
      temp.innerHTML = visualTitle.replace(/<br\s*[\/]?>/gi, '\n').replace(/<\/p>\s*<p>/gi, '\n');
      const plainText = temp.textContent || temp.innerText || '';
      setTitle(plainText.trim());
      setIsVisualMode(false);
    }
  };

  const modules = React.useMemo(() => ({
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['customQuote'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean']
      ],
      handlers: {
        customQuote: function() {
          // @ts-ignore
          const quill = this.quill;
          const range = quill.getSelection();
          if (range) {
            if (range.length > 0) {
              const text = quill.getText(range.index, range.length);
              quill.deleteText(range.index, range.length);
              quill.insertText(range.index, `❝${text}❞`);
              quill.setSelection(range.index + text.length + 2);
            } else {
              quill.insertText(range.index, `❝❞`);
              quill.setSelection(range.index + 1);
            }
          }
        }
      }
    }
  }), []);

  return (
    <div className={`rounded-2xl shadow-sm border transition-all duration-300 ${
      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'
    }`}>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'bg-slate-700 text-[#5934e8]' : 'bg-[#5934e8]/10 text-[#5934e8]'
          }`}>
            <LinkIcon size={20} />
          </div>
          <span className={`font-semibold text-lg ${
            darkMode ? 'text-gray-200' : 'text-gray-900'
          }`}>
            {language === 'bn' ? 'কনটেন্ট এডিটর' : 'Content Editor'}
          </span>
        </div>
        <div ref={controlsRef} className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <button 
              onClick={() => setShowFontSizeControl(!showFontSizeControl)}
                className={`p-1.5 rounded-lg transition-colors ${showFontSizeControl ? 'bg-[#5934e8]/10 text-[#5934e8]' : (darkMode ? 'hover:bg-slate-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500')}`}
                title="Headline Size"
              >
                <Type size={16} />
              </button>
              {showFontSizeControl && (
                <div className={`absolute top-full right-0 mt-2 p-4 rounded-xl shadow-2xl border z-[100] w-56 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                   <p className="text-xs font-semibold mb-3 text-gray-400 uppercase tracking-wider">
                     {language === 'bn' ? 'হেডলাইন সাইজ' : 'Headline Size'} ({headlineFontSize}px)
                   </p>
                   <div className="flex items-center gap-2">
                     <button 
                       onClick={() => setHeadlineFontSize(Math.max(20, headlineFontSize - 1))}
                       className={`p-1 rounded-md ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                     >-</button>
                     <input 
                       type="range" min="20" max="120" 
                       value={headlineFontSize}
                       onChange={(e) => setHeadlineFontSize(Number(e.target.value))}
                       className="w-full accent-[#5934e8]"
                     />
                     <button 
                       onClick={() => setHeadlineFontSize(Math.min(120, headlineFontSize + 1))}
                       className={`p-1 rounded-md ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                     >+</button>
                   </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowColorControl(!showColorControl)}
                className={`p-1.5 rounded-lg transition-colors ${showColorControl ? 'bg-[#5934e8]/10 text-[#5934e8]' : (darkMode ? 'hover:bg-slate-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500')}`}
                title="Headline Color"
              >
                <Palette size={16} />
              </button>
              {showColorControl && (
                <div className={`absolute top-full right-0 mt-2 p-4 rounded-xl shadow-2xl border z-[100] w-56 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                   <p className="text-xs font-semibold mb-3 text-gray-400 uppercase tracking-wider">
                     {language === 'bn' ? 'হেডলাইন কালার' : 'Headline Color'}
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
                         onClick={() => setHeadlineColor(c)}
                         className={`w-6 h-6 rounded-full border ${headlineColor === c ? 'ring-2 ring-offset-2 ring-[#5934e8]' : 'border-gray-200'}`}
                         style={{ backgroundColor: c }}
                       />
                     ))}
                   </div>
                   <input 
                     type="color" 
                     value={headlineColor}
                     onChange={(e) => setHeadlineColor(e.target.value)}
                     className="w-full h-8 rounded cursor-pointer"
                   />
                </div>
              )}
            </div>
            <button onClick={() => setIsExpanded(!isExpanded)} className="ml-2">
              <ChevronDown className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
            </button>
          </div>
        </div>

      <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden">
        <div className="px-6 pb-6 space-y-6 ">
          {/* URL Input */}
          <form onSubmit={fetchLinkData} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <DebouncedInput
              type="url"
              value={url}
              onChange={setUrl}
              placeholder={language === 'bn' ? "নিউজ লিংক পেস্ট করুন..." : "Paste news link..."}
              className={`block w-full pl-10 pr-24 py-3 border-2 rounded-xl focus:ring-0 transition-all ${
                darkMode 
                  ? 'bg-slate-900 border-slate-700 text-white placeholder-gray-500 focus:border-[#5934e8]' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#5934e8]'
              }`}
            />
            <button
              type="submit"
              disabled={loading || !url}
              className="absolute right-2 top-2 bottom-2 px-4 bg-[#5934e8] text-white rounded-lg font-medium text-sm hover:bg-[#5934e8]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#5934e8]/20"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (language === 'bn' ? 'ফেচ' : 'Fetch')}
            </button>
          </form>

          {error && (
            <div className={`p-4 rounded-xl text-sm flex items-center gap-2 ${
              darkMode ? 'bg-red-900/20 text-red-400 border border-red-900/50' : 'bg-red-50 text-red-600 border border-red-100'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
              {error}
            </div>
          )}

          {/* Title Input */}
          <div id="panel-content-editor-headline">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'bn' ? 'শিরোনাম' : 'Headline'}
                </label>
                <button
                  onClick={() => setShowFormatGuide(true)}
                  className={`p-1 rounded-full transition-colors ${darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-slate-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
                  title="Formatting Guide"
                >
                  <Info size={16} />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Mode Toggle */}
                <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => handleVisualModeToggle(true)}
                    className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${isVisualMode ? 'bg-white dark:bg-slate-700 shadow-sm text-[#5934e8]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    title="Visual Editor"
                  >
                    <LayoutTemplate size={14} />
                    <span className="hidden sm:inline">Visual</span>
                  </button>
                  <button
                    onClick={() => handleVisualModeToggle(false)}
                    className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${!isVisualMode ? 'bg-white dark:bg-slate-700 shadow-sm text-[#5934e8]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    title="Text Editor"
                  >
                    <Code size={14} />
                    <span className="hidden sm:inline">Text</span>
                  </button>
                </div>

                {/* Alignment Controls (Only in Text Mode) */}
                {!isVisualMode && setTextAlign && (
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                    <button
                      onClick={() => setTextAlign("left")}
                      className={`p-1.5 rounded-md transition-colors ${textAlign === "left" ? 'bg-white dark:bg-slate-700 shadow-sm text-[#5934e8]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                      title="Align Left"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="15" y1="12" x2="3" y2="12"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
                    </button>
                    <button
                      onClick={() => setTextAlign("center")}
                      className={`p-1.5 rounded-md transition-colors ${textAlign === "center" ? 'bg-white dark:bg-slate-700 shadow-sm text-[#5934e8]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                      title="Align Center"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="19" y1="12" x2="5" y2="12"></line><line x1="17" y1="18" x2="7" y2="18"></line></svg>
                    </button>
                    <button
                      onClick={() => setTextAlign("right")}
                      className={`p-1.5 rounded-md transition-colors ${textAlign === "right" ? 'bg-white dark:bg-slate-700 shadow-sm text-[#5934e8]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                      title="Align Right"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="12" x2="9" y2="12"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>
                    </button>
                    <button
                      onClick={() => setTextAlign("justify")}
                      className={`p-1.5 rounded-md transition-colors ${textAlign === "justify" ? 'bg-white dark:bg-slate-700 shadow-sm text-[#5934e8]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                      title="Justify"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="12" x2="3" y2="12"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isVisualMode ? (
              <div className={`quill-editor-container rounded-xl border-2 transition-all ${
                darkMode 
                  ? 'bg-slate-900 border-slate-700 text-white focus-within:border-[#5934e8]' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus-within:border-[#5934e8]'
              }`}>
                <ReactQuill 
                  theme="snow" 
                  value={visualTitle} 
                  onChange={setVisualTitle} 
                  modules={modules}
                  placeholder={language === 'bn' ? "এখানে শিরোনাম লিখুন..." : "Enter headline here..."}
                  className={darkMode ? 'quill-dark' : ''}
                />
              </div>
            ) : (
              <DebouncedTextarea
                value={title}
                onChange={setTitle}
                rows={3}
                className={`block w-full px-4 py-3 border-2 rounded-xl focus:ring-0 transition-all resize-none ${
                  darkMode 
                    ? 'bg-slate-900 border-slate-700 text-white placeholder-gray-500 focus:border-[#5934e8]' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#5934e8]'
                }`}
                style={{ textAlign }}
                placeholder={language === 'bn' ? "এখানে শিরোনাম লিখুন..." : "Enter headline here..."}
              />
            )}
            
            {/* Headline Font Upload */}
            {setCustomFontUrl && setCustomFontName && (
              <div className="mt-3">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  {language === 'bn' ? 'শিরোনামের ফন্ট (TTF/WOFF)' : 'Headline Font (TTF/WOFF)'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".ttf,.woff,.woff2"
                    ref={fontInputRef}
                    onChange={handleFontUpload}
                    className="hidden"
                    multiple
                  />
                  <button
                    onClick={() => fontInputRef.current?.click()}
                    disabled={uploadingFont}
                    title={language === 'bn' ? 'ফন্ট আপলোড করুন' : 'Upload Font'}
                    className={`flex-shrink-0 p-2.5 rounded-lg transition-colors ${
                      darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {uploadingFont ? (
                      <span className="animate-pulse text-xs">...</span>
                    ) : (
                      <Upload size={18} />
                    )}
                  </button>
                  {allFonts.length > 0 && (
                    <div className="flex-1 min-w-0">
                      <FontDropdown
                        fonts={allFonts}
                        selectedFontName={customFontName || ''}
                        onSelect={async (font) => {
                          if (font.url) {
                            const newFont = new FontFace(font.name, `url(${font.url})`);
                            await newFont.load();
                            document.fonts.add(newFont);
                          }
                          setCustomFontUrl(font.url);
                          setCustomFontName(font.name);
                        }}
                        language={language}
                        darkMode={darkMode}
                      />
                    </div>
                  )}
                  {customFontName && (
                    <button
                      onClick={() => {
                        setCustomFontUrl('');
                        setCustomFontName('');
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Remove Font"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                {customFontName && (
                  <div className="mt-2 text-xs text-green-500 flex items-center gap-1">
                    <Type size={12} /> {language === 'bn' ? 'ফন্ট যুক্ত করা হয়েছে' : 'Font added'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Design 11, 12, 13, 14, 15, 16, 17, 18, 21 Specific Inputs */}
          {([10, 11, 12, 13, 14, 15, 16, 17, 18, 21].includes(selectedDesign)) && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === 'bn' 
                        ? (selectedDesign === 21 ? 'স্পীকারের নাম' : 'খবরের বিস্তারিত') 
                        : (selectedDesign === 21 ? 'Speaker Name' : 'Description')}
                    </label>
                    {setShowDetailedNewsBox && (
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {language === 'bn' ? 'অন/অফ' : 'On/Off'}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={showDetailedNewsBox}
                            onChange={(e) => setShowDetailedNewsBox(e.target.checked)}
                          />
                          <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#5934e8]/50 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-[#5934e8]"></div>
                        </label>
                      </div>
                    )}
                  </div>
                  {setDescriptionTextAlign && (
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                      <button
                        onClick={() => setDescriptionTextAlign("left")}
                        className={`p-1.5 rounded-md transition-colors ${descriptionTextAlign === "left" ? 'bg-white dark:bg-slate-700 shadow-sm text-[#5934e8]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                        title="Align Left"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="15" y1="12" x2="3" y2="12"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
                      </button>
                      <button
                        onClick={() => setDescriptionTextAlign("center")}
                        className={`p-1.5 rounded-md transition-colors ${descriptionTextAlign === "center" ? 'bg-white dark:bg-slate-700 shadow-sm text-[#5934e8]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                        title="Align Center"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="19" y1="12" x2="5" y2="12"></line><line x1="17" y1="18" x2="7" y2="18"></line></svg>
                      </button>
                      <button
                        onClick={() => setDescriptionTextAlign("right")}
                        className={`p-1.5 rounded-md transition-colors ${descriptionTextAlign === "right" ? 'bg-white dark:bg-slate-700 shadow-sm text-[#5934e8]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                        title="Align Right"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="12" x2="9" y2="12"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>
                      </button>
                      <button
                        onClick={() => setDescriptionTextAlign("justify")}
                        className={`p-1.5 rounded-md transition-colors ${descriptionTextAlign === "justify" ? 'bg-white dark:bg-slate-700 shadow-sm text-[#5934e8]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                        title="Justify"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="12" x2="3" y2="12"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
                      </button>
                    </div>
                  )}
                </div>
                
                {selectedDesign === 16 && (
                  <div className="mb-3">
                    <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg mb-3">
                      <button
                        onClick={() => handleScopeChange('bangladesh')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          historyScope === 'bangladesh'
                            ? 'bg-white dark:bg-slate-700 text-[#5934e8] shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                      >
                        {language === 'bn' ? 'বাংলাদেশ' : 'Bangladesh'}
                      </button>
                      <button
                        onClick={() => handleScopeChange('international')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          historyScope === 'international'
                            ? 'bg-white dark:bg-slate-700 text-[#5934e8] shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                      >
                        {language === 'bn' ? 'আন্তর্জাতিক' : 'International'}
                      </button>
                    </div>
                    <button
                      onClick={async () => {
                        if (!setDescription) return;
                        try {
                          setIsFetching(true);
                          const formattedDate = format(date, 'MMMM d');
                          const prompt = historyScope === 'bangladesh'
                            ? `Generate 3-4 bullet points in Bengali about significant historical events or special days related to Bangladesh that occurred on ${formattedDate}. Format each point on a new line. Do not include any introductory or concluding text.`
                            : `Generate 3-4 bullet points in Bengali about significant international historical events or special days that occurred on ${formattedDate}. Format each point on a new line. Do not include any introductory or concluding text.`;
                          
                          const { GoogleGenAI } = await import('@google/genai');
                          const apiKey = localStorage.getItem('GEMINI_API_KEY') || process.env.GEMINI_API_KEY;
                          if (!apiKey) {
                            showToast.error(language === 'bn' ? 'API Key পাওয়া যায়নি। দয়া করে সেটিংস থেকে সেট করুন।' : 'API Key missing. Please set it in Settings.');
                            setIsFetching(false);
                            return;
                          }
                          const ai = new GoogleGenAI({ apiKey });
                          let response;
                          try {
                            response = await ai.models.generateContent({
                              model: "gemini-3.1-flash-lite-preview",
                              contents: prompt,
                            });
                          } catch (firstError) {
                            console.warn("Primary model failed, falling back to gemini-3-flash-preview", firstError);
                            response = await ai.models.generateContent({
                              model: "gemini-3-flash-preview",
                              contents: prompt,
                            });
                          }
                          
                          if (response.text) {
                            setDescription(response.text.trim());
                          }
                        } catch (err) {
                          console.error('Error generating content:', err);
                          showToast.error(language === 'bn' ? 'অটো জেনারেট করতে সমস্যা হয়েছে।' : 'Failed to auto-generate content.');
                        } finally {
                          setIsFetching(false);
                        }
                      }}
                      disabled={isFetching}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        darkMode 
                          ? 'bg-[#5934e8]/20 text-[#5934e8] hover:bg-[#5934e8]/30' 
                          : 'bg-[#5934e8]/10 text-[#5934e8] hover:bg-[#5934e8]/20'
                      }`}
                    >
                      {isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="text-lg leading-none">✨</span>}
                      {language === 'bn' ? 'আজকের ঘটনা খুঁজুন (Auto Generate)' : 'Find Today\'s Events (Auto Generate)'}
                    </button>
                  </div>
                )}

                <DebouncedTextarea
                  value={description || ''}
                  onChange={(val) => setDescription?.(val)}
                  rows={4}
                  className={`block w-full px-4 py-3 border-2 rounded-xl focus:ring-0 transition-all resize-none ${
                    darkMode 
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-gray-500 focus:border-[#5934e8]' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#5934e8]'
                  }`}
                  style={{ textAlign: descriptionTextAlign }}
                  placeholder={language === 'bn' 
                    ? (selectedDesign === 21 ? "স্পীকারের নাম লিখুন..." : "খবরের বিস্তারিত লিখুন...") 
                    : (selectedDesign === 21 ? "Enter speaker name..." : "Enter description here...")}
                />
                
                {/* Description offset controls */}
                {selectedDesign === 21 && setDescriptionOffsetX && setDescriptionOffsetY && (
                  <div className="flex gap-4 mt-3">
                    <div className="flex-1">
                      <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {language === 'bn' ? 'ডানে/বামে সরান' : 'Move X'}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="-200"
                          max="200"
                          value={descriptionOffsetX}
                          onChange={(e) => setDescriptionOffsetX(Number(e.target.value))}
                          className="flex-1 accent-[#5934e8]"
                        />
                        <span className={`text-xs font-medium w-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {descriptionOffsetX}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {language === 'bn' ? 'উপরে/নিচে সরান' : 'Move Y'}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="-200"
                          max="200"
                          value={descriptionOffsetY}
                          onChange={(e) => setDescriptionOffsetY(Number(e.target.value))}
                          className="flex-1 accent-[#5934e8]"
                        />
                        <span className={`text-xs font-medium w-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {descriptionOffsetY}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Description Style Controls */}
                <div className="flex gap-4 mt-3">
                  {setDescriptionFontSize && (
                    <div className="flex-1">
                      <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {language === 'bn' ? 'ফন্ট সাইজ' : 'Font Size'}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="16"
                          max="48"
                          value={descriptionFontSize}
                          onChange={(e) => setDescriptionFontSize(Number(e.target.value))}
                          className="flex-1 accent-[#5934e8]"
                        />
                        <span className={`text-xs font-medium w-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {descriptionFontSize}
                        </span>
                      </div>
                    </div>
                  )}
                  {setDescriptionColor && (
                    <div className="flex-1">
                      <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {language === 'bn' ? 'ফন্ট কালার' : 'Font Color'}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={descriptionColor.startsWith('rgba') ? '#ffffff' : descriptionColor} // Simple fallback for color picker
                          onChange={(e) => setDescriptionColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                        />
                      </div>
                    </div>
                  )}
                  {selectedDesign === 21 && setDescriptionBgColor && setShowDescriptionBg && (
                    <div className="flex-[2] flex gap-4">
                      <div className="flex-1">
                        <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {language === 'bn' ? 'বক্স কালার' : 'Box Color'}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={descriptionBgColor}
                            onChange={(e) => setDescriptionBgColor(e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {language === 'bn' ? 'বক্স দেখান' : 'Show Box'}
                        </label>
                        <div className="flex items-center h-8">
                          <input
                            type="checkbox"
                            checked={showDescriptionBg}
                            onChange={(e) => setShowDescriptionBg(e.target.checked)}
                            className="w-4 h-4 rounded cursor-pointer accent-[#5934e8]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'bn' 
                    ? (selectedDesign === 21 ? 'পদবী' : 'হ্যাশট্যাগ') 
                    : (selectedDesign === 21 ? 'Designation' : 'Hashtag')}
                </label>
                <DebouncedInput
                  type="text"
                  value={hashtag || ''}
                  onChange={(val) => setHashtag?.(val)}
                  className={`block w-full px-4 py-3 border-2 rounded-xl focus:ring-0 transition-all ${
                    darkMode 
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-gray-500 focus:border-[#5934e8]' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#5934e8]'
                  }`}
                  placeholder={selectedDesign === 21 ? "" : "# H A S H T A G"}
                />
              </div>
            </>
          )}

          {/* Image Upload */}
          <div id="panel-content-editor-image">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'bn' ? (selectedDesign === 20 ? 'ভিডিও/ছবি' : 'ছবি') : (selectedDesign === 20 ? 'Video/Image' : 'Featured Image')}
            </label>
            <div className={`grid ${selectedDesign === 17 ? 'grid-cols-2 gap-4' : 'grid-cols-1'}`}>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-xl p-8 transition-all text-center ${
                  darkMode 
                    ? 'border-slate-700 hover:border-[#5934e8] hover:bg-slate-700/50' 
                    : 'border-gray-300 hover:border-[#5934e8] hover:bg-[#5934e8]/10'
                }`}
              >
                {image ? (
                  <div className="relative h-48 w-full rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity bg-black">
                    {image.startsWith('data:video/') ? (
                      <video 
                        src={image.replace('data:video/blob;', '')}
                        className="w-full h-full object-contain" 
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img 
                        src={image} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
                        <ImageIcon size={18} />
                        <span>Change Image</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage('');
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors z-20"
                      title={language === 'bn' ? 'ছবি মুছুন' : 'Remove Image'}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <div className={`p-4 rounded-full ${
                      darkMode ? 'bg-slate-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <Upload size={24} />
                    </div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {language === 'bn' ? 'ছবি আপলোড করুন' : 'Click to upload image'}
                      </p>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleImageUpload(e, 'news')}
                  className="hidden"
                  accept="image/*,video/*"
                />
              </div>
              
              {selectedDesign === 21 && (
                <div className="mt-3">
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={removeBackground}
                        onChange={(e) => setRemoveBackground?.(e.target.checked)}
                        className={`w-4 h-4 rounded border-gray-300 ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white'}`}
                      />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {language === 'bn' ? 'অটো ব্যাকগ্রাউন্ড রিমুভ করুন' : 'Auto-remove Background'}
                      </span>
                    </label>
                    <p className={`text-xs ml-6 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {language === 'bn' ? 'ছবি আপলোডের সময় মানুষের ব্যাকগ্রাউন্ড মুছে যাবে' : 'Background will be removed when uploading a person\'s photo'}
                    </p>
                    
                    {image && !image.startsWith('data:video/') && (
                      <button
                        onClick={handleRemoveBackgroundNow}
                        disabled={isRemovingBg}
                        className={`ml-6 mt-1 text-xs py-1.5 px-3 rounded-md border font-medium flex items-center justify-center w-fit
                          ${darkMode 
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-50' 
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                          }`}
                      >
                        {isRemovingBg 
                          ? (language === 'bn' ? 'অপেক্ষা করুন...' : 'Processing...') 
                          : (language === 'bn' ? 'এখনই ব্যাকগ্রাউন্ড রিমুভ করুন' : 'Remove Background Now')}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {selectedDesign === 19 && (
                <div className="mt-4 p-4 border rounded-xl bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-sm mb-2 text-blue-800 dark:text-blue-300">
                    {language === 'bn' ? 'এআই ইলাস্ট্রেশন জেনারেটর' : 'AI Illustration Generator'}
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-3">
                    {language === 'bn' 
                      ? 'একটি ছবি আপলোড করুন এবং এআই ব্যবহার করে সেটিকে ইলাস্ট্রেশনে রূপান্তর করুন।' 
                      : 'Upload an image and convert it to an illustration using AI.'}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">
                        {language === 'bn' ? 'প্রম্পট (নির্দেশনা)' : 'Prompt'}
                      </label>
                      <DebouncedTextarea
                        value={illustrationPrompt || ''}
                        onChange={(val) => setIllustrationPrompt?.(val)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        rows={3}
                      />
                    </div>
                    
                    <button
                      onClick={async () => {
                        if (!image) {
                          showToast.error(language === 'bn' ? 'প্রথমে একটি ছবি আপলোড করুন' : 'Please upload an image first');
                          return;
                        }
                        if (!setImage || !setIsGeneratingIllustration) return;
                        
                        try {
                          setIsGeneratingIllustration(true);
                          const { GoogleGenAI } = await import('@google/genai');
                          const apiKey = localStorage.getItem('GEMINI_API_KEY') || process.env.GEMINI_API_KEY;
                          if (!apiKey) {
                            showToast.error(language === 'bn' ? 'API Key পাওয়া যায়নি। দয়া করে সেটিংস থেকে সেট করুন।' : 'API Key missing. Please set it in Settings.');
                            setIsGeneratingIllustration(false);
                            return;
                          }
                          const ai = new GoogleGenAI({ apiKey });
                          
                          // Extract base64 data
                          const base64Data = image.split(',')[1];
                          const mimeType = image.split(';')[0].split(':')[1];
                          
                          showToast.success(language === 'bn' ? 'ইলাস্ট্রেশন তৈরি হচ্ছে, অপেক্ষা করুন...' : 'Generating illustration, please wait...');

                          const response = await ai.models.generateContent({
                            model: 'gemini-2.5-flash-image',
                            contents: {
                              parts: [
                                {
                                  inlineData: {
                                    data: base64Data,
                                    mimeType: mimeType,
                                  },
                                },
                                {
                                  text: illustrationPrompt || 'Transform this image into a high-quality digital illustration style, similar to a modern vector art or digital painting. Add a beautiful, complementary background.',
                                },
                              ],
                            },
                          });

                          let foundImage = false;
                          for (const part of response.candidates?.[0]?.content?.parts || []) {
                            if (part.inlineData) {
                              const generatedBase64 = part.inlineData.data;
                              const imageUrl = `data:image/png;base64,${generatedBase64}`;
                              setImage(imageUrl);
                              showToast.success(language === 'bn' ? 'ইলাস্ট্রেশন সফলভাবে তৈরি হয়েছে!' : 'Illustration generated successfully!');
                              foundImage = true;
                              break;
                            }
                          }
                          
                          if (!foundImage) {
                            const finishReason = response.candidates?.[0]?.finishReason;
                            if (finishReason === 'SAFETY') {
                              throw new Error(language === 'bn' ? "নিরাপত্তা নীতির কারণে ছবিটি তৈরি করা যায়নি।" : "Image generation blocked by safety settings.");
                            }
                            throw new Error("No image data returned from the API.");
                          }
                        } catch (err: any) {
                          console.error('Error generating illustration:', err);
                          const errorMsg = err?.message || '';
                          if (errorMsg.includes('API key not valid') || errorMsg.includes('API_KEY_INVALID')) {
                            showToast.error(language === 'bn' ? 'আপনার API Key সঠিক নয়। দয়া করে সেটিংস থেকে সঠিক Key দিন অথবা মুছে ফেলুন।' : 'Invalid API Key. Please check your settings.');
                          } else if (errorMsg.includes('429') || errorMsg.toLowerCase().includes('quota')) {
                            showToast.error(language === 'bn' ? 'আপনার ফ্রি ব্যবহারের লিমিট শেষ হয়ে গেছে। কিছুক্ষণ পর আবার চেষ্টা করুন।' : 'API Quota exceeded. Please wait a minute and try again.');
                          } else {
                            showToast.error(language === 'bn' ? `ইলাস্ট্রেশন তৈরি করতে সমস্যা হয়েছে: ${errorMsg}` : `Failed to generate illustration: ${errorMsg}`);
                          }
                        } finally {
                          setIsGeneratingIllustration(false);
                        }
                      }}
                      disabled={isGeneratingIllustration || !image}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-colors ${
                        isGeneratingIllustration || !image
                          ? 'bg-blue-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {isGeneratingIllustration ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {language === 'bn' ? 'তৈরি হচ্ছে...' : 'Generating...'}
                        </>
                      ) : (
                        <>
                          <span className="text-lg leading-none">✨</span>
                          {language === 'bn' ? 'ইলাস্ট্রেশন তৈরি করুন' : 'Generate Illustration'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {selectedDesign === 17 && (
                <div 
                  onClick={() => fileInputRef2?.current?.click()}
                  className={`relative group cursor-pointer border-2 border-dashed rounded-xl p-8 transition-all text-center ${
                    darkMode 
                      ? 'border-slate-700 hover:border-[#5934e8] hover:bg-slate-700/50' 
                      : 'border-gray-300 hover:border-[#5934e8] hover:bg-[#5934e8]/10'
                  }`}
                >
                  {image2 ? (
                    <div className="relative h-48 w-full rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity bg-black">
                      {image2.startsWith('data:video/') ? (
                        <video 
                          src={image2.replace('data:video/blob;', '')}
                          className="w-full h-full object-contain" 
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img 
                          src={image2} 
                          alt="Preview 2" 
                          className="w-full h-full object-cover" 
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
                          <ImageIcon size={18} />
                          <span>Change Image 2</span>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          useAppStore.getState().setImage2('');
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors z-20"
                        title={language === 'bn' ? 'ছবি মুছুন' : 'Remove Image'}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-4">
                      <div className={`p-4 rounded-full ${
                        darkMode ? 'bg-slate-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <Upload size={24} />
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {language === 'bn' ? '২য় ছবি আপলোড করুন' : 'Upload 2nd image'}
                        </p>
                        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef2}
                    onChange={(e) => handleImageUpload(e, 'news2')}
                    className="hidden"
                    accept="image/*,video/*"
                  />
                </div>
              )}
            </div>

            {/* Image Position Slider */}
            {imageOffsetY !== undefined && setImageOffsetY !== undefined && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                <label className={`flex items-center gap-2 text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  <MoveVertical size={16} />
                  {language === 'bn' ? 'ছবির পজিশন (উপরে/নিচে)' : 'Image Position (Up/Down)'}
                </label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setImageOffsetY(Math.max(-100, imageOffsetY - 1))}
                    className={`p-1.5 rounded-md ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                  >-</button>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={imageOffsetY}
                    onChange={(e) => setImageOffsetY(Number(e.target.value))}
                    className="flex-1 accent-[#5934e8]"
                  />
                  <button 
                    onClick={() => setImageOffsetY(Math.min(100, imageOffsetY + 1))}
                    className={`p-1.5 rounded-md ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                  >+</button>
                  <span className={`w-12 text-center text-xs font-mono bg-gray-100 dark:bg-slate-700 py-1 rounded ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {imageOffsetY}
                  </span>
                </div>
                <div className="flex justify-center mt-2">
                  <button 
                    onClick={() => setImageOffsetY(0)}
                    className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {language === 'bn' ? 'রিসেট' : 'Reset'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Date Picker */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'bn' ? 'তারিখ' : 'Date'}
            </label>
            <input
              type="date"
              value={format(date, 'yyyy-MM-dd')}
              onChange={(e) => setDate(new Date(e.target.value))}
              className={`block w-full px-4 py-3 border-2 rounded-xl focus:ring-0 transition-all ${
                darkMode 
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-[#5934e8]' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#5934e8]'
              }`}
            />
          </div>
        </div>
      </div></div>
      {/* Format Guide Modal */}
      {showFormatGuide && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" 
          onClick={() => setShowFormatGuide(false)}
        >
          <div 
            className={`w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl p-6 ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}`} 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-inherit z-10 pb-2 border-b border-gray-200 dark:border-slate-700">
              <h3 className="text-xl font-bold">টেক্সট ফরম্যাটিং গাইড (Text Mode)</h3>
              <button 
                onClick={() => setShowFormatGuide(false)} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              
              {/* Full Examples Section */}
              <div className={`p-5 rounded-xl border-2 ${darkMode ? 'border-[#5934e8]/30 bg-[#5934e8]/10' : 'border-[#5934e8]/20 bg-[#5934e8]/5'}`}>
                <h4 className="font-bold mb-4 text-[#5934e8] text-lg border-b border-[#5934e8]/20 pb-2">পূর্ণাঙ্গ উদাহরণ (Full Examples)</h4>
                
                <div className="space-y-6">
                  {/* Example 1 */}
                  <div>
                    <h5 className="font-semibold text-sm mb-2 opacity-80">উদাহরণ ১: হাইলাইট ও ডাবল কোলন (::)</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">আপনি লিখবেন:</p>
                        <code className="px-3 py-2 bg-gray-200 dark:bg-slate-700 rounded-lg text-sm block break-all font-mono">
                          **(লাল) ব্রেকিং নিউজ**:: আজ ঢাকায় (নীল)প্রচণ্ড বৃষ্টি হতে পারে।
                        </code>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">ফটোকার্ডে যেমন দেখাবে:</p>
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                          <span className="px-3 py-1 rounded-lg inline-block leading-none mr-1" style={{ backgroundColor: 'red', color: 'white' }}>ব্রেকিং নিউজ</span>
                          <span className="font-bold mr-1" style={{ color: '#5934e8' }}></span>
                          <span> আজ ঢাকায় <span style={{ color: 'blue' }} className="font-bold">প্রচণ্ড বৃষ্টি</span> হতে পারে।</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div>
                    <h5 className="font-semibold text-sm mb-2 opacity-80">উদাহরণ ২: উক্তি (Quote)</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">আপনি লিখবেন:</p>
                        <code className="px-3 py-2 bg-gray-200 dark:bg-slate-700 rounded-lg text-sm block break-all font-mono">
                          শিক্ষাই জাতির মেরুদণ্ড -- কাজী নজরুল ইসলাম
                        </code>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">ফটোকার্ডে যেমন দেখাবে:</p>
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm flex justify-center">
                          <div className="flex flex-col gap-1 inline-block">
                            <div className="italic font-medium opacity-90 text-left">❝শিক্ষাই জাতির মেরুদণ্ড❞</div>
                            <div className="font-bold opacity-80 text-right text-xs">- কাজী নজরুল ইসলাম</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-lg mt-8 mb-4 border-b pb-2">বিস্তারিত নিয়মাবলী (Syntax Breakdown)</h4>

              {/* Highlight */}
              <div className={`p-4 rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-gray-200 bg-gray-50'}`}>
                <h4 className="font-semibold mb-3 text-[#5934e8]">১. ব্যাকগ্রাউন্ড হাইলাইট (Background Highlight)</h4>
                <p className="text-sm mb-3 opacity-80">লেখার চারপাশে বক্স বা ব্যাকগ্রাউন্ড কালার দিতে `**` ব্যবহার করুন।</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">সিনট্যাক্স:</p>
                    <code className="px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded text-sm break-all">**আপনার লেখা**</code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ফলাফল:</p>
                    <span className="px-3 py-1 rounded-lg inline-block leading-none" style={{ backgroundColor: '#5934e8', color: 'white' }}>আপনার লেখা</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">কালারসহ সিনট্যাক্স:</p>
                    <code className="px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded text-sm break-all">**(লাল) আপনার লেখা**</code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ফলাফল:</p>
                    <span className="px-3 py-1 rounded-lg inline-block leading-none" style={{ backgroundColor: 'red', color: 'white' }}>আপনার লেখা</span>
                  </div>
                </div>
              </div>

              {/* Custom Font/Color */}
              <div className={`p-4 rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-gray-200 bg-gray-50'}`}>
                <h4 className="font-semibold mb-3 text-[#5934e8]">২. কাস্টম ফন্ট, কালার ও সাইজ</h4>
                <p className="text-sm mb-3 opacity-80">লেখার ফন্ট পরিবর্তন করতে `[ফন্টের নাম]` অথবা `(ফন্ট-নম্বর)` ব্যবহার করুন। কালার ও সাইজও একসাথে দেওয়া যায়।</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ফন্টের নাম দিয়ে:</p>
                    <code className="px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded text-sm break-all">[Mina]আপনার লেখা</code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ফলাফল:</p>
                    <span style={{ fontFamily: '"Mina", sans-serif' }} className="font-bold">আপনার লেখা</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ফন্ট নম্বর ও কালার:</p>
                    <code className="px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded text-sm break-all">(২ লাল)আপনার লেখা</code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ফলাফল:</p>
                    <span style={{ color: 'red', fontFamily: 'serif' }} className="font-bold">আপনার লেখা</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ফন্ট, কালার ও সাইজ:</p>
                    <code className="px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded text-sm break-all">(৩ নীল ৩০)আপনার লেখা</code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ফলাফল:</p>
                    <span style={{ color: 'blue', fontSize: '30px', fontFamily: 'monospace' }} className="font-bold leading-none">আপনার লেখা</span>
                  </div>
                </div>
              </div>

              {/* Colon Highlight */}
              <div className={`p-4 rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-gray-200 bg-gray-50'}`}>
                <h4 className="font-semibold mb-3 text-[#5934e8]">৩. ডাবল কোলন (::) হাইলাইট</h4>
                <p className="text-sm mb-3 opacity-80">লেখার মাঝে `::` দিলে, তার আগের অংশটুকু থিম কালারে হাইলাইট হয়ে যাবে। আর `:::` দিলে সাথে একটি কোলনও (:) দেখাবে।</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">সিনট্যাক্স (::):</p>
                    <code className="px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded text-sm break-all">ব্রেকিং নিউজ:: আজকের খবর</code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ফলাফল:</p>
                    <div>
                      <span className="font-bold" style={{ color: '#5934e8' }}>ব্রেকিং নিউজ</span>
                      <span> আজকের খবর</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">সিনট্যাক্স (:::):</p>
                    <code className="px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded text-sm break-all">ব্রেকিং নিউজ::: আজকের খবর</code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ফলাফল:</p>
                    <div>
                      <span className="font-bold" style={{ color: '#5934e8' }}>ব্রেকিং নিউজ:</span>
                      <span> আজকের খবর</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className={`p-4 rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-gray-200 bg-gray-50'}`}>
                <h4 className="font-semibold mb-3 text-[#5934e8]">৪. উক্তি বা কোটেশন (Quote)</h4>
                <p className="text-sm mb-3 opacity-80">উক্তি এবং লেখকের নামের মাঝে `--` (ডাবল ড্যাশ) ব্যবহার করুন।</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">সিনট্যাক্স:</p>
                    <code className="px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded text-sm block break-all">শিক্ষাই জাতির মেরুদণ্ড -- কাজী নজরুল ইসলাম</code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ফলাফল:</p>
                    <div className="flex flex-col gap-1 inline-block">
                      <div className="italic font-medium opacity-90 text-left">❝শিক্ষাই জাতির মেরুদণ্ড❞</div>
                      <div className="font-bold opacity-80 text-right text-xs">- কাজী নজরুল ইসলাম</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
