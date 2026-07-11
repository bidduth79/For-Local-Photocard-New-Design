const fs = require('fs');
let content = fs.readFileSync('src/components/cards/Photocard.tsx', 'utf8');

content = content.replace(/className="bg-white relative overflow-hidden flex flex-col font-sans \[\.export-video_\\className="bg-white relative overflow-hidden flex flex-col font-sans"\]:!bg-transparent"/g, 'className="bg-white relative overflow-hidden flex flex-col font-sans [.export-video_&]:!bg-transparent"');

fs.writeFileSync('src/components/cards/Photocard.tsx', content);
