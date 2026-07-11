import React from 'react';
import { Globe, CheckCircle2, ChevronDown } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { NewsDesignProps } from './types';
import { GeometricOverlay } from './GeometricOverlays';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design0: React.FC<NewsDesignProps> = ({
  title,
  image,
  formattedDate,
  themeColor,
  customLogo,
  fullBrandLogo,
  fullBrandLogoHeight,
  brandName,
  website,
  qrValue,
  headlineFontSize,
  headlineColor,
  brandFontSize,
  brandColor,
  textAlign,
  renderFormattedTitle,
  renderImage,
  renderBackgroundPattern,
  FloralPattern,
  brandStyle,
  headlineStyle,
  showGeometricShapes,
  showDetailedNewsBox,
  geometricShapeColor,
  geometricShapeOpacity,
  gradientStart,
  gradientEnd,
  cardGradientStart,
  cardGradientEnd
}) => {
  const topBgColor = cardGradientStart || '#ffffff';
  const bottomBgColor = themeColor || '#ffffff';
  const topContrastColor = getContrastColor(topBgColor);
  const bottomContrastColor = getContrastColor(bottomBgColor);
  const footerBgColor = '#111827'; // bg-gray-900
  const footerContrastColor = getContrastColor(footerBgColor);

  return (
    <>
      {/* Backgrounds */}
      <div className="absolute inset-0 flex flex-col z-0">
        <div className="h-[35%] relative overflow-hidden" style={{ backgroundColor: topBgColor }}>
        </div>
        <div className="h-[65%] relative overflow-hidden" style={{ backgroundColor: bottomBgColor }}>
        </div>
        
        {/* Geometric Shapes - Moved to background layer, behind content */}
        {showGeometricShapes && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 w-full h-full flex-1 min-h-0 flex flex-col pointer-events-none">
        <div className="relative z-30 h-[116px] px-16 flex justify-between items-center pointer-events-auto shrink-0 mt-0">
          <div className="flex flex-col h-full justify-center">
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
                        backgroundColor: themeColor,
                        width: `${(brandFontSize || 40) * 1.5}px`,
                        height: `${(brandFontSize || 40) * 1.5}px`
                      }}
                    >
                      <span className="font-bold text-white drop-shadow-md" style={{ fontSize: `${(brandFontSize || 40) * 0.8}px` }}>
                        {brandName ? brandName.charAt(0).toUpperCase() : ''}
                      </span>
                    </div>
                  )}
                  <h1 className="font-bold whitespace-nowrap drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{ ...brandStyle, color: brandColor || topContrastColor }}>{brandName}</h1>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 text-2xl font-medium" style={{ color: topContrastColor, opacity: 0.8 }}>
            <Globe className="w-6 h-6" style={{ color: themeColor }} />
            <span>{website}</span>
          </div>
        </div>
        
        <div className="px-16 relative z-30 pointer-events-none shrink-0 -mt-8">
          <p className="text-3xl font-medium mb-3" style={{ color: topContrastColor, opacity: 0.8 }}>{formattedDate}</p>
          <div className="h-1.5 w-20 rounded-full" style={{ backgroundColor: themeColor }}></div>
        </div>

        <div className="px-16 relative z-30 mt-4 pointer-events-auto flex-1 min-h-[610px] max-h-[660px] flex flex-col">
          <div className="w-full h-full rounded-[40px] overflow-hidden shadow-2xl border-[6px] border-white bg-gray-200 relative">
            {renderImage("w-full h-full object-cover")}
          </div>
        </div>

        <div className="px-16 pt-8 pb-32 flex items-center justify-center relative z-30 flex-1 shrink-0">
          {renderBackgroundPattern()}
          <h2 
            className="leading-[1.15] font-bold drop-shadow-sm line-clamp-4 relative z-40 w-full"
            style={{ ...headlineStyle, color: headlineColor || bottomContrastColor }}
          >
            {renderFormattedTitle()}
          </h2>
        </div>

        <div className="absolute bottom-12 left-16 right-16 z-40 h-28 rounded-2xl flex items-center justify-between px-8 shadow-xl pointer-events-auto" style={{ backgroundColor: footerBgColor, color: footerContrastColor }}>
          <div className="flex items-center gap-4">
            <div className="bg-white p-1.5 rounded-lg flex items-center gap-2">
              <span className="text-lg font-bold text-gray-800 px-2">স্ক্যান করুন</span>
              <QRCodeSVG value={qrValue} size={70} level="M" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm" style={{ opacity: 0.7 }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
              <span className="text-xl font-bold">{website}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xl font-bold" style={{ color: '#facc15' /* yellow-400 */ }}>
            <span>বিস্তারিত কমেন্টে</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </div>
    </>
  );
};
