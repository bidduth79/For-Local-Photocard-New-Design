const fs = require('fs');
const path = require('path');

const dir = 'src/components/controls/news';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match the Chevron logic
  // e.g. {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
  // e.g. {isExpanded ? ( <ChevronUp ... /> ) : ( <ChevronDown ... /> )}
  
  if (content.includes('ChevronUp') && content.includes('ChevronDown') && file !== 'ImageSettings.tsx') {
    // Basic replacement for the common ones
    content = content.replace(/{isExpanded \? <ChevronUp size={(\d+)} \/> : <ChevronDown size={\d+} \/>}/g, '<ChevronDown size={$1} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />');
    
    // For ContentEditor.tsx:
    content = content.replace(/{isExpanded \? \(\s*<ChevronUp className={darkMode \? 'text-gray-400' : 'text-gray-500'} \/>\s*\) : \(\s*<ChevronDown className={darkMode \? 'text-gray-400' : 'text-gray-500'} \/>\s*\)}/g, '<ChevronDown className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} ${darkMode ? "text-gray-400" : "text-gray-500"}`} />');

    // For WatermarkSettings.tsx:
    content = content.replace(/{isExpanded \? \(\s*<ChevronUp className={darkMode \? 'text-gray-400' : 'text-gray-500'} \/>\s*\) : \(\s*<ChevronDown className={darkMode \? 'text-gray-400' : 'text-gray-500'} \/>\s*\)}/g, '<ChevronDown className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} ${darkMode ? "text-gray-400" : "text-gray-500"}`} />');

    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
  }
}
