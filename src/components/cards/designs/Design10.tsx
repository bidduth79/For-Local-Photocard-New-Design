import React from 'react';
import { NewsDesignProps } from './types';
import { Globe, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import { GeometricOverlay } from './GeometricOverlays';

export const Design10: React.FC<NewsDesignProps> = ({
  image,
  themeColor,
  customLogo,
  fullBrandLogo,
  fullBrandLogoHeight,
  brandName,
  website,
  formattedDate,
  headlineFontSize,
  headlineColor,
  renderFormattedTitle,
  renderImage,
  brandStyle,
  headlineStyle,
  brandFontSize,
  description,
  hashtag,
  showSocialIcons,
  descriptionFontSize,
  descriptionColor,
  descriptionTextAlign,
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
  return (
    <div className="w-full h-full flex-1 min-h-0 relative bg-[#1c1c1c] overflow-hidden flex flex-col">
      {/* Background Pattern Layer */}
      {renderBackgroundPattern()}

      {/* Background geometric shapes */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[1000px] transform rotate-45 translate-x-[200px] -translate-y-[200px] z-0"
        style={{ background: `linear-gradient(135deg, ${themeColor} 0%, #8a1c1c 100%)` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[800px] h-[600px] transform -rotate-12 -translate-x-[200px] translate-y-[200px] z-0"
        style={{ background: `linear-gradient(135deg, ${themeColor} 0%, #8a1c1c 100%)` }}
      />
      {showGeometricShapes && (
        <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
      )}

      {/* Main Image Container */}
      <div className="relative flex-1 min-h-0 z-10 shadow-2xl">
        {renderImage("w-full h-full object-cover")}
        {overlayOpacity !== 0 && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b [.export-video_&]:!bg-transparent from-black/40 via-transparent to-transparent pointer-events-none" />
            {/* Gradient overlay for smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1c1c1c] to-transparent pointer-events-none" />
          </>
        )}
        
        {/* Logo and Date on Image */}
        <div className="absolute top-0 left-16 right-16 h-[116px] z-30 flex items-center justify-between pointer-events-none">
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
                    className="w-auto object-contain drop-shadow-lg" 
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
                <span className="text-white font-bold tracking-wider drop-shadow-md" style={brandStyle}>{brandName}</span>
              </>
            )}
          </div>
          <div className="font-medium text-xl drop-shadow-md px-4 py-2 rounded-full" style={{ color: customDateColor || 'white', backgroundColor: customDateBgColor || 'transparent' }}>
            {formattedDate}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 px-16 pt-8 pb-12 flex flex-col justify-between min-h-[450px]">
        <div className="space-y-6">
          {/* Headline Container */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: themeColor }} />
            </div>
            <div 
              className="font-black uppercase leading-[1.1] tracking-tight"
              style={{ 
                fontSize: `${headlineFontSize}px`,
                color: '#ffffff',
                textShadow: '3px 3px 0px #000000, 4px 4px 0px #000000',
                fontFamily: headlineStyle?.fontFamily || 'inherit'
              }}
            >
              {renderFormattedTitle()}
            </div>
          </div>

          {/* Description Container */}
          {showDetailedNewsBox && (
            <div className="bg-black/20 backdrop-blur-sm p-8 border-l-4" style={{ borderColor: themeColor }}>
            <p 
              className="leading-relaxed font-medium"
              style={{
                fontSize: `${descriptionFontSize || 24}px`,
                color: descriptionColor || "rgba(255, 255, 255, 0.9)",
                textAlign: descriptionTextAlign || "justify",
                fontFamily: 'sans-serif'
              }}
            >
              {description || "কনটেন্ট ইডিটর থেকে বিস্তারিত খবর লিখুন।"}
            </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1 text-white/90">
                <span className="text-sm" style={{ color: customVisitTextColor || 'rgba(255,255,255,0.7)' }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
                <div className="flex items-center gap-2">
                  <Globe size={20} style={{ color: customVisitTextColor || 'white' }} />
                  <span className="text-xl font-medium tracking-wide" style={{ color: customVisitTextColor || 'white' }}>{website}</span>
                  <span className="text-sm font-bold ml-4" style={{ color: customDetailsTextColor || '#facc15' }}>বিস্তারিত কমেন্টে</span>
                </div>
              </div>

              {showSocialIcons && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: customSocialIconColor || 'white', color: '#1c1c1c' }}>
                    <Facebook size={20} />
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: customSocialIconColor || 'white', color: '#1c1c1c' }}>
                    <Twitter size={20} />
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: customSocialIconColor || 'white', color: '#1c1c1c' }}>
                    <Youtube size={20} />
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: customSocialIconColor || 'white', color: '#1c1c1c' }}>
                    <Instagram size={20} />
                  </div>
                </div>
              )}
            </div>
          </div>
      </div>

      {/* Vertical Hashtag */}
      {hashtag && (
        <div className="absolute top-[300px] right-12 z-20 pointer-events-none">
          <div className="transform rotate-90 origin-left">
            <span className="text-white/80 text-xl font-bold tracking-[0.5em] uppercase whitespace-nowrap">
              {hashtag}
            </span>
          </div>
        </div>
      )}

      {/* Bottom right decorative bar */}
      <div className="absolute bottom-12 right-0 w-48 h-4 bg-white/20" />
    </div>
  );
};
