const fs = require('fs');
const file = fs.readFileSync('src/hooks/useAppState.ts', 'utf-8');

const lines = file.split('\n');
const functionLines = lines.filter(line => line.includes('const ') && !line.includes('useState'));
console.log(functionLines.join('\n'));
