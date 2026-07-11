const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetState = `  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);`;
const replacementState = `  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);`;

const targetDownload = `  const downloadImage = async () => {
    const imageUrl = state.image;
    const result = await downloadImageHook('news', state.photocardRef, state.quoteCardRef, state.selectedDesign, state.language, imageUrl, (state as any).videoResolution);
    if (result && result.requiresLicense) {`;
const replacementDownload = `  const downloadImage = async () => {
    const imageUrl = state.image;
    if (imageUrl?.startsWith('data:video/')) {
      setIsProcessingVideo(true);
    }
    const result = await downloadImageHook('news', state.photocardRef, state.quoteCardRef, state.selectedDesign, state.language, imageUrl, (state as any).videoResolution);
    setIsProcessingVideo(false);
    if (result && result.requiresLicense) {`;

const targetReturn = `  return (
    <div className={\`min-h-screen flex flex-col transition-colors duration-300 \${state.darkMode ? 'bg-slate-900' : 'bg-gray-50'}\`}>`;
const replacementReturn = `  return (
    <div className={\`min-h-screen flex flex-col transition-colors duration-300 \${state.darkMode ? 'bg-slate-900' : 'bg-gray-50'}\`}>
      {isProcessingVideo && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white">
          <div className="w-16 h-16 border-4 border-[#5934e8] border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-bold mb-2">{state.language === 'bn' ? 'ভিডিও তৈরি হচ্ছে...' : 'Processing Video...'}</h2>
          <p className="text-gray-300 text-center max-w-md px-4">
            {state.language === 'bn' 
              ? 'অনুগ্রহ করে অপেক্ষা করুন। ভিডিওটি তৈরি হতে কিছু সময় লাগতে পারে। ডাউনলোড শেষ না হওয়া পর্যন্ত ট্যাব পরিবর্তন বা মিনিমাইজ করবেন না।' 
              : 'Please wait, generating your video. Do not switch tabs or minimize the browser until the download is complete.'}
          </p>
        </div>
      )}`;

content = content.replace(targetState, replacementState).replace(targetDownload, replacementDownload).replace(targetReturn, replacementReturn);
fs.writeFileSync('src/App.tsx', content);
