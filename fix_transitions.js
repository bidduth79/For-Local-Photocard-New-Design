const fs = require('fs');
const path = require('path');

const dir = 'src/components/controls/news';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace {isExpanded && ( <div className="..."> ... </div> )}
  // with <div className="grid transition-all duration-300 ease-in-out..." ><div className="overflow-hidden"><div className="...">...</div></div></div>
  
  if (content.includes('{isExpanded && (')) {
    // Find {isExpanded && (
    const startIndex = content.indexOf('{isExpanded && (');
    const divStartIndex = content.indexOf('<div', startIndex);
    const divEndIndex = content.indexOf('>', divStartIndex);
    
    // We need to find the matching ')}' for {isExpanded && (
    // Instead of parsing, we can just replace the start and then the last )} before the end of the main div?
    // Let's use a regex that matches {isExpanded && ( and the first <div ...> 
    
    // Actually, we can just use string replacement if we do it carefully.
  }
}
