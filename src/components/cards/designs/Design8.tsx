import React from 'react';
import { Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { NewsDesignProps } from './types';
import { GeometricOverlay } from './GeometricOverlays';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design8: React.FC<NewsDesignProps> = ({
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
  const headlineBgColor = gradientStart || '#f9fafb';
  const headlineContrastColor = getContrastColor(headlineBgColor);

  return (
    <>
      <div className="absolute inset-0 z-0 p-6 flex-1 min-h-0 flex flex-col pointer-events-none" style={{ background: cardGradientStart ? `linear-gradient(to bottom, ${cardGradientStart}, ${cardGradientEnd || cardGradientStart})` : 'white' }}>
         <div 
          className="w-full h-full flex-1 min-h-0 border-[8px] rounded-[2rem] overflow-hidden relative flex flex-col pointer-events-none"
          style={{ borderColor: themeColor }}
         >
            {/* Layer 0: Backgrounds */}
            <div className="absolute inset-0 flex flex-col z-0">
               <div className="flex-1 min-h-[40%] w-full"></div>
               <div 
                 className="flex-1 min-h-[30%] w-full"
                 style={{ background: gradientStart ? `linear-gradient(to bottom, ${gradientStart}, ${gradientEnd || gradientStart})` : '#f9fafb' }}
               ></div>
            </div>

            {/* Layer 1: Geometric Shapes */}
            {showGeometricShapes && (
              <div className="absolute inset-0 z-10 pointer-events-none">
                <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
              </div>
            )}

            {/* Layer 2: Content */}
            <div className="absolute inset-0 flex flex-col z-20">
               {/* Image */}
               <div className="flex-1 min-h-[40%] w-full relative pointer-events-auto">
                  {renderImage("w-full h-[150%] object-cover -mt-[25%]")}
                  
                  {/* Brand Logo Top Left */}
                  <div className="absolute top-0 left-16 right-16 h-[116px] flex items-center gap-3 pointer-events-none z-30">
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
                         <span className="font-bold whitespace-normal break-words leading-relaxed py-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{ ...brandStyle, color: brandColor || '#FFFFFF' }}>{brandName}</span>
                       </>
                     )}
                  </div>
               </div>

               {/* Content */}
               <div className="flex-1 min-h-[30%] flex flex-col px-16 pb-12 pt-10 relative pointer-events-auto z-20">
                  {/* Date Badge */}
                  <div 
                    className="absolute left-0 px-8 py-3 rounded-tr-2xl pointer-events-none z-40"
                    style={{ top: 0, transform: 'translateY(-100%)', backgroundColor: customDateBgColor || 'white' }}
                  >
                     <span className="text-2xl font-bold" style={{ color: customDateColor || '#111827' }}>{formattedDate}</span>
                  </div>

                  <div className="flex-1 flex items-center justify-center relative z-10 w-full">
                     {renderBackgroundPattern()}
                     <h2 
                      className="leading-[1.2] font-black line-clamp-4 relative z-10 w-full"
                      style={{ ...headlineStyle, color: headlineColor || headlineContrastColor }}
                     >
                        {renderFormattedTitle()}
                     </h2>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 flex justify-between items-end border-t-2 pt-6 shrink-0" style={{ borderColor: themeColor }}>
                     <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold" style={{ color: customVisitTextColor || themeColor }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
                        <div className="flex items-center gap-2">
                           <Globe className="w-5 h-5" style={{ color: customVisitTextColor || headlineContrastColor }} />
                           <span className="text-2xl font-bold" style={{ color: customVisitTextColor || headlineContrastColor }}>{website}</span>
                        </div>
                     </div>
                        <div className="flex items-center gap-3">
                           <span className="text-sm font-bold" style={{ color: customDetailsTextColor || themeColor }}>বিস্তারিত কমেন্টে</span>
                           <div className="bg-white p-1.5 rounded-lg shadow-sm border-2" style={{ borderColor: themeColor }}>
                             <QRCodeSVG value={qrValue} size={50} level="M" fgColor={customQrColor || "#000000"} />
                           </div>
                        </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </>
  );
};
