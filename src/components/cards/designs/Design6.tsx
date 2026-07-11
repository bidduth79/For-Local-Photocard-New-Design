import React from 'react';
import { Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { NewsDesignProps } from './types';
import { GeometricOverlay } from './GeometricOverlays';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design6: React.FC<NewsDesignProps> = ({
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
  cardGradientStart,
  cardGradientEnd,
  renderFormattedTitle,
  renderImage,
  renderBackgroundPattern,
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
  const mainBgColor = cardGradientStart || '#f9fafb';
  const mainContrastColor = getContrastColor(mainBgColor);
  const headlineBgColor = gradientStart || mainBgColor;
  const headlineContrastColor = getContrastColor(headlineBgColor);

  return (
    <>
      <div className="absolute inset-0 z-0 flex-1 min-h-0 flex flex-col p-8 pointer-events-none" style={{ background: cardGradientStart ? `linear-gradient(to bottom, ${cardGradientStart}, ${cardGradientEnd || cardGradientStart})` : '#f9fafb' }}>
         
         {/* Geometric Overlays - z-10 (Above background, below content) */}
         {showGeometricShapes && (
           <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
             <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
           </div>
         )}
         
         {/* Header - z-20 */}
         <div className="absolute top-0 left-16 right-16 h-[116px] flex justify-between items-center z-20 pointer-events-auto shrink-0">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full" style={{ backgroundColor: customDateBgColor || 'transparent' }}>
               <div className="h-8 w-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
               <span className="text-2xl font-bold" style={{ color: customDateColor || mainContrastColor }}>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-3 min-w-0 max-w-[60%]">
              {fullBrandLogo ? (
                <img 
                  src={fullBrandLogo} 
                  alt="Full Logo" 
                  className="w-auto object-contain drop-shadow-md" 
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
                  <h1 className="font-bold whitespace-normal break-words leading-relaxed text-right py-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{ ...brandStyle, color: brandColor || mainContrastColor }}>{brandName}</h1>
                </>
              )}
            </div>
         </div>

         {/* Image Card - z-20 */}
         <div className="flex-1 min-h-[40%] w-full bg-white rounded-[2rem] shadow-xl overflow-hidden p-3 border-[3px] z-20 relative pointer-events-auto mt-[116px] ml-8 mr-8" style={{ borderColor: themeColor, width: 'calc(100% - 4rem)' }}>
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
               {renderImage("w-full h-[150%] object-cover -mt-[25%]")}
            </div>
         </div>

         {/* Headline - Container is relative but without z-index to allow interleaving */}
         <div className="flex-1 min-h-[30%] flex items-center justify-center px-4 rounded-xl mt-4 pointer-events-auto relative ml-8 mr-8" style={{ width: 'calc(100% - 4rem)' }}>
            {/* Headline Background - z-0 (Below Geometric Shapes) */}
            <div 
              className="absolute inset-0 rounded-xl z-0 overflow-hidden"
              style={{ background: gradientStart ? `linear-gradient(to bottom, ${gradientStart}, ${gradientEnd || gradientStart})` : 'transparent' }}
            >
               {renderBackgroundPattern()}
            </div>
            
            {/* Headline Text - z-20 (Above Geometric Shapes) */}
            <h2 
             className="leading-[1.2] font-bold line-clamp-4 relative z-20 w-full text-center -mt-[30px]"
             style={{ ...headlineStyle, color: headlineColor || headlineContrastColor }}
            >
               {renderFormattedTitle()}
            </h2>
         </div>

         {/* Footer - z-20 */}
         <div className="absolute bottom-12 left-16 right-16 border-t-[3px] pt-6 flex justify-between items-end z-20 pointer-events-auto shrink-0" style={{ borderColor: themeColor }}>
            <div className="flex flex-col items-start gap-1">
               <span className="text-sm font-bold" style={{ color: customVisitTextColor || mainContrastColor, opacity: customVisitTextColor ? 1 : 0.8 }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
               <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" style={{ color: customVisitTextColor || mainContrastColor }} />
                  <span className="text-2xl font-bold" style={{ color: customVisitTextColor || mainContrastColor }}>{website}</span>
               </div>
            </div>
               <div className="flex items-center gap-3">
                  <span className="text-lg font-bold" style={{ color: customDetailsTextColor || mainContrastColor }}>বিস্তারিত কমেন্টে</span>
                  <div className="bg-white p-1.5 rounded-lg shadow-sm border-2" style={{ borderColor: themeColor }}>
                    <QRCodeSVG value={qrValue} size={50} level="M" fgColor={customQrColor || "#000000"} />
                  </div>
               </div>
         </div>
      </div>
    </>
  );
};
