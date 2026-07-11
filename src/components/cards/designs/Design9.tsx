import React from 'react';
import { NewsDesignProps } from './types';
import { GeometricOverlay } from './GeometricOverlays';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design9: React.FC<NewsDesignProps> = ({
  formattedDate,
  themeColor,
  customLogo,
  fullBrandLogo,
  fullBrandLogoHeight,
  brandName,
  brandColor,
  headlineColor,
  website,
  renderFormattedTitle,
  renderImage,
  brandStyle,
  headlineStyle,
  brandFontSize,
  renderBackgroundPattern,
  showGeometricShapes,
  showDetailedNewsBox,
  geometricShapeColor,
  geometricShapeOpacity,
  customDateColor,
  customDateBgColor,
  customDetailsTextColor,
  customVisitTextColor,
  customLogoTextColor,
  customLogoBgColor,
  customQrColor,
  customSocialIconColor,
  overlayOpacity
}) => {
  const bottomBgColor = '#00141e'; // rgba(0,20,30,0.95)
  const bottomContrastColor = getContrastColor(bottomBgColor);
  const brandBoxContrastColor = getContrastColor('#000000');

  return (
    <>
      {/* Background Pattern Layer */}
      {renderBackgroundPattern()}
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {renderImage("w-full h-full object-cover")}
        {showGeometricShapes && (
          <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
        )}
      </div>
      
      {/* Dark Gradient Overlay */}
      {overlayOpacity !== 0 && (
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, rgba(0,20,30,0.6) 40%, rgba(0,20,30,0.95) 100%)`
          }}
        />
      )}

      {/* Top Left Date */}
      <div className="absolute top-0 left-16 h-[116px] flex items-center z-20 pointer-events-none">
        <span className="text-3xl font-bold px-4 py-2 rounded-full" style={{ color: customDateColor || brandColor || '#ffffff', textShadow: '2px 2px 8px rgba(0,0,0,0.8)', backgroundColor: customDateBgColor || 'transparent' }}>{formattedDate}</span>
      </div>

      {/* Top Right Ribbon */}
      <div 
        className="absolute top-0 right-16 w-28 h-48 rounded-b-[3rem] shadow-2xl flex items-end justify-center pb-6 z-20 pointer-events-none" 
        style={{ backgroundColor: themeColor }}
      >
        <div 
          className="rounded-full flex items-center justify-center p-2 shadow-lg border-2 border-white"
          style={{ width: `${(brandFontSize || 40) * 1.5}px`, height: `${(brandFontSize || 40) * 1.5}px`, backgroundColor: customLogoBgColor || 'white' }}
        >
          {customLogo ? (
            <img src={customLogo} alt="Logo" className="w-full h-full object-contain drop-shadow-md" />
          ) : (
            <span className="font-bold drop-shadow-md" style={{ color: customLogoTextColor || themeColor, fontSize: `${(brandFontSize || 40) * 0.8}px` }}>{brandName ? brandName.charAt(0).toUpperCase() : ''}</span>
          )}
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center px-16 z-20 pointer-events-auto max-h-[60%] overflow-hidden">
        {/* Brand Box or Full Logo */}
        {fullBrandLogo ? (
          <div className="mb-0 -mt-4 relative shrink-0">
            <img 
              src={fullBrandLogo} 
              alt="Full Logo" 
              className="object-contain drop-shadow-md relative z-10" 
              style={{ height: `${fullBrandLogoHeight || 150}px` }}
            />
          </div>
        ) : (
          <div className="bg-black px-12 py-5 mb-0 -mt-1 shadow-2xl relative shrink-0">
            <div className="absolute inset-2 border-[3px] border-white pointer-events-none"></div>
            <span className="text-5xl font-bold tracking-wide drop-shadow-md relative z-10" style={{ ...brandStyle, color: brandColor || brandBoxContrastColor }}>{brandName}</span>
          </div>
        )}

        {/* Headline */}
        <div className={`w-full overflow-hidden flex items-center justify-center ${fullBrandLogo ? '-mt-10' : 'mt-2'}`}>
          <h2 
            className="leading-[1.4] font-black w-full drop-shadow-xl line-clamp-4 text-center"
            style={{ ...headlineStyle, color: headlineColor || bottomContrastColor }}
          >
            {renderFormattedTitle()}
          </h2>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-3 my-6 pointer-events-none shrink-0">
          <div className="h-[2px] w-16" style={{ backgroundColor: themeColor }}></div>
          <div className="w-3 h-3 rotate-45" style={{ backgroundColor: themeColor }}></div>
          <div className="h-[2px] w-16" style={{ backgroundColor: themeColor }}></div>
        </div>

        {/* Footer */}
        <div className="text-3xl font-bold tracking-wide drop-shadow-md pointer-events-none shrink-0" style={{ color: customDetailsTextColor || bottomContrastColor }}>
          {website || "বিস্তারিত কমেন্টে"}
        </div>
      </div>
    </>
  );
};
