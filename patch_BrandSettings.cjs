const fs = require('fs');
let content = fs.readFileSync('src/components/controls/news/BrandSettings.tsx', 'utf8');

// Insert new properties from useAppContext
content = content.replace(
  '    fullBrandLogo,\n    setFullBrandLogo,',
  '    fullBrandLogo,\n    setFullBrandLogo,\n    videoLogo,\n    setVideoLogo,\n    videoLogoScale,\n    setVideoLogoScale,\n    videoLogoX,\n    setVideoLogoX,\n    videoLogoY,\n    setVideoLogoY,'
);

// We need a ref for the video logo file input
content = content.replace(
  '  const fullLogoInputRef = useRef<HTMLInputElement>(null);',
  '  const fullLogoInputRef = useRef<HTMLInputElement>(null);\n  const videoLogoInputRef = useRef<HTMLInputElement>(null);'
);

// We need to add the UI for the video logo upload if selectedDesign === 20.
// Let's insert it before "Icon Logo"
const newUI = `
          {/* Video Logo Upload (Only for Video Card) */}
          {selectedDesign === 20 && (
            <div className="mb-4">
              <label className={\`block text-sm font-medium mb-2 \${darkMode ? 'text-white' : 'text-gray-700'}\`}>
                {language === 'bn' ? 'ভিডিও লোগো (ছবি/গিফ/ভিডিও)' : 'Video Logo (Image/GIF/Video)'}
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => videoLogoInputRef.current?.click()}
                  className={\`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-xl transition-all \${
                    darkMode 
                      ? 'border-slate-700 hover:border-[#5934e8] hover:bg-slate-700/50 text-gray-300' 
                      : 'border-gray-300 hover:border-[#5934e8] hover:bg-[#5934e8]/10 text-gray-600'
                  }\`}
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
                    className={\`px-4 py-3 rounded-xl border-2 font-medium transition-all \${
                      darkMode 
                        ? 'border-red-900/50 text-red-400 hover:bg-red-900/20' 
                        : 'border-red-100 text-red-600 hover:bg-red-50'
                    }\`}
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
                      <label className={\`text-sm font-medium \${darkMode ? 'text-white' : 'text-gray-700'}\`}>
                        {language === 'bn' ? 'সাইজ' : 'Size'}
                      </label>
                      <span className={\`text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600\`}>
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
                      <label className={\`text-sm font-medium \${darkMode ? 'text-white' : 'text-gray-700'}\`}>
                        {language === 'bn' ? 'ডানে/বামে (X)' : 'Left/Right (X)'}
                      </label>
                      <span className={\`text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600\`}>
                        {videoLogoX}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-500"
                      max="500"
                      value={videoLogoX}
                      onChange={(e) => setVideoLogoX(parseInt(e.target.value))}
                      className="w-full accent-[#5934e8]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className={\`text-sm font-medium \${darkMode ? 'text-white' : 'text-gray-700'}\`}>
                        {language === 'bn' ? 'উপরে/নিচে (Y)' : 'Up/Down (Y)'}
                      </label>
                      <span className={\`text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600\`}>
                        {videoLogoY}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-500"
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
          {/* Logo Upload */}`;

content = content.replace('{/* Logo Upload */}', newUI);

fs.writeFileSync('src/components/controls/news/BrandSettings.tsx', content);
