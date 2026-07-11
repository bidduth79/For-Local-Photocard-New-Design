import React, { useEffect, useRef } from 'react';
import ColorThief from 'colorthief/dist/color-thief.mjs';

interface ColorExtractorProps {
  imageUrl: string;
  onColorExtracted: (color: string, rgb: [number, number, number]) => void;
}

const ColorExtractor: React.FC<ColorExtractorProps> = ({ imageUrl, onColorExtracted }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const extractColor = () => {
      if (imgRef.current && imgRef.current.complete) {
        try {
          const colorThief = new ColorThief();
          const dominantColor = colorThief.getColor(imgRef.current);
          if (dominantColor) {
            const toHex = (c: number) => {
              const hex = c.toString(16);
              return hex.length === 1 ? "0" + hex : hex;
            };
            const hexColor = "#" + toHex(dominantColor[0]) + toHex(dominantColor[1]) + toHex(dominantColor[2]);
            onColorExtracted(hexColor, dominantColor as [number, number, number]);
          }
        } catch (error) {
          console.error("Error extracting color:", error);
        }
      }
    };

    if (imageUrl) {
      const img = imgRef.current;
      if (img) {
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;
        if (img.complete) {
          extractColor();
        } else {
          img.onload = extractColor;
        }
      }
    }
  }, [imageUrl, onColorExtracted]);

  return <img ref={imgRef} alt="Color Extractor" style={{ display: 'none' }} crossOrigin="Anonymous" />;
};

export default ColorExtractor;
