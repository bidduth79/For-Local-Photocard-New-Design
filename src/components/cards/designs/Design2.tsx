import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { NewsDesignProps } from './types';
import { GeometricOverlay } from './GeometricOverlays';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design2: React.FC<NewsDesignProps> = ({
  formattedDate,
  themeColor,
  customLogo,
  fullBrandLogo,
  fullBrandLogoHeight,
  brandName,
  website,
  qrValue,
  gradientStart,
  gradientEnd,
  renderFormattedTitle,
  renderImage,
  renderBackgroundPattern,
  FloralPattern,
  brandStyle,
  headlineStyle,
  brandFontSize,
  brandColor,
  headlineColor,
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
  customSocialIconColor
}) => {
  const themeContrastColor = getContrastColor(themeColor);
  const headlineBgColor = gradientStart || '#e5e7eb';
  const headlineContrastColor = getContrastColor(headlineBgColor);
  const logoBoxContrastColor = getContrastColor('#ffffff'); // white/30 backdrop

  return (
    <>
      <div className="absolute inset-0 bg-white [.export-video_&]:!bg-transparent [&.export-video]:!bg-transparent z-0">
      </div>

      <div className="relative z-20 w-full h-full flex-1 min-h-0 flex flex-col pointer-events-none">
        {/* Image Top Full Width */}
        <div className="w-full flex-1 min-h-[40%] relative bg-gray-200 overflow-hidden pointer-events-auto z-20">
           {renderImage("w-full h-[150%] object-cover -mt-[10%]")}
            {/* Logo Overlay */}
            <div className="absolute top-0 left-16 right-16 h-[116px] flex items-center justify-start gap-3 pointer-events-none z-40">
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
                      <h1 className="font-bold whitespace-nowrap leading-normal drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{ ...brandStyle, color: brandColor || logoBoxContrastColor }}>{brandName}</h1>
                  </>
                )}
            </div>
        </div>

        {/* Date Banner */}
        <div className="w-full py-4 flex justify-center relative -mt-8 z-40 shrink-0">
           <div className="px-10 py-3 rounded-full text-2xl font-bold shadow-lg border-4 border-white" style={{ backgroundColor: customDateBgColor || themeColor, color: customDateColor || themeContrastColor }}>
              {formattedDate}
           </div>
        </div>

        {/* Headline Area */}
        <div 
          className="flex-1 min-h-[30%] px-16 flex items-center justify-center pointer-events-auto relative z-20"
          style={{ background: gradientStart ? `linear-gradient(to bottom, ${gradientStart}, ${gradientEnd || gradientStart})` : 'linear-gradient(to bottom, #e5e7eb, #9ca3af)' }}
        >
           {renderBackgroundPattern()}
           <h2 
            className="leading-[1.2] font-bold line-clamp-4 relative z-40 w-full"
            style={{ ...headlineStyle, color: headlineColor || headlineContrastColor }}
           >
            {renderFormattedTitle()}
          </h2>
        </div>

        {/* Footer */}
        <div className="h-28 w-full flex items-center justify-between px-16 pointer-events-auto shrink-0 relative z-20" style={{ backgroundColor: themeColor, color: themeContrastColor }}>
           <div className="flex items-center gap-4">
              <div className="bg-white p-1.5 rounded flex items-center gap-2">
                 <span className="text-sm font-bold px-2 text-gray-800">স্ক্যান করুন</span>
                 <QRCodeSVG value={qrValue} size={60} level="M" fgColor={customQrColor || "#000000"} />
              </div>
              <div className="flex flex-col justify-center">
                 <span className="text-sm font-medium" style={{ opacity: customVisitTextColor ? 1 : 0.9, color: customVisitTextColor || themeContrastColor }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
                 <span className="text-2xl font-bold" style={{ color: customVisitTextColor || themeContrastColor }}>{website}</span>
              </div>
           </div>
           <div className="text-2xl font-bold flex items-center h-full" style={{ color: customDetailsTextColor || themeContrastColor }}>বিস্তারিত কমেন্টে</div>
        </div>
      </div>

      {/* Geometric Overlays - Moved to middle layer (above image/backgrounds, below text/logos) */}
      {showGeometricShapes && (
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
        </div>
      )}
    </>
  );
};
