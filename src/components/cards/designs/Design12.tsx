import React from 'react';
import { NewsDesignProps } from './types';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import { GeometricOverlay } from './GeometricOverlays';

export const Design12: React.FC<NewsDesignProps> = ({
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
    <div className="relative w-full h-full flex-1 min-h-0 bg-black [.export-video_&]:!bg-transparent [&.export-video]:!bg-transparent overflow-hidden flex">
      {/* Background Pattern */}
      {renderBackgroundPattern()}

      {/* Main Image */}
      <div className="absolute top-0 left-0 right-0 bottom-[150px] z-0">
        {renderImage("w-full h-full object-cover")}
        {showGeometricShapes && (
          <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
        )}
      </div>

      {/* Bottom Dark Gradient for text readability */}
      {overlayOpacity !== 0 && (
        <div className="absolute inset-0 bg-gradient-to-t [.export-video_&]:!bg-transparent [&.export-video]:!bg-transparent from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
      )}

      {/* Left Sidebar */}
      <div 
        className="absolute top-0 left-0 bottom-0 w-[32%] z-10 overflow-hidden"
        style={{ backgroundColor: themeColor }}
      >
        {/* Sidebar Decorative Circles */}
        <div className="absolute top-0 left-0 w-[150%] pt-[150%] rounded-full bg-black/10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-[150%] pt-[150%] rounded-full bg-black/10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        {/* BREAKING NEWS Text */}
        <div 
          className="absolute bottom-[400px] left-1/2 pointer-events-none"
          style={{ 
            transform: 'translateX(-50%) rotate(180deg)',
            writingMode: 'vertical-rl'
          }}
        >
          <span 
            className="text-[110px] font-black tracking-[0.2em] text-transparent whitespace-nowrap"
            style={{ 
              WebkitTextStroke: '2px rgba(255,255,255,0.6)',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            {hashtag || "BREAKING NEWS"}
          </span>
        </div>
      </div>

      {/* Thin White Circle Overlay */}
      <div className="absolute top-[30%] left-[32%] w-[500px] h-[500px] rounded-full border border-white/30 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" />

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

      {/* Right Decorative Lines */}
      <div className="absolute top-[30%] right-12 z-20 flex flex-col gap-3 pointer-events-none items-end">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[3px] bg-white/80 w-24" />
        ))}
      </div>

      {/* Bottom Content */}
      <div className={`absolute left-16 right-16 z-20 pointer-events-none transition-all duration-300 ${showDetailedNewsBox ? 'bottom-28 -translate-y-[150px]' : 'bottom-32'}`}>
        {/* Title */}
        <div 
          className="font-black uppercase leading-[1.1] tracking-tight text-white drop-shadow-lg mb-6"
          style={{ 
            fontSize: `${headlineFontSize}px`,
            fontFamily: headlineStyle?.fontFamily || 'inherit'
          }}
        >
          {renderFormattedTitle()}
        </div>

        {/* Decorative Line */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-4 h-4 rounded-full bg-white" />
          <div className="w-3 h-3 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="flex-1 h-[3px] bg-white/50 ml-2" />
        </div>

        {/* Description */}
        {showDetailedNewsBox && (
          <div className="max-w-[85%] mx-auto">
          <p 
            className="leading-relaxed font-medium drop-shadow-md"
            style={{
              fontSize: `${descriptionFontSize || 24}px`,
              color: descriptionColor || "rgba(255, 255, 255, 0.9)",
              textAlign: descriptionTextAlign || "center",
              fontFamily: 'sans-serif'
            }}
          >
            {description || "কনটেন্ট ইডিটর থেকে বিস্তারিত খবর লিখুন।"}
          </p>
          </div>
        )}
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
    </div>
  );
};
