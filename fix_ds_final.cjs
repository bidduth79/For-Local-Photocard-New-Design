const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/DesignSettings.tsx', 'utf-8');

// The file should start with imports. Let's find `import React`
const reactImportIdx = file.lastIndexOf("import React"); // It might be duplicate
const lucideImportIdx = file.indexOf("import { Layout");
const startOfImports = lucideImportIdx !== -1 ? file.lastIndexOf("import React", lucideImportIdx) : reactImportIdx;

let content = file.substring(startOfImports);
// content now starts with `import React`

// Now let's remove any nested `const DesignSettings: React.FC = () => {`
// Let's just find the last one.
const lastCompIdx = content.lastIndexOf("const DesignSettings: React.FC = () => {");
if (lastCompIdx !== -1 && lastCompIdx !== content.indexOf("const DesignSettings: React.FC = () => {")) {
  content = content.substring(0, content.indexOf("const DesignSettings: React.FC = () => {")) + content.substring(lastCompIdx);
}

// Ensure the imports are clean
content = `import React, { useRef, useState } from 'react';
import { Layout, ChevronDown, ChevronUp, MoveVertical, Upload, Type, Image as ImageIcon, X } from 'lucide-react';
import { useFonts } from '../../../hooks/useFonts';
import { FontDropdown } from '../../ui/FontDropdown';
import { GradientPicker } from '../../ui/GradientPicker';
import { defaultFonts } from '../../../data/fonts';
import { showToast } from '../../../utils/toast';
import { useAppStore } from '../../../store/appStore';
import { useAppContext } from '../../../context/AppContext';
import { useShallow } from 'zustand/react/shallow';

` + content.substring(content.indexOf("const DesignSettings: React.FC = () => {"));

fs.writeFileSync('src/components/controls/news/DesignSettings.tsx', content);
console.log('fixed imports and duplicates');
