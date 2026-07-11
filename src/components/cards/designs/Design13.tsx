import React from 'react';
import { NewsDesignProps } from './types';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import { GeometricOverlay } from './GeometricOverlays';

export const Design13: React.FC<NewsDesignProps> = ({
  themeColor,
  customLogo,
  fullBrandLogo,
  fullBrandLogoHeight,
  brandName,
  website,
  brandStyle,
  headlineFontSize,
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
  return (
    <div className="relative w-full h-full flex-1 min-h-0 bg-slate-900 [.export-video_&]:!bg-transparent overflow-hidden flex">
      {/* Background Pattern */}
      {renderBackgroundPattern()}

      {/* Main Image */}
      <div className="absolute inset-0 z-0">
        {renderImage("w-full h-full object-cover")}
        {showGeometricShapes && (
          <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
        )}
      </div>

      {/* Dark Overlay & Theme Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply" 
        style={{ 
          backgroundColor: themeColor,
          opacity: (overlayOpacity ?? 0) / 100 
        }} 
      />
      {overlayOpacity !== 0 && (
        <div className="absolute inset-0 bg-gradient-to-t [.export-video_&]:!bg-transparent from-black/90 via-transparent to-transparent z-10 pointer-events-none" />
      )}

      {/* Geometric Designs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] border-[40px] rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10" style={{ borderColor: themeColor }} />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] border-[60px] rounded-full opacity-10 translate-x-1/3 translate-y-1/3 pointer-events-none z-10" style={{ borderColor: themeColor }} />
      <div className="absolute top-1/4 left-12 w-2 h-32 opacity-80 pointer-events-none z-10" style={{ backgroundColor: themeColor }} />
      <div className="absolute bottom-1/4 right-12 w-32 h-2 opacity-80 pointer-events-none z-10" style={{ backgroundColor: themeColor }} />

      {/* Top Header (Date + Brand) */}
      <div className="absolute top-0 left-16 right-16 h-[116px] z-20 flex justify-between items-center pointer-events-none">
        {/* Date */}
        <span className="font-bold text-2xl tracking-wider drop-shadow-md px-4 py-2 rounded-full" style={{ color: customDateColor || 'white', backgroundColor: customDateBgColor || 'transparent' }}>
          {formattedDate}
        </span>

        {/* Logo & Brand Name */}
        <div className="flex items-center gap-4">
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
              <span className="text-white font-black tracking-wider drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={brandStyle}>{brandName}</span>
            </>
          )}
        </div>
      </div>

      {/* Right Vertical Text */}
      <div 
        className="absolute top-1/2 right-12 z-20 pointer-events-none transform -translate-y-1/2"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="text-white/80 font-medium text-sm tracking-[0.3em] uppercase">
          {hashtag || "FOLLOW US SO AS NOT TO MISS THE LATEST BREAKING NEWS"}
        </span>
      </div>

      {/* Footer Left (Website) */}
      <div className="absolute bottom-12 left-16 z-20 flex flex-col items-start gap-0 pointer-events-none">
          <span className="font-medium text-sm tracking-widest uppercase drop-shadow-md" style={{ color: customVisitTextColor || 'rgba(255,255,255,0.9)' }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
          <span className="font-bold text-2xl tracking-wide drop-shadow-md" style={{ color: customVisitTextColor || 'white' }}>{website || "username"}</span>
        </div>

      {/* Footer Right (Socials) */}
      {showSocialIcons && (
        <div className="absolute bottom-12 right-16 z-20 flex items-center gap-3 pointer-events-none">
          {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
            <div 
              key={i} 
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: customSocialIconColor || themeColor }}
            >
              <Icon size={20} className="text-white" />
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className={`absolute left-16 right-32 z-20 pointer-events-none transition-all duration-300 ${showDetailedNewsBox ? 'bottom-40 -translate-y-[150px]' : 'bottom-40'}`}>
        {/* Headline */}
        <div 
          className="font-black uppercase leading-[1.3] tracking-tight text-white drop-shadow-lg mb-6"
          style={{ 
            fontSize: `${headlineFontSize}px`,
            fontFamily: headlineStyle?.fontFamily || 'inherit'
          }}
        >
          {renderFormattedTitle()}
        </div>

        {/* Description */}
        {showDetailedNewsBox && (
          <p 
            className="leading-relaxed font-medium drop-shadow-md max-w-3xl mx-auto"
          style={{
            fontSize: `${descriptionFontSize || 24}px`,
            color: descriptionColor || "rgba(255, 255, 255, 0.9)",
            textAlign: descriptionTextAlign || "center",
            fontFamily: 'sans-serif'
          }}
        >
          {description || "কনটেন্ট ইডিটর থেকে বিস্তারিত খবর লিখুন।"}
        </p>
        )}
      </div>
    </div>
  );
};
