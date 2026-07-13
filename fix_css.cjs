const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(/\[\.export-video_\&\]:\!bg-transparent/g, '[.export-video_&]:!bg-transparent [&.export-video]:!bg-transparent');
    // Also cleanup duplicates just in case
    newContent = newContent.replace(/\[\.export-video_\&\]:\!bg-transparent \[\&\.export-video\]:\!bg-transparent \[\&\.export-video\]:\!bg-transparent/g, '[.export-video_&]:!bg-transparent [&.export-video]:!bg-transparent');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log('Fixed', filePath);
    }
  }
});
