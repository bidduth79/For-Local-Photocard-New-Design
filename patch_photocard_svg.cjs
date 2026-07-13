const fs = require('fs');
const file = 'src/components/cards/Photocard.tsx';
let code = fs.readFileSync(file, 'utf8');

const target = `                const coloredSvg = decodedSvg
                  .replace(/stroke="[^"]*"/g, (match) => match.includes('none') ? match : \`stroke="\${patternColor}"\`)
                  .replace(/fill="[^"]*"/g, (match) => match.includes('none') ? match : \`fill="\${patternColor}"\`);
                coloredPattern = \`data:image/svg+xml,\${encodeURIComponent(coloredSvg)}\`;`;

const replacement = `                let coloredSvg = decodedSvg
                  .replace(/stroke="[^"]*"/g, (match) => match.includes('none') ? match : \`stroke="\${patternColor}"\`)
                  .replace(/fill="[^"]*"/g, (match) => match.includes('none') ? match : \`fill="\${patternColor}"\`);
                
                const widthMatch = coloredSvg.match(/width="([0-9.]+)"/);
                const heightMatch = coloredSvg.match(/height="([0-9.]+)"/);
                if (widthMatch && heightMatch) {
                  const w = parseFloat(widthMatch[1]);
                  const h = parseFloat(heightMatch[1]);
                  const newW = patternScale * 2;
                  const newH = h * (newW / w);
                  if (!coloredSvg.includes('viewBox')) {
                     coloredSvg = coloredSvg.replace('<svg ', \`<svg viewBox="0 0 \${w} \${h}" \`);
                  }
                  coloredSvg = coloredSvg.replace(\`width="\${widthMatch[1]}"\`, \`width="\${newW}"\`);
                  coloredSvg = coloredSvg.replace(\`height="\${heightMatch[1]}"\`, \`height="\${newH}"\`);
                }
                coloredPattern = \`data:image/svg+xml,\${encodeURIComponent(coloredSvg)}\`;`;

code = code.replace(target, replacement);

const target2 = `                  backgroundImage: \`url("\${coloredPattern}")\`,
                  backgroundSize: \`\${patternScale * 2}px \${patternScale * 2}px\`,`;

const replacement2 = `                  backgroundImage: \`url("\${coloredPattern}")\`,
                  backgroundSize: 'auto',`;

code = code.replace(target2, replacement2);

fs.writeFileSync(file, code);
