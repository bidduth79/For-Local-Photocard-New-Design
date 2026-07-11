const fs = require('fs');
const path = require('path');

const dir = 'src/components/controls/news';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We can just find "{isExpanded && (" and replace it with:
  // <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden">
  // And find the matching )} at the end of the file.
  // Assuming each component has exactly one {isExpanded && ( block at the root level before the last </div>
  
  if (content.includes('{isExpanded && (')) {
    content = content.replace('{isExpanded && (', `<div className={\`grid transition-all duration-300 ease-in-out \${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}\`}><div className="overflow-hidden">`);
    
    // now we need to replace the last `)}` before `</div>\n  );\n};` or something similar
    // We can find the last `)}` in the file.
    let lastIndex = content.lastIndexOf(')}');
    if (lastIndex !== -1) {
      content = content.substring(0, lastIndex) + '</div></div>' + content.substring(lastIndex + 2);
    }
    
    // Also remove `animate-in slide-in-from-top-2 duration-200`
    content = content.replace('animate-in slide-in-from-top-2 duration-200', '');
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
  }
}
