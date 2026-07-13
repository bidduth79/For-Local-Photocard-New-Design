const fs = require('fs');
const file = 'src/hooks/useImageDownload.ts';
let code = fs.readFileSync(file, 'utf8');
const target = `            throw new Error('Video rendering failed on server');
          }
          const renderedBlob = await response.blob();
          const url = URL.createObjectURL(renderedBlob);
          
          return { 
            success: true, 
            videoUrl: url, 
            filename: \`mediacell-\${activeTab}-\${Date.now()}.mp4\`
          };
        } catch (err: any) {
          console.error('Server rendering failed:', err);
          const errMsg = err.message || '';
          showToast.error(language === 'bn' ? \`ভিডিও তৈরিতে সমস্যা হয়েছে: \${errMsg}\` : \`Failed to generate video: \${errMsg}\`);
          return { success: false };
        }`;
if (!code.includes(target)) {
  console.log('Target not found!');
} else {
  console.log('Target found!');
}
