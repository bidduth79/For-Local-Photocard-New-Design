const fs = require('fs');
let content = fs.readFileSync('src/components/cards/designs/Design20.tsx', 'utf8');

const replacement = `
      {/* Fullscreen Background Image/Video with Zoom/Pan Support */}
      {renderBackgroundPattern()}
      <div className="absolute inset-0 z-10 pointer-events-auto">`;

content = content.replace(
  '{/* Fullscreen Background Image/Video with Zoom/Pan Support */}\n      <div className="absolute inset-0 z-10 pointer-events-auto">',
  replacement
);

fs.writeFileSync('src/components/cards/designs/Design20.tsx', content);
