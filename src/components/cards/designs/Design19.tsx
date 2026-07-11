import React from 'react';
import { NewsDesignProps } from './types';
import { getContrastColor } from '../../../utils/colorUtils';
import { QRCodeSVG } from 'qrcode.react';

export const Design19: React.FC<NewsDesignProps> = ({
  themeColor,
  customLogo,
  fullBrandLogo,
  fullBrandLogoHeight,
  brandName,
  website,
  brandStyle,
  brandColor,
  headlineColor,
  headlineFontSize,
  formattedDate,
  renderFormattedTitle,
  headlineStyle,
  brandFontSize,
  description,
  descriptionFontSize,
  descriptionColor,
  descriptionTextAlign,
  image,
  showSocialIcons,
  hashtag,
  qrValue,
  renderImage,
  customDateColor,
  customDateBgColor,
  customDetailsTextColor,
  customVisitTextColor,
  customLogoTextColor,
  customLogoBgColor,
  customQrColor,
  overlayOpacity
}) => {
  const bgContrastColor = getContrastColor(themeColor);
  
  return (
    <div 
      className="relative w-full h-full flex-1 min-h-0 overflow-hidden bg-black [.export-video_&]:!bg-transparent"
    >
      {/* Fullscreen Background Image with Zoom/Pan Support */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {image ? (
          renderImage("w-full h-full object-cover")
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center border-2 border-dashed border-white/20">
            <span className="text-white/40 font-medium text-2xl">Upload an image</span>
          </div>
        )}
      </div>

      {/* Gradient Overlay for Text Readability */}
      {overlayOpacity !== 0 && (
        <div className="absolute inset-0 z-10 bg-gradient-to-t [.export-video_&]:!bg-transparent from-black/90 via-black/40 to-transparent pointer-events-none" />
      )}

      {/* Logo Overlay */}
      <div className="absolute top-0 left-16 right-16 h-[116px] flex items-center justify-between pointer-events-none z-40">
        <div className="flex items-center justify-start gap-3">
          {fullBrandLogo ? (
            <img 
              src={fullBrandLogo} 
              alt="Full Logo" 
              className="object-contain shrink-0 drop-shadow-md" 
              style={{ height: `${fullBrandLogoHeight || 150}px` }}
            />
          ) : (
            <>
              {customLogo ? (
                <img 
                  src={customLogo} 
                  alt="Brand" 
                  className="object-contain shrink-0 drop-shadow-lg" 
                  style={{ height: `${(brandFontSize || 40) * 1.5}px` }}
                />
              ) : (
                <div 
                  className="rounded-full flex items-center justify-center shadow-lg shrink-0 border-2 border-white" 
                  style={{ 
                    backgroundColor: customLogoBgColor || themeColor,
                    width: `${(brandFontSize || 40) * 1.5}px`,
                    height: `${(brandFontSize || 40) * 1.5}px`
                  }}
                >
                  <span className="font-bold drop-shadow-md" style={{ fontSize: `${(brandFontSize || 40) * 0.8}px`, color: customLogoTextColor || 'white' }}>
                    {brandName ? brandName.charAt(0).toUpperCase() : ''}
                  </span>
                </div>
              )}
              <h1 className="font-bold whitespace-nowrap leading-normal drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{ ...brandStyle, color: brandColor || '#ffffff', fontSize: `${brandFontSize || 40}px` }}>{brandName}</h1>
            </>
          )}
        </div>
        <div className="flex items-center">
          <span className="font-bold text-xl px-4 py-2 rounded-lg shadow-sm" style={{ backgroundColor: customDateBgColor || themeColor, color: customDateColor || bgContrastColor }}>
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Content Area (Expands Upwards) */}
      <div className="absolute inset-x-10 bottom-32 top-[116px] z-20 flex flex-col justify-end pointer-events-none pb-6">
        <div className="w-full text-center">
          <h1 
            className="font-black leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            style={{ 
              color: headlineColor || '#ffffff',
              fontSize: `${headlineFontSize || 100}px`,
              textShadow: `3px 3px 0 ${themeColor}, -3px -3px 0 ${themeColor}, 3px -3px 0 ${themeColor}, -3px 3px 0 ${themeColor}, 0 8px 15px rgba(0,0,0,0.6)`,
              ...headlineStyle,
              textAlign: 'center',
              lineHeight: '1.1'
            }}
          >
            {renderFormattedTitle()}
          </h1>
        </div>
      </div>

      {/* Footer Area */}
      <div className="absolute bottom-0 left-0 right-0 h-28 w-full flex items-center justify-between px-16 pointer-events-auto shrink-0 z-40" style={{ backgroundColor: themeColor, color: bgContrastColor }}>
         <div className="flex items-center gap-4">
            <div className="bg-white p-1.5 rounded flex items-center gap-2">
               <span className="text-sm font-bold px-2 text-gray-800">স্ক্যান করুন</span>
               <QRCodeSVG value={qrValue} size={60} level="M" fgColor={customQrColor || "#000000"} />
            </div>
            <div className="flex flex-col justify-center">
               <span className="text-sm font-medium" style={{ opacity: 0.9, color: customVisitTextColor || bgContrastColor }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
               <span className="text-2xl font-bold" style={{ color: customVisitTextColor || bgContrastColor }}>{website}</span>
            </div>
         </div>
         <div className="text-2xl font-bold flex items-center h-full" style={{ color: customDetailsTextColor || bgContrastColor }}>বিস্তারিত কমেন্টে</div>
      </div>
    </div>
  );
};
