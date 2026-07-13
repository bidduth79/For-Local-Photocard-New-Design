const fs = require('fs');
const file = 'src/App.tsx';
let code = fs.readFileSync(file, 'utf8');

const target = `  const downloadImage = async () => {
    const imageUrl = state.image;
    if (imageUrl?.startsWith('data:video/')) {
      setIsProcessingVideo(true);
    }
    const result = await downloadImageHook('news', state.photocardRef, state.quoteCardRef, state.selectedDesign, state.language, imageUrl, (state as any).videoResolution);
    setIsProcessingVideo(false);`;

const replacement = `  const downloadImage = async () => {
    const imageUrl = state.image;
    if (imageUrl?.startsWith('data:video/')) {
      setIsProcessingVideo(true);
    }
    let result = null;
    try {
      result = await downloadImageHook('news', state.photocardRef, state.quoteCardRef, state.selectedDesign, state.language, imageUrl, (state as any).videoResolution);
    } catch (e) {
      console.error(e);
      import('react-hot-toast').then(({ toast }) => toast.error('Error generating image/video'));
    } finally {
      setIsProcessingVideo(false);
    }`;

code = code.replace(target, replacement);
fs.writeFileSync(file, code);
