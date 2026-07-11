const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/PatternSettings.tsx', 'utf-8');

file = file.replace(/const PatternSettings: React\.FC = \(\) => \{/, 'const PatternSettings: React.FC = () => {\n  const { randomizeGeometricShapes, resetGeometricShapes } = useAppContext();');

file = file.replace(/randomizeGeometricShapes: state.randomizeGeometricShapes,\n/g, '');
file = file.replace(/resetGeometricShapes: state.resetGeometricShapes,\n/g, '');
file = file.replace(/randomizeGeometricShapes,\n/g, '');
file = file.replace(/resetGeometricShapes,\n/g, '');

fs.writeFileSync('src/components/controls/news/PatternSettings.tsx', file);
console.log('fixed pattern');
