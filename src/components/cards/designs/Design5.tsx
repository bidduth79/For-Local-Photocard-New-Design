import React from 'react';
import { Calendar } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { NewsDesignProps } from './types';
import { GeometricOverlay } from './GeometricOverlays';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design5: React.FC<NewsDesignProps> = ({
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
  customDateColor,
  customDateBgColor,
  customDetailsTextColor,
  customVisitTextColor,
  customLogoTextColor,
  customLogoBgColor,
  customQrColor,
  customSocialIconColor
}) => {
  const contentBgColor = gradientStart || '#ffffff';
  const contentContrastColor = getContrastColor(contentBgColor);
  const logoBoxContrastColor = getContrastColor('#ffffff'); // white/30 backdrop

  return (
    <>
      <div className="absolute inset-0 z-0" style={{ background: `linear-gradient(135deg, ${cardGradientStart || themeColor}, ${cardGradientEnd || '#000'})` }}>
      </div>

      <div className="relative z-10 w-full h-full flex-1 min-h-0 p-12 flex flex-col pointer-events-none">
         <div className="rounded-[3rem] shadow-2xl w-full h-full flex-1 min-h-0 overflow-hidden flex flex-col pointer-events-auto relative" style={{ background: gradientStart ? `linear-gradient(to bottom, ${gradientStart}, ${gradientEnd || gradientStart})` : 'rgba(255, 255, 255, 0.95)' }}>
            
            {/* Geometric Overlays - Inside card, behind content */}
            {showGeometricShapes && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
              </div>
            )}

            {/* Image Area */}
            <div className="flex-1 min-h-[40%] p-4 pb-0 z-10 relative">
               <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                  {renderImage("w-full h-[150%] object-cover -mt-[25%]")}
                  <div className="absolute top-0 left-16 right-16 h-[116px] flex items-center gap-3 pointer-events-none z-20">
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
                            <span className="font-bold whitespace-nowrap leading-normal drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{ ...brandStyle, color: brandColor || logoBoxContrastColor }}>{brandName}</span>
                        </>
                      )}
                  </div>
               </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-[40%] px-16 py-8 flex flex-col items-center mt-24 z-10 pointer-events-none relative pb-12">
               {renderBackgroundPattern()}
               <div className="flex items-center gap-2 mb-6 relative z-20 px-4 py-2 rounded-full" style={{ color: customDateColor || contentContrastColor, opacity: customDateColor ? 1 : 0.8, backgroundColor: customDateBgColor || 'transparent' }}>
                  <Calendar className="w-6 h-6" />
                  <span className="text-2xl font-medium">{formattedDate}</span>
               </div>
               
               <h2 
                className="leading-[1.1] font-bold mb-8 line-clamp-4 relative z-20 w-full"
                style={{ ...headlineStyle, color: headlineColor || contentContrastColor }}
               >
                  {renderFormattedTitle()}
               </h2>

                <div className="mt-auto w-full flex items-center justify-between border-t-2 pt-8 pointer-events-auto shrink-0 relative z-20" style={{ borderColor: themeColor }}>
                  <div className="flex flex-col items-start">
                     <span className="text-lg font-medium" style={{ color: customVisitTextColor || contentContrastColor, opacity: customVisitTextColor ? 1 : 0.8 }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
                     <span className="text-3xl font-bold" style={{ color: customVisitTextColor || themeColor }}>{website}</span>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-xl flex items-center gap-2">
                     <span className="text-lg font-bold px-2" style={{ color: customDetailsTextColor || '#1f2937' }}>বিস্তারিত কমেন্টে</span>
                     <QRCodeSVG value={qrValue} size={70} level="M" fgColor={customQrColor || "#000000"} />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </>
  );
};
