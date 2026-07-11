const fs = require('fs');

const filesToRefactor = [
  'src/components/controls/news/DesignSettings.tsx',
  'src/components/controls/news/PatternSettings.tsx',
  'src/components/controls/news/AdvancedColorSettings.tsx',
  'src/components/controls/news/ImageSettings.tsx'
];

for (const path of filesToRefactor) {
  let file = fs.readFileSync(path, 'utf-8');
  
  const regex = /const ([a-zA-Z]+): React\.FC(?:<[a-zA-Z]+Props>)? = \(\{([\s\S]*?)\}\) => \{/;
  const match = file.match(regex);
  if (!match) continue;
  
  const compName = match[1];
  let propsRaw = match[2];
  
  // Clean up props mapping
  if (compName === 'DesignSettings') {
    propsRaw = propsRaw.replace('isExpanded,', 'isDesignSettingsExpanded: isExpanded,');
    propsRaw = propsRaw.replace('setIsExpanded,', 'setIsDesignSettingsExpanded: setIsExpanded,');
    propsRaw = propsRaw.replace(/setThemeColor,[\s\S]*?setCardGradientEnd,/, 'setThemeColor, setGradientStart, setGradientEnd, setCardGradientStart, setCardGradientEnd,');
  } else if (compName === 'PatternSettings') {
    propsRaw = propsRaw.replace('isExpanded,', 'isPatternSettingsExpanded: isExpanded,');
    propsRaw = propsRaw.replace('setIsExpanded,', 'setIsPatternSettingsExpanded: setIsExpanded,');
  } else if (compName === 'AdvancedColorSettings') {
    propsRaw = propsRaw.replace('isExpanded,', 'isAdvancedColorsExpanded: isExpanded,');
    propsRaw = propsRaw.replace('setIsExpanded,', 'setIsAdvancedColorsExpanded: setIsExpanded,');
  } else if (compName === 'ImageSettings') {
    propsRaw = propsRaw.replace('isExpanded,', ''); // Or whatever ImageSettings uses
    propsRaw = propsRaw.replace('setIsExpanded,', '');
  }

  // Extract keys to useShallow
  const propList = propsRaw.split(',').map(p => {
    p = p.trim();
    if (!p) return null;
    if (p.includes(':')) {
       return { storeName: p.split(':')[0].trim(), localName: p.split(':')[1].trim() };
    }
    return { storeName: p, localName: p };
  }).filter(Boolean);

  let selector = `useShallow(state => ({\n`;
  propList.forEach(p => {
    selector += `    ${p.storeName}: state.${p.storeName},\n`;
  });
  selector += `  }))`;

  let destructure = `const { \n`;
  propList.forEach(p => {
    if (p.storeName !== p.localName) {
      destructure += `    ${p.storeName}: ${p.localName},\n`;
    } else {
      destructure += `    ${p.storeName},\n`;
    }
  });
  destructure += `  } = useAppStore(${selector});`;

  let newComp = `import { useAppStore } from '../../../store/appStore';\nimport { useAppContext } from '../../../context/AppContext';\nimport { useShallow } from 'zustand/react/shallow';\n\nconst ${compName}: React.FC = () => {\n  ${destructure}\n`;

  if (compName === 'DesignSettings') {
    newComp += `
  const originalSetThemeColor = setThemeColor;
  setThemeColor = (c: string) => { originalSetThemeColor(c); useAppStore.getState().setAutoColorMode(false); };
  const originalSetGradientStart = setGradientStart;
  setGradientStart = (c: string) => { originalSetGradientStart(c); useAppStore.getState().setAutoColorMode(false); };
  const originalSetGradientEnd = setGradientEnd;
  setGradientEnd = (c: string) => { originalSetGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };
  const originalSetCardGradientStart = setCardGradientStart;
  setCardGradientStart = (c: string) => { originalSetCardGradientStart(c); useAppStore.getState().setAutoColorMode(false); };
  const originalSetCardGradientEnd = setCardGradientEnd;
  setCardGradientEnd = (c: string) => { originalSetCardGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };
`;
  }
  
  if (compName === 'ImageSettings') {
     newComp += `\n  const { handleImageUpload, fileInputRef, fileInputRef2 } = useAppContext();\n`;
  }

  // Replace interface and component definition
  file = file.replace(/interface [a-zA-Z]+Props \{[\s\S]*?\}/, '');
  file = file.replace(regex, newComp);

  fs.writeFileSync(path, file);
}
console.log('done!');
