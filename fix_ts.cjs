const fs = require('fs');
let content = fs.readFileSync('src/components/cards/Photocard.tsx', 'utf8');
content = content.replace(/transformOrigin: 'center center' } as any\s*}}/g, "transformOrigin: 'center center'\n                } as React.CSSProperties}");
fs.writeFileSync('src/components/cards/Photocard.tsx', content);
