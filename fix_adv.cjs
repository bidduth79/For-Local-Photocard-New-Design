const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/AdvancedColorSettings.tsx', 'utf-8');

const replacer = `export default function AdvancedColorSettings() {
  const { customDateColor, setCustomDateColor, customDateBgColor, setCustomDateBgColor, customDetailsTextColor, setCustomDetailsTextColor, customVisitTextColor, setCustomVisitTextColor, customLogoTextColor, setCustomLogoTextColor, customLogoBgColor, setCustomLogoBgColor, customQrColor, setCustomQrColor, customSocialIconColor, setCustomSocialIconColor, language, darkMode, isAdvancedColorsExpanded: isExpanded, setIsAdvancedColorsExpanded: setIsExpanded } = useAppStore(useShallow(state => ({ customDateColor: state.customDateColor, setCustomDateColor: state.setCustomDateColor, customDateBgColor: state.customDateBgColor, setCustomDateBgColor: state.setCustomDateBgColor, customDetailsTextColor: state.customDetailsTextColor, setCustomDetailsTextColor: state.setCustomDetailsTextColor, customVisitTextColor: state.customVisitTextColor, setCustomVisitTextColor: state.setCustomVisitTextColor, customLogoTextColor: state.customLogoTextColor, setCustomLogoTextColor: state.customLogoTextColor, customLogoBgColor: state.customLogoBgColor, setCustomLogoBgColor: state.customLogoBgColor, customQrColor: state.customQrColor, setCustomQrColor: state.customQrColor, customSocialIconColor: state.customSocialIconColor, setCustomSocialIconColor: state.customSocialIconColor, language: state.language, darkMode: state.darkMode, isAdvancedColorsExpanded: state.isAdvancedColorsExpanded, setIsAdvancedColorsExpanded: state.setIsAdvancedColorsExpanded })));`;

// Remove the bad header
const start = file.indexOf('export default function AdvancedColorSettings({');
const end = file.indexOf('  const resetColors = () => {');

if (start !== -1 && end !== -1) {
  file = file.substring(0, start) + replacer + '\n\n' + file.substring(end);
}

fs.writeFileSync('src/components/controls/news/AdvancedColorSettings.tsx', file);
console.log('fixed adv');
