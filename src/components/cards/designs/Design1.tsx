import React from 'react';
import { Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { NewsDesignProps } from './types';
import { GeometricOverlay } from './GeometricOverlays';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design1: React.FC<NewsDesignProps> = ({
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
  const topBgColor = gradientStart || '#374151';
  const bottomBgColor = gradientEnd || '#111827';
  const topContrastColor = getContrastColor(topBgColor);
  const bottomContrastColor = getContrastColor(bottomBgColor);

  return (
    <>
      <div className="absolute inset-0 z-0 bg-gray-900 [.export-video_&]:!bg-transparent">
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{ background: `linear-gradient(to bottom, ${topBgColor}, ${bottomBgColor})` }}
        />
        
        {/* Geometric Overlays - Moved to background layer */}
        {showGeometricShapes && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
          </div>
        )}
      </div>

      <div className="relative z-20 w-full h-full flex-1 min-h-0 flex flex-col items-center pointer-events-none">
        {/* Top Logo Area */}
        <div className="absolute top-0 left-16 right-16 h-[116px] flex justify-between items-center pointer-events-auto shrink-0 z-30">
           <div className="flex items-center gap-4">
             {fullBrandLogo ? (
                <img 
                  src={fullBrandLogo} 
                  alt="Full Logo" 
                  className="object-contain drop-shadow-md" 
                  style={{ height: `${fullBrandLogoHeight || 150}px` }}
                />
              ) : (
                <>
                  {customLogo ? (
                    <img 
                      src={customLogo} 
                      alt="Brand" 
                      className="object-contain drop-shadow-lg" 
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
                  <h1 className="font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] whitespace-nowrap" style={{ ...brandStyle, color: brandColor || topContrastColor }}>{brandName}</h1>
                </>
              )}
           </div>
           <div className="px-6 py-2 rounded-full backdrop-blur-sm border border-white/20" style={{ backgroundColor: customDateBgColor || 'rgba(255, 255, 255, 0.1)' }}>
              <p className="text-2xl font-medium" style={{ color: customDateColor || topContrastColor, opacity: customDateColor ? 1 : 0.9 }}>{formattedDate}</p>
           </div>
        </div>

        {/* Image */}
        <div className="w-full px-16 pt-[116px] pointer-events-auto h-[850px] flex flex-col relative z-30 shrink-0">
           <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 relative bg-gray-800">
              {renderImage("w-full h-[150%] object-cover -mt-[25%]")}
           </div>
        </div>

        {/* Headline */}
        <div className="px-16 flex items-center justify-center relative w-full flex-1 mb-[130px] z-30">
          {renderBackgroundPattern()}
          <h2 
            className="leading-[1.2] font-bold drop-shadow-lg line-clamp-4 relative z-40 w-full"
            style={{ ...headlineStyle, color: headlineColor || bottomContrastColor }}
          >
            {renderFormattedTitle()}
          </h2>
        </div>

        {/* Footer */}
        <div className="absolute bottom-12 left-16 right-16 flex justify-between items-end pointer-events-auto shrink-0 z-30">
             <div className="flex flex-col gap-1">
                <span className="text-lg font-medium" style={{ color: customVisitTextColor || bottomContrastColor, opacity: customVisitTextColor ? 1 : 0.6 }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
                <div className="flex items-center gap-3">
                   <Globe className="w-6 h-6" style={{ color: customVisitTextColor || bottomContrastColor, opacity: customVisitTextColor ? 1 : 0.6 }} />
                   <span className="text-3xl font-bold" style={{ color: customVisitTextColor || bottomContrastColor }}>{website}</span>
                </div>
             </div>
             <div className="bg-white p-2 rounded-xl flex items-center gap-2">
                <span className="text-lg font-bold px-2" style={{ color: customDetailsTextColor || '#1f2937' }}>বিস্তারিত কমেন্টে</span>
                <QRCodeSVG value={qrValue} size={80} level="M" fgColor={customQrColor || "#000000"} />
             </div>
          </div>
      </div>
    </>
  );
};
