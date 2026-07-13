import React from 'react';
import { NewsDesignProps } from './types';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import { GeometricOverlay } from './GeometricOverlays';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design15: React.FC<NewsDesignProps> = ({
  themeColor,
  customLogo,
  fullBrandLogo,
  fullBrandLogoHeight,
  brandName,
  website,
  brandStyle,
  brandColor,
  headlineColor,
  headlineFontSize,
  formattedDate,
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
  renderBackgroundPattern,
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
  const bgContrastColor = getContrastColor(themeColor);

  return (
    <div className="relative w-full h-full flex-1 min-h-0 overflow-hidden flex flex-col" style={{ backgroundColor: themeColor }}>
      {/* Background Pattern */}
      {renderBackgroundPattern()}

      {/* Darker diagonal overlay */}
      <div className="absolute inset-0 bg-black/20 [.export-video_&]:!bg-transparent [&.export-video]:!bg-transparent pointer-events-none" />
      <div 
        className="absolute top-0 right-0 bottom-0 w-[60%] bg-black/10 transform origin-bottom-right -skew-x-12 pointer-events-none"
      />
      <div 
        className="absolute -bottom-20 -right-20 w-[80%] h-[50%] bg-black/20 transform -rotate-12 pointer-events-none"
      />
      {showGeometricShapes && (
        <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
      )}

      {/* Striped Circle Top Right */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border-[20px] border-transparent pointer-events-none opacity-80"
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 4px, transparent 4px, transparent 12px)' }}
      />

      {/* Striped Circle Mid Left */}
      <div className="absolute top-[50%] -left-12 w-32 h-32 rounded-full border-[10px] border-transparent pointer-events-none opacity-80"
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 3px, transparent 3px, transparent 10px)' }}
      />

      {/* Image Container */}
      <div 
        className="absolute top-[116px] left-24 right-32 h-[40%] z-10 shadow-2xl bg-black border-[6px]"
        style={{ borderColor: themeColor }}
      >
        {renderImage(`w-full h-full object-cover ${overlayOpacity !== 0 ? 'opacity-90' : ''}`)}
        {/* Dark gradient at bottom of image */}
        {overlayOpacity !== 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Logo */}
      <div className="absolute top-0 left-16 h-[116px] z-20 flex items-center gap-3 pointer-events-none">
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
                className="w-auto object-contain drop-shadow-md" 
                style={{ height: `${(brandFontSize || 40) * 1.5}px` }}
              />
            ) : (
              <div 
                className="rounded-full flex items-center justify-center shadow-sm shrink-0" 
                style={{ 
                  backgroundColor: customLogoBgColor || 'white',
                  width: `${(brandFontSize || 40) * 1.5}px`,
                  height: `${(brandFontSize || 40) * 1.5}px`
                }}
              >
                <span className="font-bold" style={{ color: customLogoTextColor || themeColor, fontSize: `${(brandFontSize || 40) * 0.8}px` }}>
                  {brandName ? brandName.charAt(0).toUpperCase() : ''}
                </span>
              </div>
            )}
            <span className="font-bold tracking-widest drop-shadow-md" style={{ ...brandStyle, color: brandColor || bgContrastColor }}>{brandName}</span>
          </>
        )}
      </div>

      {/* Vertical Hashtag */}
      <div 
        className="absolute top-[30%] right-12 z-20 pointer-events-none"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="font-medium text-2xl tracking-[0.5em] uppercase drop-shadow-md" style={{ color: bgContrastColor }}>
          {hashtag || "# H A S H T A G"}
        </span>
      </div>

      {/* Headline and Description Container */}
      <div 
        className="absolute left-24 right-32 z-30 pointer-events-none flex flex-col gap-4 overflow-hidden"
        style={{
          top: 'calc(116px + 40%)',
          bottom: '160px',
          paddingTop: '20px'
        }}
      >
        {/* Top Spacer for pushing content down or centering, prevents top overflow */}
        <div style={{ flexGrow: 1, minHeight: 0, flexShrink: 1 }}></div>

        {/* Headline */}
        <div className="flex flex-col justify-end shrink" style={{ minHeight: 0 }}>
          <div className="flex items-center gap-3 mb-2 shrink-0">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-sm" />
          </div>
          <div 
            className="font-black uppercase leading-[1.1] tracking-tight shrink min-h-0 overflow-hidden"
            style={{ 
              fontSize: `${headlineFontSize}px`,
              color: headlineColor || bgContrastColor,
              fontFamily: headlineStyle?.fontFamily || 'inherit',
              textShadow: bgContrastColor === '#FFFFFF' ? '3px 3px 0px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 4px 4px 10px rgba(0,0,0,0.5)' : 'none',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: showDetailedNewsBox ? 4 : 8
            }}
          >
            {renderFormattedTitle()}
          </div>
        </div>

        {/* Description */}
        {showDetailedNewsBox && (
          <div className="bg-black/20 p-8 rounded-lg backdrop-blur-sm border-l-4 border-white/30 shrink min-h-0 overflow-hidden">
            <p 
              className="leading-relaxed font-medium"
              style={{
                fontSize: `${descriptionFontSize || 24}px`,
                color: descriptionColor || bgContrastColor,
                textAlign: descriptionTextAlign || "left",
                fontFamily: 'sans-serif',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 6
              }}
            >
              {description || "কনটেন্ট ইডিটর থেকে বিস্তারিত খবর লিখুন।"}
            </p>
          </div>
        )}

        {/* Bottom Spacer for centering when description is hidden */}
        {!showDetailedNewsBox && (
          <div style={{ flexGrow: 1, minHeight: 0, flexShrink: 1 }}></div>
        )}
      </div>

        {/* Footer */}
        <div className="absolute bottom-12 left-24 right-24 z-20 flex justify-between items-end pointer-events-none">
          <span className="font-medium text-xl tracking-wide pb-1 px-4 py-2 rounded-full" style={{ color: customDateColor || bgContrastColor, opacity: customDateColor ? 1 : 0.8, backgroundColor: customDateBgColor || 'transparent' }}>{formattedDate}</span>
          
          <div className="flex flex-col items-center gap-3">
            {showSocialIcons && (
              <div className="flex items-center gap-4">
                {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                    style={{ backgroundColor: customSocialIconColor || 'white' }}
                  >
                    <Icon size={16} style={{ color: customSocialIconColor ? getContrastColor(customSocialIconColor) : themeColor }} />
                  </div>
                ))}
              </div>
            )}
            <span className="font-medium text-xl tracking-wide" style={{ color: customVisitTextColor || bgContrastColor }}>{website || "www.website.com"}</span>
          </div>
        </div>
    </div>
  );
};
