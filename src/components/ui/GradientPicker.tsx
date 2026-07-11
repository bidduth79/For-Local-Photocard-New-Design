import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const modernGradients = [
  { start: '#ff7e5f', end: '#feb47b' },
  { start: '#868f96', end: '#596164' },
  { start: '#09203f', end: '#537895' },
  { start: '#29323c', end: '#485563' },
  { start: '#ff6e7f', end: '#bfe9ff' },
  { start: '#588be5', end: '#3ac5ce' },
  { start: '#00c6ff', end: '#0072ff' },
  { start: '#f77062', end: '#fe5196' },
  { start: '#a18cd1', end: '#fbc2eb' },
  { start: '#ff9a9e', end: '#fecfef' },
  { start: '#f6d365', end: '#fda085' },
  { start: '#84fab0', end: '#8fd3f4' },
  { start: '#a1c4fd', end: '#c2e9fb' },
  { start: '#ffecd2', end: '#fcb69f' },
  { start: '#cfd9df', end: '#e2ebf0' },
  { start: '#a8edea', end: '#fed6e3' },
  { start: '#f5f7fa', end: '#c3cfe2' },
  { start: '#e0c3fc', end: '#8ec5fc' },
  { start: '#f093fb', end: '#f5576c' },
  { start: '#4facfe', end: '#00f2fe' },
  { start: '#43e97b', end: '#38f9d7' },
  { start: '#fa709a', end: '#fee140' },
  { start: '#30cfd0', end: '#330867' },
  { start: '#a8caba', end: '#5d4157' },
  { start: '#2af598', end: '#009efd' },
  { start: '#cd9cf2', end: '#f6f3ff' },
  { start: '#e6e9f0', end: '#eef1f5' },
  { start: '#accbee', end: '#e7f0fd' },
  { start: '#d5dee7', end: '#ffafbd' },
  { start: '#c1dfc4', end: '#deecdd' },
  { start: '#0ba360', end: '#3cba92' },
  { start: '#00c6fb', end: '#005bea' },
  { start: '#74ebd5', end: '#9face6' },
  { start: '#6a11cb', end: '#2575fc' },
  { start: '#ee9ca7', end: '#ffdde1' },
  { start: '#ff0844', end: '#ffb199' },
  { start: '#fccb90', end: '#d57eeb' },
  { start: '#8e2de2', end: '#4a00e0' },
  { start: '#11998e', end: '#38ef7d' },
  { start: '#fc4a1a', end: '#f7b733' },
  { start: '#108dc7', end: '#ef8e38' },
  { start: '#fc00ff', end: '#00dbde' },
  { start: '#00b09b', end: '#96c93d' },
  { start: '#800080', end: '#ffc0cb' },
  { start: '#ff4e50', end: '#f9d423' },
  { start: '#000000', end: '#434343' },
  { start: '#141e30', end: '#243b55' },
  { start: '#ed4264', end: '#ffedbc' },
  { start: '#2b5876', end: '#4e4376' },
  { start: '#ff9966', end: '#ff5e62' },
  { start: '#aa076b', end: '#61045f' },
  { start: '#0093E9', end: '#80D0C7' },
  { start: '#8EC5FC', end: '#E0C3FC' },
  { start: '#D9AFD9', end: '#97D9E1' },
  { start: '#00DBDE', end: '#FC00FF' },
  { start: '#50CC7F', end: '#F5D100' },
  { start: '#FBC2EB', end: '#A6C1EE' },
  { start: '#764BA2', end: '#667EEA' },
  { start: '#FDFBFB', end: '#EBEDEE' },
  { start: '#E2D1C3', end: '#FDFCFB' },
  { start: '#89F7FE', end: '#66A6FF' },
  { start: '#96E6A1', end: '#D4FC79' },
  { start: '#667EEA', end: '#764BA2' },
  { start: '#B224EF', end: '#7579FF' },
  { start: '#4A00E0', end: '#8E2DE2' },
  { start: '#F5576C', end: '#F093FB' },
  { start: '#5D4157', end: '#A8CABA' },
  { start: '#E6E9F0', end: '#EEF1F5' },
  { start: '#E7F0FD', end: '#ACCBEE' },
  { start: '#DEECDD', end: '#C1DFC4' },
  { start: '#3CBA92', end: '#0BA360' },
  { start: '#005BEA', end: '#00C6FB' },
  { start: '#9FACE6', end: '#74EBD5' },
  { start: '#2575FC', end: '#6A11CB' },
  { start: '#FFDDE1', end: '#EE9CA7' },
  { start: '#D57EEB', end: '#FCCB90' },
  { start: '#38EF7D', end: '#11998E' },
  { start: '#F7B733', end: '#FC4A1A' },
  { start: '#EF8E38', end: '#108DC7' },
  { start: '#96C93D', end: '#00B09B' },
  { start: '#FFC0CB', end: '#800080' },
  { start: '#F9D423', end: '#FF4E50' },
  { start: '#434343', end: '#000000' },
  { start: '#243B55', end: '#141E30' },
  { start: '#FFEDBC', end: '#ED4264' },
  { start: '#4E4376', end: '#2B5876' },
  { start: '#FF5E62', end: '#FF9966' },
  { start: '#61045F', end: '#AA076B' },
  { start: '#F12711', end: '#F5AF19' },
  { start: '#654EA3', end: '#EA8D8D' },
  { start: '#1D976C', end: '#93F9B9' },
  { start: '#FF416C', end: '#FF4B2B' },
  { start: '#00B4DB', end: '#0083B0' },
  { start: '#7B4397', end: '#DC2430' },
  { start: '#43CEA2', end: '#185A9D' },
  { start: '#BA5370', end: '#F4E2D8' },
  { start: '#FF512F', end: '#DD2476' },
  { start: '#4568DC', end: '#B06AB3' },
  { start: '#FF512F', end: '#F09819' },
  { start: '#1A2A6C', end: '#B21F1F' },
  { start: '#3A1C71', end: '#D76D77' },
  { start: '#283C86', end: '#45A247' },
  { start: '#159957', end: '#155799' },
  { start: '#C33764', end: '#1D2671' },
  { start: '#348F50', end: '#56B4D3' },
  { start: '#B9935A', end: '#E7C9A5' },
  { start: '#2BC0E4', end: '#EAECC6' },
  { start: '#085078', end: '#85D8CE' },
  { start: '#134E5E', end: '#71B280' },
  { start: '#5C258D', end: '#4389A2' },
  { start: '#4776E6', end: '#8E54E9' },
  { start: '#000000', end: '#53346D' },
  { start: '#FF8008', end: '#FFC837' },
  { start: '#1D4350', end: '#A43931' },
  { start: '#1F1C2C', end: '#928DAB' },
  { start: '#000000', end: '#0F9B0F' },
  { start: '#1A2980', end: '#26D0CE' },
  { start: '#314755', end: '#26A0DA' },
  { start: '#2B32B2', end: '#1488CC' },
  { start: '#CC2B5E', end: '#753A88' },
  { start: '#2193B0', end: '#6DD5ED' },
  { start: '#EC008C', end: '#FC6767' },
  { start: '#0B486B', end: '#F56217' },
  { start: '#E55D87', end: '#5FC3E4' },
  { start: '#000000', end: '#E74C3C' },
  { start: '#2C3E50', end: '#FD746C' },
  { start: '#403B4A', end: '#E7E9BB' },
  { start: '#F953C6', end: '#B91D73' },
  { start: '#8A2387', end: '#E94057' },
  { start: '#0F2027', end: '#203A43' },
  { start: '#C04848', end: '#480048' },
  { start: '#5F2C82', end: '#49A09D' },
  { start: '#232526', end: '#414345' },
  { start: '#16222A', end: '#3A6073' },
  { start: '#191654', end: '#43C6AC' },
  { start: '#136A8A', end: '#267871' },
  { start: '#808080', end: '#3FADA8' },
  { start: '#000000', end: '#3FADA8' },
  { start: '#D66D75', end: '#E29587' },
  { start: '#30E8BF', end: '#FF8235' },
  { start: '#B24592', end: '#F15F79' },
  { start: '#C02425', end: '#F0CB35' },
  { start: '#E8CBC0', end: '#636FA4' },
  { start: '#1C92D2', end: '#F2FCFE' },
  { start: '#0f2027', end: '#203a43' },
  { start: '#2c5364', end: '#0f2027' },
  { start: '#000428', end: '#004e92' },
  { start: '#000000', end: '#130f40' },
  { start: '#2c3e50', end: '#000000' },
  { start: '#870000', end: '#190a05' },
  { start: '#2a0845', end: '#6441a5' },
  { start: '#000000', end: '#3f4c6b' },
  { start: '#0b132b', end: '#1c2541' },
  { start: '#190a05', end: '#870000' },
  { start: '#000000', end: '#0f2027' },
  { start: '#111111', end: '#222222' },
  { start: '#1e130c', end: '#9a8478' },
  { start: '#000000', end: '#4b134f' },
  { start: '#001510', end: '#00bf8f' },
  { start: '#141517', end: '#2b2e33' },
  { start: '#0d0d0d', end: '#1a1a1a' },
  { start: '#1a0b2e', end: '#4b1d52' },
  { start: '#001a00', end: '#004d00' },
  { start: '#330000', end: '#660000' },
  { start: '#000033', end: '#000066' },
  { start: '#1a1a1a', end: '#333333' },
  { start: '#2b0f4c', end: '#150726' },
  { start: '#051937', end: '#004d7a' },
  { start: '#4a0000', end: '#240000' },
  { start: '#002615', end: '#000000' },
  { start: '#220033', end: '#000000' },
  { start: '#0f0c29', end: '#302b63' },
  { start: '#24243e', end: '#0f0c29' },
  { start: '#1a1a2e', end: '#16213e' },
  { start: '#0f3460', end: '#1a1a2e' },
  { start: '#222831', end: '#393e46' },
  { start: '#121212', end: '#282828' },
  { start: '#000000', end: '#000000' },
  { start: '#FFFFFF', end: '#FFFFFF' },
];

