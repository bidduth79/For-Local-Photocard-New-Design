const fs = require('fs');
let file = fs.readFileSync('src/components/controls/SidebarControls.tsx', 'utf-8');

file = file.replace(/<ContentEditor[\s\S]*?\/>/, '<ContentEditor />');

fs.writeFileSync('src/components/controls/SidebarControls.tsx', file);
console.log('done!');
