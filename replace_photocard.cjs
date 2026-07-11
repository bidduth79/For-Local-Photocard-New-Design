const fs = require('fs');

let file = fs.readFileSync('src/components/cards/Photocard.tsx', 'utf-8');

file = file.replace(/import \{ Design\d+ \} from "\.\/designs\/Design\d+";\n/g, '');

const lazyImports = [];
for (let i = 0; i <= 21; i++) {
  lazyImports.push(`const Design${i} = React.lazy(() => import('./designs/Design${i}').then(module => ({ default: module.Design${i} })));`);
}

file = file.replace(/import \{ NewsDesignProps \} from "\.\/designs\/types";/, `import { NewsDesignProps } from "./designs/types";\n\n${lazyImports.join('\n')}`);

file = file.replace(/\{renderDesign\(\)\}/, `<React.Suspense fallback={<div className="w-full h-full flex items-center justify-center min-h-[400px]"></div>}>\n          {renderDesign()}\n        </React.Suspense>`);

fs.writeFileSync('src/components/cards/Photocard.tsx', file);
console.log('Replaced imports in Photocard');
