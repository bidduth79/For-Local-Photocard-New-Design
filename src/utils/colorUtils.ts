export const getContrastColor = (hexColor?: string, defaultColor: string = '#111827'): string => {
  if (!hexColor) return defaultColor;
  
  // Remove hash if present
  const hex = hexColor.replace('#', '');
  
  // If it's not a valid hex, return default
  if (hex.length !== 3 && hex.length !== 6 && hex.length !== 8) return defaultColor;
  
  // Convert 3-char hex to 6-char
  const fullHex = hex.length === 3 
    ? hex.split('').map(c => c + c).join('') 
    : hex.substring(0, 6); // Ignore alpha channel if 8 chars
    
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);
  
  // Calculate luminance (YIQ formula)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
  // Return white for dark backgrounds, dark gray for light backgrounds
  return (yiq >= 128) ? '#111827' : '#FFFFFF';
};
