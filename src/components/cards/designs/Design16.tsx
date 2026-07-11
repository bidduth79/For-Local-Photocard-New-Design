import React from 'react';
import { NewsDesignProps } from './types';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { getContrastColor } from '../../../utils/colorUtils';
import { GeometricOverlay } from './GeometricOverlays';

export const Design16: React.FC<NewsDesignProps> = ({
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
  headlineStyle,
  brandFontSize,
  description,
  descriptionFontSize,
  descriptionColor,
  descriptionTextAlign,
  showDetailedNewsBox,
  renderBackgroundPattern,
  renderImage,
  showGeometricShapes,
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
  
  // Parse description into bullet points
  const bulletPoints = description 
    ? description.split('\n').filter(line => line.trim().length > 0)
    : [
        "১৯৭১: বঙ্গবন্ধু শেখ মুজিবুর রহমান অসহযোগ আন্দোলনের ডাক দেন।",
        "১৯৭২: বাংলাদেশ আনসার বাহিনী গঠিত হয়।",
        "বিশ্ব বন্যপ্রাণী দিবস।"
      ];

  return (
    <div className="relative w-full h-full flex-1 min-h-0 overflow-hidden flex flex-col bg-[#f8f9fa]">
      {/* Background Pattern */}
      {renderBackgroundPattern()}

      {/* Decorative Header Background */}
      <div 
        className="relative w-full rounded-b-[60px] shadow-sm overflow-hidden shrink-0 pt-16 px-16 pb-16 flex flex-col items-center text-center z-10"
        style={{ 
          background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)`,
        }}
      >
        {renderImage && renderImage("absolute inset-0 w-full h-full")}
        {overlayOpacity !== 0 && (
          <div className="absolute inset-0 bg-black/30 [.export-video_&]:!bg-transparent" />
        )}
        {/* Subtle overlay pattern for header */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        {showGeometricShapes && (
          <div className="absolute inset-0 pointer-events-none">
            <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
          </div>
        )}

        <div className="relative z-20 w-full flex flex-col items-center">
          {/* Logo Area */}
          <div className="mb-8 flex flex-col items-center">
            {fullBrandLogo ? (
              <img 
                src={fullBrandLogo} 
                alt="Full Logo" 
                className="w-auto object-contain drop-shadow-md" 
                style={{ height: `${fullBrandLogoHeight || 120}px` }}
              />
            ) : (
              <div className="flex items-center gap-4">
                {customLogo && (
                  <img 
                    src={customLogo} 
                    alt="Logo" 
                    className="w-auto object-contain drop-shadow-md" 
                    style={{ height: `${(brandFontSize || 40) * 1.5}px` }}
                  />
                )}
                <span className="font-bold tracking-widest drop-shadow-md" style={{ ...brandStyle, color: customLogoTextColor || (renderImage ? 'white' : bgContrastColor) }}>
                  {brandName}
                </span>
              </div>
            )}
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-4 backdrop-blur-md px-10 py-5 rounded-full border border-white/30 shadow-lg" style={{ backgroundColor: customDateBgColor || 'rgba(255, 255, 255, 0.2)' }}>
            <Calendar className="w-10 h-10" style={{ color: customDateColor || (renderImage ? 'white' : bgContrastColor) }} />
            <span className="font-bold text-4xl tracking-wide" style={{ color: customDateColor || (renderImage ? 'white' : bgContrastColor) }}>
              {formattedDate}
            </span>
          </div>

          {/* Main Title */}
          <div 
            className="font-black leading-tight tracking-tight max-w-[900px] mt-10"
            style={{ 
              fontSize: `${headlineFontSize || 80}px`,
              color: headlineColor || (renderImage ? 'white' : '#111827'),
              fontFamily: headlineStyle?.fontFamily || 'inherit',
              textShadow: renderImage ? '0 4px 12px rgba(0,0,0,0.5)' : 'none'
            }}
          >
            {renderFormattedTitle()}
          </div>
        </div>
      </div>

      {/* Description (Below Image) */}
      <div className={`relative z-20 flex-1 min-h-0 px-16 pb-28 flex flex-col justify-start pt-8 items-center text-center`}>
        {/* Content Card (The Bullet Points) */}
        {showDetailedNewsBox !== false && (
          <div className="w-full bg-white/90 backdrop-blur-md rounded-[40px] shadow-2xl p-16 flex flex-col gap-8 border border-white/50 relative overflow-hidden text-left shrink-0">
            {/* Decorative quote mark watermark */}
            <div className="absolute -top-10 -right-10 text-[200px] opacity-5 font-serif leading-none pointer-events-none" style={{ color: themeColor }}>
              "
            </div>

            {bulletPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-6 group">
                <div className="mt-2 shrink-0">
                  <CheckCircle2 
                    className="w-10 h-10 transition-transform group-hover:scale-110" 
                    style={{ color: themeColor }} 
                  />
                </div>
                <p 
                  className="leading-relaxed font-medium"
                  style={{
                    fontSize: `${descriptionFontSize || 32}px`,
                    color: descriptionColor || '#374151',
                    textAlign: descriptionTextAlign || "left",
                  }}
                >
                  {point.replace(/^[•\-\*]\s*/, '')} {/* Remove existing bullets if any */}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center items-center">
        <div className="px-8 py-3 rounded-full shadow-md border border-gray-100" style={{ backgroundColor: customLogoBgColor || 'white' }}>
          <span className="font-bold text-xl tracking-wider" style={{ color: customVisitTextColor || themeColor }}>
            {website || "www.website.com"}
          </span>
        </div>
      </div>
    </div>
  );
};