interface GradientPickerProps {
  startColor: string;
  endColor: string;
  onChange: (start: string, end: string) => void;
  darkMode: boolean;
  language: 'bn' | 'en';
  label: string;
}

export const GradientPicker: React.FC<GradientPickerProps> = ({
  startColor,
  endColor,
  onChange,
  darkMode,
  language,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleOpen = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      if (rect.bottom > window.innerHeight / 2) {
        setOpenUpwards(true);
      } else {
        setOpenUpwards(false);
      }
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <button
        ref={buttonRef}
        onClick={toggleOpen}
        className={`w-full h-10 rounded-lg border flex items-center justify-between px-3 transition-colors ${
          darkMode ? 'border-slate-600 bg-slate-700 hover:bg-slate-600' : 'border-gray-300 bg-white hover:bg-gray-50'
        }`}
      >
        <div 
          className="w-full h-6 rounded-md mr-2" 
          style={{ background: `linear-gradient(to right, ${startColor}, ${endColor})` }}
        />
        <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 w-64 p-3 ${openUpwards ? 'bottom-full mb-1' : 'top-full mt-1'} rounded-xl shadow-xl border max-h-80 overflow-y-auto ${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        }`}>
          <div className="mb-3">
            <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === 'bn' ? 'কাস্টম কালার' : 'Custom Colors'}
            </p>
            <div className="flex gap-2">
              <input
                type="color"
                value={startColor}
                onChange={(e) => onChange(e.target.value, endColor)}
                className="h-8 w-full rounded cursor-pointer border-0 p-0"
                title={language === 'bn' ? 'শুরু' : 'Start'}
              />
              <input
                type="color"
                value={endColor}
                onChange={(e) => onChange(startColor, e.target.value)}
                className="h-8 w-full rounded cursor-pointer border-0 p-0"
                title={language === 'bn' ? 'শেষ' : 'End'}
              />
            </div>
          </div>
          
          <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {language === 'bn' ? 'আধুনিক প্যালেট' : 'Modern Palettes'}
          </p>
          <div className="grid grid-cols-8 gap-1">
            {modernGradients.map((grad, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onChange(grad.start, grad.end);
                  setIsOpen(false);
                }}
                className={`h-5 rounded-md border transition-transform hover:scale-110 ${
                  startColor === grad.start && endColor === grad.end
                    ? 'ring-2 ring-offset-1 ring-[#5934e8]'
                    : 'border-transparent'
                }`}
                style={{ background: `linear-gradient(to right, ${grad.start}, ${grad.end})` }}
                title={`${grad.start} → ${grad.end}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
