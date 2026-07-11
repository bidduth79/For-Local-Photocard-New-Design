import React from 'react';
import { NewsDesignProps } from './types';
import { Globe, Facebook, Twitter, Youtube, Instagram, Share2 } from 'lucide-react';
import { GeometricOverlay } from './GeometricOverlays';

export const Design11: React.FC<NewsDesignProps> = ({
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
    <div className="w-full h-full flex-1 min-h-0 relative bg-[#0f172a] overflow-hidden flex flex-col">
      {/* Background Pattern Layer */}
      {renderBackgroundPattern()}

      {/* Professional Geometric Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Left Accent */}
        <div 
          className="absolute -top-20 -left-20 w-96 h-96 transform rotate-12 opacity-20"
          style={{ 
            background: `linear-gradient(135deg, ${themeColor} 0%, transparent 70%)`,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
          }}
        />
        
        {/* Bottom Right Accent */}
        <div 
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] transform -rotate-12 opacity-10"
          style={{ 
            background: `linear-gradient(315deg, ${themeColor} 0%, transparent 60%)`,
            borderRadius: '100px'
          }}
        />

        {/* Floating Geometric Lines */}
        <div className="absolute top-1/4 right-0 w-64 h-px bg-white/20 transform -rotate-45" />
        <div className="absolute top-1/3 right-10 w-48 h-px bg-white/10 transform -rotate-45" />
        <div className="absolute bottom-1/4 left-0 w-80 h-px bg-white/20 transform rotate-12" />
        
        {/* Dotted Grid Overlay (Subtle) */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      {/* Main Image Section */}
      <div className="relative flex-1 min-h-0 w-full z-10 p-8 pt-[116px]">
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10 relative group">
          {renderImage("w-full h-full object-cover")}
          
          {/* Image Overlays */}
          {overlayOpacity !== 0 && (
            <div className="absolute inset-0 bg-gradient-to-t [.export-video_&]:!bg-transparent from-black/80 via-transparent to-black/20 pointer-events-none" />
          )}
          
          {/* Date Badge */}
          <div className="absolute top-6 right-6 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full font-medium text-lg pointer-events-none" style={{ color: customDateColor || 'white', backgroundColor: customDateBgColor || 'rgba(255, 255, 255, 0.1)' }}>
            {formattedDate}
          </div>

          {/* Hashtag Overlay */}
          {hashtag && (
            <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-lg border border-white/10 pointer-events-none">
              <span className="text-white font-bold tracking-wider uppercase text-sm">
                #{hashtag.replace('#', '')}
              </span>
            </div>
          )}
        </div>

        {/* Decorative Corner Element */}
        <div 
          className="absolute bottom-4 right-4 w-24 h-24 z-20 pointer-events-none"
          style={{ 
            borderRight: `8px solid ${themeColor}`,
            borderBottom: `8px solid ${themeColor}`,
            borderRadius: '0 0 24px 0'
          }}
        />
      </div>

      {/* Content Section */}
      <div className="min-h-[550px] px-16 pt-4 pb-12 z-20 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="absolute top-0 left-16 right-16 h-[116px] flex items-center justify-between border-b border-white/10 z-30 pointer-events-none">
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
                  <div className="flex flex-col">
                    <span className="text-white font-black tracking-tight leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={brandStyle}>{brandName}</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <Share2 size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Exclusive</span>
            </div>
          </div>

          {/* Headline */}
          <div 
            className="font-black leading-[1.1] tracking-tight"
            style={{ 
              fontSize: `${headlineFontSize}px`,
              color: '#ffffff',
              fontFamily: headlineStyle?.fontFamily || 'inherit'
            }}
          >
            {renderFormattedTitle()}
          </div>

          {/* Description */}
          {showDetailedNewsBox && (
            <div className="relative">
              <div 
                className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: themeColor }}
            />
            <p 
              className="leading-relaxed font-medium pl-4"
              style={{
                fontSize: `${descriptionFontSize || 24}px`,
                color: descriptionColor || "rgba(255, 255, 255, 0.8)",
                textAlign: descriptionTextAlign || "left",
                fontFamily: 'sans-serif'
              }}
            >
              {description || "কনটেন্ট ইডিটর থেকে বিস্তারিত খবর লিখুন।"}
            </p>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="flex items-end justify-between pt-8 border-t border-white/10 mt-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm" style={{ color: customVisitTextColor || 'rgba(255,255,255,0.7)' }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <Globe size={16} style={{ color: customVisitTextColor || 'rgba(255,255,255,0.6)' }} />
                <span className="text-lg font-bold tracking-wide" style={{ color: customVisitTextColor || 'white' }}>{website}</span>
              </div>
            </div>

            {showSocialIcons && (
              <div className="flex items-center gap-3">
                {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer" style={{ color: customSocialIconColor || 'rgba(255,255,255,0.7)' }}>
                    <Icon size={18} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      {/* Side Decorative Bar */}
      <div className="absolute top-0 right-0 w-2 h-full opacity-30" style={{ backgroundColor: themeColor }} />

      {/* Professional Geometric Overlays */}
      {showGeometricShapes && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
        </div>
      )}
    </div>
  );
};
