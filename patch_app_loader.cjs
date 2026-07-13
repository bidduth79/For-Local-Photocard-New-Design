const fs = require('fs');
let file = 'src/App.tsx';
let code = fs.readFileSync(file, 'utf8');

const target = `  const downloadImage = async () => {
    const imageUrl = state.image;
    if (imageUrl?.startsWith('data:video/')) {
      setIsProcessingVideo(true);
    }`;

const replacement = `  const downloadImage = async () => {
    const imageUrl = state.image;
    const isVideoFile = imageUrl?.startsWith('data:video/') || imageUrl?.match(/\\.(mp4|webm|mov|ogg)(\\?.*)?$/i);
    const isVideoDesign = state.selectedDesign === 20;
    if (isVideoFile || isVideoDesign) {
      setIsProcessingVideo(true);
    }`;

code = code.replace(target, replacement);
fs.writeFileSync(file, code);
