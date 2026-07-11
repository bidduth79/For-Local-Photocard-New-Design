const fs = require('fs');

const file = fs.readFileSync('src/hooks/useAppState.ts', 'utf-8');

const useStateRegex = /const \[([a-zA-Z0-9_]+), set([a-zA-Z0-9_]+)\] = useState(?:<([^>]+)>)?\((.*)\);/g;

let match;
let stateProps = [];
let actionProps = [];

while ((match = useStateRegex.exec(file)) !== null) {
  const [_, stateVar, setterVar, type, initialValue] = match;
  
  let resolvedType = type;
  if (!resolvedType) {
    if (initialValue.startsWith('"') || initialValue.startsWith("'") || initialValue.startsWith('\`')) {
      resolvedType = 'string';
    } else if (initialValue === 'true' || initialValue === 'false') {
      resolvedType = 'boolean';
    } else if (!isNaN(Number(initialValue))) {
      resolvedType = 'number';
    } else if (initialValue.startsWith('new Date()')) {
      resolvedType = 'Date';
    } else if (initialValue.startsWith('[]')) {
      resolvedType = 'any[]';
    } else {
      resolvedType = 'any';
    }
  }

  stateProps.push(`  ${stateVar}: ${resolvedType};`);
  actionProps.push(`  set${setterVar}: (val: ${resolvedType}) => void;`);
}

let storeInterface = `export interface AppState {\n${stateProps.join('\n')}\n${actionProps.join('\n')}\n}`;

let storeImplementation = `import { create } from 'zustand';

export const useAppStore = create<AppState>((set) => ({
`;

useStateRegex.lastIndex = 0;
while ((match = useStateRegex.exec(file)) !== null) {
  const [_, stateVar, setterVar, type, initialValue] = match;
  storeImplementation += `  ${stateVar}: ${initialValue},\n`;
  storeImplementation += `  set${setterVar}: (val) => set({ ${stateVar}: val }),\n`;
}

storeImplementation += `}));`;

fs.writeFileSync('src/store/appStore.ts', storeInterface + '\n\n' + storeImplementation);
console.log('Done!');
