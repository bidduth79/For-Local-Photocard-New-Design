import React from 'react';
import { Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { NewsDesignProps } from './types';
import { GeometricOverlay } from './GeometricOverlays';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design4: React.FC<NewsDesignProps> = ({
  formattedDate,
  themeColor,
  customLogo,
  fullBrandLogo,
  fullBrandLogoHeight,
  brandName,
  website,
  qrValue,
  cardGradientStart,
  cardGradientEnd,
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
  const headerContrastColor = getContrastColor('#ffffff');
  const headlineBgColor = gradientStart || '#ffffff';
  const headlineContrastColor = getContrastColor(headlineBgColor);
  const footerContrastColor = getContrastColor(themeColor);
  
  // Default brand color is #5934e8. If it's the default, use black for Design 4.
  const finalBrandColor = brandColor === '#5934e8' ? '#000000' : (brandColor || headerContrastColor);

  return (
    <>
      <div className="absolute inset-0 z-0 flex-1 min-h-0 flex flex-col p-12" style={{ background: cardGradientStart ? `linear-gradient(to bottom, ${cardGradientStart}, ${cardGradientEnd || cardGradientStart})` : '#f9fafb' }}>
         <div className="w-full h-full flex-1 min-h-0 border-[3px] rounded-[3rem] overflow-hidden relative flex flex-col pointer-events-none" style={{ borderColor: themeColor }}>
            
            {/* Layer 0: Solid Backgrounds */}
            <div className="absolute inset-0 flex flex-col z-0">
               <div className="min-h-[8rem] bg-white border-b-[3px]" style={{ borderColor: themeColor }}></div>
               <div className="flex-1 min-h-[40%] bg-gray-200 border-b-[3px]" style={{ borderColor: themeColor }}></div>
               <div className="flex-1 min-h-[30%]" style={{ background: gradientStart ? `linear-gradient(to bottom, ${gradientStart}, ${gradientEnd || gradientStart})` : 'white' }}></div>
               <div className="h-28" style={{ backgroundColor: themeColor }}></div>
            </div>

            {/* Layer 1: Patterns and Geometric Shapes */}
            <div className="absolute inset-0 z-10 pointer-events-none">
               <FloralPattern color={themeColor} opacity={0.05} />
               {showGeometricShapes && (
                 <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
               )}
            </div>
            
            {/* Layer 2: Content */}
            <div className="absolute inset-0 flex flex-col z-20">
               {/* Header */}
               <div className="h-[116px] py-4 flex items-center justify-between px-16 gap-2 text-center shrink-0">
                  <div className="flex items-center justify-start gap-4 max-w-[60%]">
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
                         <h1 className="font-black uppercase tracking-tighter whitespace-normal break-words leading-relaxed py-2 text-left drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{ ...brandStyle, color: finalBrandColor }}>{brandName}</h1>
                       </>
                     )}
                  </div>
                  <div className="text-xl font-bold" style={{ color: customDateColor || headerContrastColor, opacity: customDateColor ? 1 : 0.6 }}>{formattedDate}</div>
               </div>

               {/* Image */}
               <div className="flex-1 min-h-[40%] relative overflow-hidden group pointer-events-auto">
                  {renderImage("w-full h-[150%] object-cover -mt-[25%]")}
               </div>

               {/* Headline */}
               <div className="flex-1 min-h-[30%] px-16 flex items-center justify-center pointer-events-auto relative">
                  {renderBackgroundPattern()}
                  <h2 
                   className="leading-tight font-black line-clamp-4 relative z-30 w-full"
                   style={{ ...headlineStyle, color: headlineColor || headlineContrastColor }}
                  >
                     {renderFormattedTitle()}
                  </h2>
               </div>

               {/* Footer */}
               <div className="h-28 flex items-center justify-between px-16 pointer-events-auto shrink-0" style={{ color: footerContrastColor }}>
                  <div className="flex flex-col">
                     <span className="text-sm font-medium" style={{ opacity: customVisitTextColor ? 1 : 0.8, color: customVisitTextColor || footerContrastColor }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
                     <div className="flex items-center gap-2 mt-1">
                       <Globe className="w-5 h-5" style={{ opacity: customVisitTextColor ? 1 : 0.8, color: customVisitTextColor || footerContrastColor }} />
                       <span className="text-2xl font-bold" style={{ color: customVisitTextColor || footerContrastColor }}>{website}</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-xl font-bold" style={{ color: customDetailsTextColor || (footerContrastColor === '#FFFFFF' ? '#facc15' : footerContrastColor) }}>বিস্তারিত কমেন্টে</span>
                     <div className="bg-white p-1 rounded flex items-center gap-2 text-black">
                        <QRCodeSVG value={qrValue} size={60} level="M" fgColor={customQrColor || "#000000"} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </>
  );
};
