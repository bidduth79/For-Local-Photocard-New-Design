import React from 'react';
import { NewsDesignProps } from './types';
import { Calendar, CheckCircle2, Globe } from 'lucide-react';
import { getContrastColor } from '../../../utils/colorUtils';
import { GeometricOverlay } from './GeometricOverlays';

export const Design17: React.FC<NewsDesignProps> = ({
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
  image,
  image2,
  showGeometricShapes,
  geometricShapeColor,
  geometricShapeOpacity,
  textAlign,
  renderImage,
  cardGradientStart,
  cardGradientEnd,
  applyGradientToAll,
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
  
  const bgStyle = applyGradientToAll && cardGradientStart && cardGradientEnd
    ? { background: `linear-gradient(to bottom right, ${cardGradientStart}, ${cardGradientEnd})` }
    : { backgroundColor: cardGradientStart || '#ffffff' };

  return (
    <div 
      className="relative w-full h-full flex-1 min-h-0 overflow-hidden flex flex-col"
      style={bgStyle}
    >
      {/* Background Pattern */}
      {renderBackgroundPattern()}

      {/* Top Header Area */}
      <div 
        className="relative z-20 pt-10 px-12 flex justify-between items-center shadow-sm pb-6"
        style={{ backgroundColor: applyGradientToAll ? 'transparent' : (cardGradientStart || '#ffffff') }}
      >
        {/* Logo Area */}
        <div className="flex items-center">
          {fullBrandLogo ? (
            <img 
              src={fullBrandLogo} 
              alt="Full Logo" 
              className="w-auto object-contain" 
              style={{ height: `${fullBrandLogoHeight || 80}px` }}
            />
          ) : (
            <div className="flex items-center gap-4">
              {customLogo ? (
                <img 
                  src={customLogo} 
                  alt="Logo" 
                  className="w-auto object-contain" 
                  style={{ height: `${(brandFontSize || 40) * 1.2}px` }}
                />
              ) : (
                <div 
                  className="rounded-full flex items-center justify-center shadow-lg shrink-0 border-2 border-white" 
                  style={{ 
                    backgroundColor: customLogoBgColor || themeColor,
                    width: `${(brandFontSize || 40) * 1.2}px`,
                    height: `${(brandFontSize || 40) * 1.2}px`
                  }}
                >
                  <span className="font-bold drop-shadow-md" style={{ fontSize: `${(brandFontSize || 40) * 0.6}px`, color: customLogoTextColor || 'white' }}>
                    {brandName ? brandName.charAt(0).toUpperCase() : ''}
                  </span>
                </div>
              )}
              <span className="font-bold tracking-widest" style={{ ...brandStyle, color: brandColor || themeColor }}>
                {brandName}
              </span>
            </div>
          )}
        </div>

        {/* Date Badge */}
        <div className="flex items-center gap-3 px-6 py-3 rounded-full" style={{ backgroundColor: customDateBgColor || '#f3f4f6' }}>
          <Calendar className="w-6 h-6" style={{ color: customDateColor || '#4b5563' }} />
          <span className="font-semibold text-2xl" style={{ color: customDateColor || '#374151' }}>
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-12 gap-8 relative z-10">
        
        {/* Headline */}
        <div className="w-full">
          <h1 
            className="font-bold leading-tight drop-shadow-sm"
            style={{ 
              ...headlineStyle,
              color: headlineColor || '#111827',
              fontSize: `${headlineFontSize || 72}px`,
              textAlign: textAlign || 'left'
            }}
          >
            {renderFormattedTitle()}
          </h1>
        </div>

        {/* Double Image Container */}
        <div className="flex-1 flex gap-6 w-full min-h-0">
          {/* First Image */}
          <div className="flex-1 relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gray-100">
            {image ? (
              <div className="absolute inset-0 w-full h-full">
                {renderImage("absolute inset-0 w-full h-full object-cover", image)}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400 text-2xl font-medium">Image 1</span>
              </div>
            )}
            {/* Gradient Overlay for first image */}
            {overlayOpacity !== 0 && (
              <div className="absolute inset-0 bg-gradient-to-t [.export-video_&]:!bg-transparent [&.export-video]:!bg-transparent from-black/40 via-transparent to-transparent pointer-events-none" />
            )}
          </div>

          {/* Second Image */}
          <div className="flex-1 relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gray-100">
            {image2 ? (
              <div className="absolute inset-0 w-full h-full">
                {renderImage("absolute inset-0 w-full h-full object-cover", image2, true)}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400 text-2xl font-medium">Image 2</span>
              </div>
            )}
            {/* Gradient Overlay for second image */}
            {overlayOpacity !== 0 && (
              <div className="absolute inset-0 bg-gradient-to-t [.export-video_&]:!bg-transparent [&.export-video]:!bg-transparent from-black/40 via-transparent to-transparent pointer-events-none" />
            )}
          </div>
        </div>

        {/* Description / Subtext (Optional) */}
        {description && showDetailedNewsBox !== false && (
          <div className="w-full bg-gray-50 p-8 rounded-2xl border-l-8 shadow-sm" style={{ borderColor: themeColor }}>
            <p 
              className="leading-relaxed"
              style={{ 
                fontSize: `${descriptionFontSize || 32}px`,
                color: descriptionColor || '#4b5563',
                textAlign: descriptionTextAlign || 'left'
              }}
            >
              {description}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div 
        className="relative z-20 py-6 px-12 flex justify-between items-center"
        style={{ backgroundColor: themeColor }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: customSocialIconColor || 'rgba(255,255,255,0.2)' }}>
            <Globe className="w-6 h-6" style={{ color: customSocialIconColor ? getContrastColor(customSocialIconColor) : 'white' }} />
          </div>
          <span className="text-2xl font-medium tracking-wide opacity-90" style={{ color: customVisitTextColor || 'white' }}>
            {website || "www.news.com"}
          </span>
        </div>
        
        {showGeometricShapes && (
          <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
        )}
      </div>
    </div>
  );
};
