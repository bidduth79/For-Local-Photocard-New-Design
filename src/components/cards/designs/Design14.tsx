import React from 'react';
import { NewsDesignProps } from './types';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import { GeometricOverlay } from './GeometricOverlays';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design14: React.FC<NewsDesignProps> = ({
  themeColor,
  customLogo,
  fullBrandLogo,
  fullBrandLogoHeight,
  brandName,
  website,
  brandStyle,
  brandColor,
  headlineFontSize,
  headlineColor,
  renderFormattedTitle,
  renderImage,
  headlineStyle,
  brandFontSize,
  description,
  descriptionFontSize,
  descriptionColor,
  descriptionTextAlign,
  showSocialIcons,
  hashtag,
  formattedDate,
  renderBackgroundPattern,
  overlayOpacity,
  cardGradientStart,
  cardGradientEnd,
  applyGradientToAll,
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
  const bgStyle = applyGradientToAll && cardGradientStart && cardGradientEnd
    ? { background: `linear-gradient(135deg, ${cardGradientStart}, ${cardGradientEnd})` }
    : { background: `linear-gradient(135deg, #ffffff 0%, ${themeColor}15 100%)` };

  const mainBgColor = applyGradientToAll && cardGradientStart ? cardGradientStart : '#ffffff';
  const mainContrastColor = getContrastColor(mainBgColor);
  const footerContrastColor = getContrastColor(themeColor);

  return (
    <div className="relative w-full h-full flex-1 min-h-0 overflow-hidden flex flex-col" style={{ backgroundColor: themeColor }}>
      {/* Background Pattern */}
      {renderBackgroundPattern()}

      {/* Inner White Box */}
      <div className="absolute top-0 right-0 bottom-12 left-12 shadow-2xl flex flex-col overflow-hidden" style={bgStyle}>
        {showGeometricShapes && (
          <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
        )}
        {/* Left Border */}
        <div className="absolute top-0 left-0 bottom-0 w-6 z-30" style={{ backgroundColor: themeColor }} />

        {/* Thick Ellipse Geometric Designs (Mixed sizes, solid and dashed) */}
        {/* Top Right Corner */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[60px] rounded-full opacity-[0.04] translate-x-1/3 -translate-y-1/3 pointer-events-none z-0" style={{ borderColor: themeColor }} />
        <div className="absolute top-0 right-0 w-[350px] h-[350px] border-[20px] border-dashed rounded-full opacity-[0.06] translate-x-1/4 -translate-y-1/4 pointer-events-none z-0" style={{ borderColor: themeColor }} />
        <div className="absolute top-12 right-12 w-[150px] h-[150px] border-[10px] border-dotted rounded-full opacity-[0.08] translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" style={{ borderColor: themeColor }} />

        {/* Bottom Left Corner */}
        <div className="absolute bottom-12 left-0 w-[600px] h-[600px] border-[80px] rounded-full opacity-[0.03] -translate-x-1/3 translate-y-1/3 pointer-events-none z-0" style={{ borderColor: themeColor }} />
        <div className="absolute bottom-12 left-0 w-[400px] h-[400px] border-[25px] border-dashed rounded-full opacity-[0.05] -translate-x-1/4 translate-y-1/4 pointer-events-none z-0" style={{ borderColor: themeColor }} />
        <div className="absolute bottom-32 left-12 w-[200px] h-[200px] border-[15px] border-dotted rounded-full opacity-[0.06] -translate-x-1/2 translate-y-1/2 pointer-events-none z-0" style={{ borderColor: themeColor }} />
        
        {/* Additional Floating Ellipses */}
        <div className="absolute top-1/2 right-8 w-32 h-32 border-[12px] opacity-[0.04] pointer-events-none z-0 rounded-full" style={{ borderColor: themeColor }} />
        <div className="absolute top-1/3 left-8 w-16 h-16 border-[6px] border-dashed opacity-[0.06] pointer-events-none z-0 rounded-full" style={{ borderColor: themeColor }} />

        {/* Top Header (Date + Brand) */}
        <div className="absolute top-0 left-16 right-12 h-[116px] flex justify-between items-center z-30">
          {/* Date */}
          <div className="pl-4 border-l-4" style={{ borderColor: themeColor, backgroundColor: customDateBgColor || 'transparent', padding: customDateBgColor ? '4px 12px' : '0', borderRadius: customDateBgColor ? '4px' : '0' }}>
            <span className="font-bold text-xl tracking-wider uppercase" style={{ color: customDateColor || brandColor || mainContrastColor }}>
              {formattedDate}
            </span>
          </div>

          {/* Brand */}
          <div className="flex items-center gap-3">
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
                    alt="Logo" 
                    className="w-auto object-contain" 
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
                <span className="font-bold tracking-wider" style={{ ...brandStyle, color: brandColor || mainContrastColor }}>{brandName}</span>
              </>
            )}
          </div>
        </div>

        {/* Top Content Area */}
        <div className="px-16 pt-36 pb-8 z-20 relative">
          {/* Headline Highlight Background */}
          <div className="relative inline-block w-full">
            <div className="absolute -inset-y-6 -inset-x-8 opacity-[0.06] rounded-2xl pointer-events-none" style={{ backgroundColor: themeColor }} />
            <div className="absolute -left-8 top-0 bottom-0 w-2.5 rounded-r-lg pointer-events-none" style={{ backgroundColor: themeColor }} />
            
            {/* Headline */}
            <div 
              className="font-black leading-[1.2] tracking-tight max-w-[95%] relative z-10"
              style={{ 
                fontSize: `${headlineFontSize}px`,
                color: headlineColor || mainContrastColor,
                fontFamily: headlineStyle?.fontFamily || 'inherit'
              }}
            >
              {renderFormattedTitle()}
            </div>
          </div>
        </div>

        {/* Image Area */}
        <div className="relative w-full h-[700px] z-10 px-16">
          <div className="w-full h-full relative overflow-hidden shadow-2xl border-[6px] border-white rounded-xl">
            {renderImage("w-full h-full object-cover")}
            
            {/* Bottom Gradient Overlay */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-3/4 pointer-events-none"
              style={{ 
                background: `linear-gradient(to top, ${themeColor}, transparent)`,
                opacity: (overlayOpacity ?? 80) / 100
              }}
            />

            {/* Vertical Text on Image */}
            <div 
              className="absolute top-1/2 right-6 transform -translate-y-1/2 pointer-events-none"
              style={{ writingMode: 'vertical-rl' }}
            >
              <span className="text-white font-medium text-sm tracking-[0.4em] uppercase drop-shadow-md">
                {hashtag || "INSTANT NEWS"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="relative flex-1 px-16 pt-12 pb-32 z-20">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-[0.04]">
            {customLogo ? (
              <img src={customLogo} alt="Watermark" className="w-[400px] h-[400px] object-contain grayscale" />
            ) : (
              <span className="font-black text-[120px] leading-none text-black whitespace-nowrap -rotate-12">
                {brandName}
              </span>
            )}
          </div>

          {/* Overlapping Rectangles */}
          <div 
            className="absolute -top-12 left-24 w-24 h-24 z-30 mix-blend-multiply pointer-events-none rotate-12"
            style={{ 
              backgroundColor: themeColor,
              opacity: (overlayOpacity ?? 80) / 100
            }}
          />
          <div 
            className="absolute -top-8 left-32 w-16 h-16 z-20 mix-blend-multiply pointer-events-none -rotate-12"
            style={{ 
              backgroundColor: themeColor,
              opacity: ((overlayOpacity ?? 80) / 100) * 0.5
            }}
          />

          {/* Decorative elements for the bottom empty space */}
          <div className="absolute bottom-12 right-16 flex gap-3 opacity-30 pointer-events-none z-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: themeColor }} />
            ))}
          </div>
          <div className="absolute bottom-20 right-16 w-40 h-40 border-b-[12px] border-r-[12px] opacity-10 pointer-events-none rounded-br-[40px]" style={{ borderColor: themeColor }} />
          <div className="absolute bottom-12 left-16 w-32 h-2 opacity-20 pointer-events-none z-10" style={{ backgroundColor: themeColor }} />

          {/* Description */}
          {showDetailedNewsBox && (
            <p 
              className="leading-[1.4] font-medium relative z-40"
            style={{
              fontSize: `${descriptionFontSize || 24}px`,
              color: descriptionColor || mainContrastColor,
              textAlign: descriptionTextAlign || "left",
              fontFamily: 'sans-serif'
            }}
          >
            {description || "কনটেন্ট ইডিটর থেকে বিস্তারিত খবর লিখুন।"}
          </p>
          )}
        </div>

        {/* Footer Area */}
        <div 
            className="absolute bottom-0 left-6 right-0 h-24 flex items-center justify-between px-10 z-30 shadow-2xl"
            style={{ backgroundColor: themeColor, color: footerContrastColor }}
          >
            {/* Left: Website Info */}
            <div className="flex flex-col">
              <span className="font-medium text-xs tracking-widest uppercase mb-1" style={{ opacity: 0.8, color: customVisitTextColor || footerContrastColor }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
              <span className="font-bold text-xl tracking-wide" style={{ color: customVisitTextColor || footerContrastColor }}>{website || "username"}</span>
            </div>

            {/* Right: Social Icons */}
            {showSocialIcons && (
              <div className="flex items-center gap-3">
                {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: customSocialIconColor || (footerContrastColor === '#FFFFFF' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)') }}
                  >
                    <Icon size={18} style={{ color: customSocialIconColor ? getContrastColor(customSocialIconColor) : footerContrastColor }} />
                  </div>
                ))}
              </div>
            )}
          </div>
      </div>
    </div>
  );
};
