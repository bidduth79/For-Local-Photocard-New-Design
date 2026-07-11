import React from 'react';
import { Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { NewsDesignProps } from './types';
import { GeometricOverlay } from './GeometricOverlays';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design3: React.FC<NewsDesignProps> = ({
  formattedDate,
  themeColor,
  customLogo,
  fullBrandLogo,
  fullBrandLogoHeight,
  brandName,
  website,
  qrValue,
  renderFormattedTitle,
  renderImage,
  renderBackgroundPattern,
  brandStyle,
  headlineStyle,
  brandFontSize,
  showGeometricShapes,
  showDetailedNewsBox,
  geometricShapeColor,
  geometricShapeOpacity,
  overlayOpacity,
  headlineFontSize,
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

  return (
    <>
      <div className="absolute inset-0 z-0 bg-black [.export-video_&]:!bg-transparent overflow-hidden flex items-center justify-center">
        {renderImage("w-full h-full object-cover opacity-100")}
      </div>

      {/* Geometric Overlays - Moved to middle layer (above image, below text) */}
      {showGeometricShapes && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
        </div>
      )}

      <div className="relative z-20 w-full h-full flex-1 min-h-0 flex flex-col pointer-events-none">
        <div className="flex-1 flex flex-col px-16 pt-0">
          <div className="flex flex-col items-center justify-center w-full gap-4 shrink-0 h-[116px]">
             <div className="flex items-center justify-between w-full">
               <div className="text-2xl font-medium px-6 py-2 rounded-full backdrop-blur-sm" style={{ backgroundColor: customDateBgColor || 'rgba(0, 0, 0, 0.3)', color: customDateColor || 'rgba(255, 255, 255, 0.8)' }}>
                  {formattedDate}
               </div>
               <div className="flex items-center justify-center gap-4 max-w-[60%]">
                 {fullBrandLogo ? (
                    <img 
                      src={fullBrandLogo} 
                      alt="Full Logo" 
                      className="object-contain drop-shadow-md shrink-0" 
                      style={{ height: `${fullBrandLogoHeight || 150}px` }}
                    />
                  ) : (
                    <>
                       {customLogo ? (
                          <img 
                            src={customLogo} 
                            alt="Brand" 
                            className="object-contain drop-shadow-lg shrink-0" 
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
                        <h1 className="font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] whitespace-nowrap text-center leading-normal py-1" style={brandStyle}>{brandName}</h1>
                    </>
                  )}
               </div>
             </div>
          </div>
        </div>

        <div className="absolute bottom-[450px] left-16 right-16 flex flex-col justify-center translate-y-1/2 z-30">
           <div className="w-full">
             {renderBackgroundPattern()}
             <div className="w-24 h-2 mb-8 bg-white rounded-full relative z-10" style={{ backgroundColor: themeColor }} />
             <h2 
              className="leading-[1.1] font-bold drop-shadow-xl line-clamp-4 relative z-10 w-full"
              style={headlineStyle}
             >
              {renderFormattedTitle()}
            </h2>
           </div>
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
    </>
  );
};
