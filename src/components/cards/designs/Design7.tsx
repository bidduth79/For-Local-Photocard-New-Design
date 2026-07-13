import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { NewsDesignProps } from './types';
import { GeometricOverlay } from './GeometricOverlays';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design7: React.FC<NewsDesignProps> = ({
  formattedDate,
  themeColor,
  customLogo,
  fullBrandLogo,
  fullBrandLogoHeight,
  brandName,
  website,
  qrValue,
  brandColor,
  headlineColor,
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
  const bgContrastColor = getContrastColor('#111827'); // bg-gray-900

  return (
    <>
      <div className="absolute inset-0 bg-gray-900 [.export-video_&]:!bg-transparent [&.export-video]:!bg-transparent z-0 overflow-hidden pointer-events-none">
         {/* Full Image */}
         <div className="pointer-events-auto w-full h-full">
           {renderImage("w-full h-[150%] object-cover -mt-[25%]")}
         </div>
         
         {/* Gradient Overlay (Dark at top, fading down) */}
         {overlayOpacity !== 0 && (
           <div className="absolute inset-0 bg-gradient-to-b [.export-video_&]:!bg-transparent [&.export-video]:!bg-transparent from-gray-900 via-gray-900/90 to-transparent z-10 pointer-events-none" style={{ height: '70%' }} />
         )}
         {showGeometricShapes && (
           <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
         )}

         {/* Content */}
         <div className="absolute inset-0 z-20 flex-1 min-h-0 flex flex-col px-16 pb-16 pt-8 pointer-events-none">
            {/* Top Meta */}
            <div className="flex justify-between items-center mb-8 shrink-0 h-[116px]">
               <div className="flex items-center justify-start max-w-[60%]">
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
                       <span className="font-bold tracking-widest uppercase border-b-2 pb-1 whitespace-nowrap" style={{ ...brandStyle, borderColor: brandColor || bgContrastColor, color: brandColor || bgContrastColor }}>{brandName}</span>
                     )}
                   </>
                 )}
               </div>
               <span className="text-xl px-4 py-2 rounded-full" style={{ color: customDateColor || bgContrastColor, opacity: customDateColor ? 1 : 0.8, backgroundColor: customDateBgColor || 'transparent' }}>{formattedDate}</span>
            </div>

            {/* Headline */}
            <div className="relative w-full shrink-0">
               {renderBackgroundPattern()}
               <h2 
                className="leading-[1.1] font-bold line-clamp-4 drop-shadow-2xl relative z-10 w-full"
                style={{ ...headlineStyle, color: headlineColor || bgContrastColor }}
               >
                  {renderFormattedTitle()}
               </h2>
            </div>

            {/* Spacer */}
            <div className="flex-1 min-h-0"></div>

            {/* Footer Elements (Logo, QR, Website) */}
            <div className="flex justify-between items-center pointer-events-auto shrink-0 mb-[-1rem]">
               <div className="flex flex-col items-center justify-center text-center">
                  {/* Website Initial Icon */}
                  <div 
                    className="rounded-full bg-white border-2 flex items-center justify-center mb-4 shadow-lg shrink-0 border-white" 
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
                  <span className="text-lg mb-1 font-medium bg-black/30 px-2 rounded w-fit" style={{ color: customVisitTextColor || bgContrastColor, opacity: customVisitTextColor ? 1 : 0.9 }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
                  <span className="text-3xl font-bold drop-shadow-md bg-black/30 px-2 rounded w-fit" style={{ color: customVisitTextColor || (bgContrastColor === '#FFFFFF' ? '#facc15' : bgContrastColor) }}>{website}</span>
               </div>
                 <div className="bg-white p-2 rounded-xl shadow-lg flex items-center gap-2 text-black mt-8">
                    <span className="text-lg font-bold px-2" style={{ color: customDetailsTextColor || '#1f2937' }}>বিস্তারিত কমেন্টে</span>
                    <QRCodeSVG value={qrValue} size={70} level="M" fgColor={customQrColor || "#000000"} />
                 </div>
            </div>
         </div>
      </div>
    </>
  );
};
