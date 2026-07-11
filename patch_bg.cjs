const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/cards/designs/*.tsx');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace absolute inset-0 bg-xxx with added [\.export-video_&]:!bg-transparent
    content = content.replace(/(className="[^"]*absolute inset-0[^"]*)(bg-[a-z0-9/-]+)([^"]*")/g, (match, p1, p2, p3) => {
        if (!match.includes('export-video')) {
            return `${p1}${p2} [.export-video_&]:!bg-transparent${p3}`;
        }
        return match;
    });

    // Replace relative w-full h-full ... bg-xxx
    content = content.replace(/(className="[^"]*relative w-full h-full[^"]*)(bg-[a-z0-9/-]+)([^"]*")/g, (match, p1, p2, p3) => {
        if (!match.includes('export-video')) {
            return `${p1}${p2} [.export-video_&]:!bg-transparent${p3}`;
        }
        return match;
    });

    fs.writeFileSync(file, content);
});
console.log("Patched backgrounds");
