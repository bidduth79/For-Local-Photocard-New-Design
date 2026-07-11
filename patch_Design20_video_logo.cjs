const fs = require('fs');
let content = fs.readFileSync('src/components/cards/designs/Design20.tsx', 'utf8');

content = content.replace(
  '<video src={videoLogo} autoPlay loop muted playsInline className="max-w-full max-h-full object-contain" />',
  '<video src={videoLogo} autoPlay loop muted playsInline className="max-w-full max-h-full object-contain video-logo-layer" />'
);

fs.writeFileSync('src/components/cards/designs/Design20.tsx', content);
