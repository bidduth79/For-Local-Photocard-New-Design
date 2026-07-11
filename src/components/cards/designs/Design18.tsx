import React from 'react';
import { NewsDesignProps } from './types';
import { getContrastColor } from '../../../utils/colorUtils';
import { GeometricOverlay } from './GeometricOverlays';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

export const Design18: React.FC<NewsDesignProps> = ({
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
  socialIcon,
  socialHandle,
  showSocialIcons,
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
    <div className="relative w-full h-full flex-1 min-h-0 overflow-hidden bg-white [.export-video_&]:!bg-transparent">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {renderImage("w-full h-full object-cover")}
        {/* Gradient at the bottom for text readability */}
        {overlayOpacity !== 0 && (
          <div 
            className="absolute bottom-0 left-0 right-0 h-1/2 z-10"
            style={{ background: `linear-gradient(to top, ${themeColor}E6, ${themeColor}80, transparent)` }}
          ></div>
        )}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 z-10 opacity-60 mix-blend-multiply pointer-events-none">
        {renderBackgroundPattern()}
      </div>

      {/* Geometric Pattern */}
      {showGeometricShapes && (
        <div className="absolute inset-0 z-15 pointer-events-none">
          <GeometricOverlay 
            color={geometricShapeColor || themeColor} 
            opacity={geometricShapeOpacity} 
          />
        </div>
      )}

      {/* The Big Circle Background (Blended) */}
      <div 
        className="absolute z-20 rounded-full mix-blend-multiply aspect-square"
        style={{
          width: '110%',
          top: '-30%',
          left: '-5%',
          backgroundColor: 'transparent',
          borderColor: themeColor,
          borderWidth: 'clamp(120px, 15vw, 200px)',
          borderStyle: 'solid'
        }}
      />

      {/* The Big Circle Content (Not blended) */}
      <div 
        className="absolute z-30 rounded-full flex flex-col items-center justify-start aspect-square pointer-events-none"
        style={{
          width: '110%',
          top: '-30%',
          left: '-5%',
          borderColor: 'transparent',
          borderWidth: 'clamp(120px, 15vw, 200px)',
          borderStyle: 'solid'
        }}
      >
        {/* Content inside the circle */}
        <div className="absolute inset-0 flex flex-col items-center pt-[44%] px-[10%] pointer-events-auto">
          {/* Logo Area */}
          <div className="flex flex-col items-center mb-8 mt-4">
            {fullBrandLogo ? (
              <img 
                src={fullBrandLogo} 
                alt="Full Logo" 
                className="w-auto object-contain drop-shadow-sm" 
                style={{ height: `${fullBrandLogoHeight || 120}px` }}
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                {customLogo ? (
                  <img 
                    src={customLogo} 
                    alt="Logo" 
                    className="w-auto object-contain drop-shadow-sm" 
                    style={{ height: `${(brandFontSize || 40) * 2.5}px` }}
                  />
                ) : (
                  <div 
                    className="rounded-full flex items-center justify-center shadow-lg shrink-0 border-4 border-white" 
                    style={{ 
                      backgroundColor: customLogoBgColor || themeColor,
                      width: `${(brandFontSize || 40) * 2.5}px`,
                      height: `${(brandFontSize || 40) * 2.5}px`
                    }}
                  >
                    <span className="font-bold drop-shadow-md" style={{ fontSize: `${(brandFontSize || 40) * 1.2}px`, color: customLogoTextColor || 'white' }}>
                      {brandName ? brandName.charAt(0).toUpperCase() : ''}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Headline */}
          <div className="w-full text-center">
            <h1 
              className="font-bold leading-tight drop-shadow-md"
              style={{ 
                color: headlineColor || themeColor,
                fontSize: `${headlineFontSize || 48}px`,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                ...headlineStyle,
                textAlign: 'center'
              }}
            >
              {renderFormattedTitle()}
            </h1>
          </div>
        </div>
      </div>

      {/* Content at the bottom (Centered below the circle) */}
      <div 
        className="absolute left-0 right-0 bottom-0 z-40 px-12 flex flex-col items-center justify-center"
        style={{ top: '54%' }}
      >
        {description && showDetailedNewsBox !== false && (
          <div 
            className="font-bold leading-relaxed drop-shadow-md w-full max-w-[90%] flex flex-col justify-center"
            style={{ 
              color: descriptionColor || bgContrastColor,
              fontSize: `${descriptionFontSize || 32}px`,
              textAlign: descriptionTextAlign || 'center',
            }}
          >
            <div 
              className="quill-content"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-12 left-12 right-12 z-20 flex justify-between items-end pointer-events-none">
        <div className="flex items-center gap-4">
          {showSocialIcons && (
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: customSocialIconColor || bgContrastColor }}
                >
                  <Icon size={16} style={{ color: customSocialIconColor ? getContrastColor(customSocialIconColor) : themeColor }} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-medium text-lg tracking-wide drop-shadow-md px-3 py-1 rounded-full" style={{ color: customDateColor || bgContrastColor, opacity: customDateColor ? 1 : 0.9, backgroundColor: customDateBgColor || 'transparent' }}>{formattedDate}</span>
          <span className="font-medium text-xl tracking-wide drop-shadow-md" style={{ color: customVisitTextColor || bgContrastColor }}>{website || "www.website.com"}</span>
        </div>
      </div>
    </div>
  );
};
