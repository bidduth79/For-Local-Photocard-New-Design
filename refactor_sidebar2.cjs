const fs = require('fs');
let file = fs.readFileSync('src/components/controls/SidebarControls.tsx', 'utf-8');

file = file.replace(/<DesignSettings[\s\S]*?\/>/, '<DesignSettings />');
file = file.replace(/<PatternSettings[\s\S]*?\/>/, '<PatternSettings />');
file = file.replace(/<AdvancedColorSettings[\s\S]*?\/>/, '<AdvancedColorSettings />');
file = file.replace(/<ImageSettings[\s\S]*?\/>/, '<ImageSettings />');

fs.writeFileSync('src/components/controls/SidebarControls.tsx', file);
console.log('done!');
