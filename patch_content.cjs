const fs = require('fs');
let code = fs.readFileSync('src/components/controls/news/ContentEditor.tsx', 'utf-8');

const importCode = `
import { toast } from 'react-hot-toast';
`;
if (!code.includes("import { toast }")) {
  code = code.replace("import React", "import React\n" + importCode);
}

const stateCode = `
  const [isDownloadingVideo, setIsDownloadingVideo] = React.useState(false);
  const selectedDesign = useAppStore(s => s.selectedDesign);
  const setImage = useAppStore(s => s.setImage);

  const downloadVideo = async () => {
    if (!url) return;
    setIsDownloadingVideo(true);
    try {
      const res = await fetch('/api/download-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (data.success && data.videoUrl) {
        setImage(data.videoUrl);
        toast.success(language === 'bn' ? 'ভিডিও সফলভাবে ডাউনলোড হয়েছে!' : 'Video downloaded successfully!');
      } else {
        toast.error(language === 'bn' ? 'ভিডিও ডাউনলোড করতে ব্যর্থ হয়েছে' : 'Failed to download video');
      }
    } catch (err) {
      console.error(err);
      toast.error(language === 'bn' ? 'ভিডিও ডাউনলোড করতে ব্যর্থ হয়েছে' : 'Failed to download video');
    } finally {
      setIsDownloadingVideo(false);
    }
  };
`;

code = code.replace('const { fetchLinkData, handleImageUpload, fileInputRef, fileInputRef2 } = useAppContext();', 
  'const { fetchLinkData, handleImageUpload, fileInputRef, fileInputRef2 } = useAppContext();' + stateCode);

const btnCode = `
          {selectedDesign === 20 && (
            <button
              type="button"
              onClick={downloadVideo}
              disabled={isDownloadingVideo || !url}
              className="mt-2 w-full py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isDownloadingVideo ? <Loader2 className="animate-spin" size={18} /> : (language === 'bn' ? 'ভিডিও ডাউনলোড করুন (yt-dlp)' : 'Download Video (yt-dlp)')}
            </button>
          )}
`;

code = code.replace('</form>', '</form>' + btnCode);

fs.writeFileSync('src/components/controls/news/ContentEditor.tsx', code);
