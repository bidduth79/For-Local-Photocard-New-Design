const fs = require('fs');

let file = fs.readFileSync('src/hooks/useAppState.ts', 'utf-8');

const useStateRegex = /const \[([a-zA-Z0-9_]+), set([a-zA-Z0-9_]+)\] = useState(?:<([^>]+)>)?\((.*)\);/g;

file = file.replace(useStateRegex, (match, stateVar, setterVar) => {
  return `const ${stateVar} = useAppStore(s => s.${stateVar});\n  const set${setterVar} = useAppStore(s => s.set${setterVar});`;
});

file = `import { useAppStore } from '../store/appStore';\n` + file;

// Remove the import of useState, since it's no longer used for these
file = file.replace(/useState,?\s*/, '');

fs.writeFileSync('src/hooks/useAppState.ts', file);
console.log('Done refactoring useAppState');
