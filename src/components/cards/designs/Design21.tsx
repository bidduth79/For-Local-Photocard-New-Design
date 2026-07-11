import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { NewsDesignProps } from './types';
import { getContrastColor } from '../../../utils/colorUtils';

export const Design21: React.FC<NewsDesignProps> = ({
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
  brandColor,
  headlineColor,
  renderFormattedTitle,
  renderImage,
  renderBackgroundPattern,
  brandStyle,
  headlineStyle,
  brandFontSize,
  gradientStart,
  gradientEnd,
  description,
  hashtag,
  descriptionOffsetX,
  descriptionOffsetY,
  descriptionTextAlign,
  descriptionFontSize,
  descriptionColor,
  descriptionBgColor,
  showDescriptionBg,
  customDateColor,
  customDateBgColor,
  customDetailsTextColor,
  customVisitTextColor,
  customLogoTextColor,
  customLogoBgColor,
  customQrColor,
}) => {
  const bgContrastColor = getContrastColor('#111827');

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background: `linear-gradient(135deg, ${gradientStart || themeColor}, ${gradientEnd || themeColor})`,
      }}
    >
      {/* Grunge / Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      {/* Large Abstract Background Quotes */}
      <svg viewBox="0 0 24 24" fill="#fef08a" className="absolute w-[800px] h-[800px] opacity-[0.15] -left-[100px] -bottom-[150px] z-0 pointer-events-none">
        <path d="M14.017 18L16.037 11.855C14.773 11.855 13.784 11.444 13.071 10.621C12.358 9.798 12 8.758 12 7.5C12 6.046 12.553 4.766 13.661 3.661C14.768 2.553 16.071 2 17.568 2C19.231 2 20.603 2.596 21.684 3.787C22.766 4.979 23.307 6.493 23.307 8.332C23.307 10.633 22.656 12.932 21.353 15.23C20.051 17.528 18.256 19.062 15.969 19.833L14.017 18ZM3.017 18L5.037 11.855C3.773 11.855 2.784 11.444 2.071 10.621C1.358 9.798 1 8.758 1 7.5C1 6.046 1.553 4.766 2.661 3.661C3.768 2.553 5.071 2 6.568 2C8.231 2 9.603 2.596 10.684 3.787C11.766 4.979 12.307 6.493 12.307 8.332C12.307 10.633 11.656 12.932 10.353 15.23C9.051 17.528 7.256 19.062 4.969 19.833L3.017 18Z" />
      </svg>
      <svg viewBox="0 0 24 24" fill="#fef08a" className="absolute w-[600px] h-[600px] opacity-[0.1] right-[100px] top-[100px] z-0 pointer-events-none rotate-180">
        <path d="M14.017 18L16.037 11.855C14.773 11.855 13.784 11.444 13.071 10.621C12.358 9.798 12 8.758 12 7.5C12 6.046 12.553 4.766 13.661 3.661C14.768 2.553 16.071 2 17.568 2C19.231 2 20.603 2.596 21.684 3.787C22.766 4.979 23.307 6.493 23.307 8.332C23.307 10.633 22.656 12.932 21.353 15.23C20.051 17.528 18.256 19.062 15.969 19.833L14.017 18ZM3.017 18L5.037 11.855C3.773 11.855 2.784 11.444 2.071 10.621C1.358 9.798 1 8.758 1 7.5C1 6.046 1.553 4.766 2.661 3.661C3.768 2.553 5.071 2 6.568 2C8.231 2 9.603 2.596 10.684 3.787C11.766 4.979 12.307 6.493 12.307 8.332C12.307 10.633 11.656 12.932 10.353 15.23C9.051 17.528 7.256 19.062 4.969 19.833L3.017 18Z" />
      </svg>

      {/* Main White Bubble */}
      <div className="absolute top-[160px] left-[60px] w-[960px] h-[550px] bg-white rounded-[40px] rounded-br-[200px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 pointer-events-none overflow-hidden">
        {renderBackgroundPattern()}
      </div>

      {/* Speaker Image */}
      <div className="absolute bottom-[100px] right-0 z-[15] pointer-events-auto" style={{ width: '600px', height: '700px' }}>
        {renderImage("w-full h-full object-cover object-bottom", image)}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex-1 min-h-0 flex flex-col px-16 pb-8 pt-8 pointer-events-none">
        
        {/* Header from Design 7 */}
        <div className="flex justify-between items-center mb-8 shrink-0 h-[116px]">
            <div className="flex items-center justify-start max-w-[60%]">
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
                    <span className="font-bold tracking-widest uppercase border-b-2 pb-1 whitespace-nowrap" style={{ ...brandStyle, borderColor: brandColor || bgContrastColor, color: brandColor || bgContrastColor }}>{brandName}</span>
                  )}
                </>
              )}
            </div>
            <span className="text-xl px-4 py-2 rounded-full font-medium" style={{ color: customDateColor || bgContrastColor, opacity: customDateColor ? 1 : 0.8, backgroundColor: customDateBgColor || 'transparent' }}>
              {formattedDate}
            </span>
        </div>

        {/* Quote Text */}
        <div className="absolute top-[200px] left-[110px] w-[860px] z-30 pointer-events-none">
          <h2 
            className="leading-[1.6] drop-shadow-sm relative z-10 w-full"
            style={{ ...headlineStyle, color: headlineColor || '#111827' }}
          >
            {title ? renderFormattedTitle() : "এখানে আপনার উক্তি লিখুন..."}
          </h2>
        </div>

        {/* Speaker Info Box */}
        <div 
          className={`absolute px-8 py-5 rounded-lg shadow-md z-30 pointer-events-none flex flex-col ${showDescriptionBg !== false ? '' : '!bg-transparent !shadow-none !p-0'}`}
          style={{ 
            backgroundColor: showDescriptionBg !== false ? (descriptionBgColor || '#fef266') : 'transparent',
            top: `${620 + (descriptionOffsetY || 0)}px`, 
            left: `${320 + (descriptionOffsetX || 0)}px`,
            textAlign: descriptionTextAlign || 'left',
            alignItems: descriptionTextAlign === 'center' ? 'center' : (descriptionTextAlign === 'right' ? 'flex-end' : 'flex-start')
          }}
        >
          <div 
            className="font-bold font-bengali flex items-center gap-2 tracking-tight"
            style={{
              fontSize: `${descriptionFontSize || 32}px`,
              color: descriptionColor || '#111827',
              lineHeight: 1.2,
              fontFamily: headlineStyle?.fontFamily || 'inherit'
            }}
          >
            <span style={{ color: descriptionColor || '#111827' }}>-</span> <span>{description || "নাম লিখুন"}</span>
          </div>
          {hashtag && (
            <div 
              className="font-bengali font-medium mt-1" 
              style={{ 
                paddingLeft: descriptionTextAlign === 'left' ? '1.5rem' : '0',
                fontSize: `${(descriptionFontSize || 32) * 0.625}px`, // 20px / 32px
                color: descriptionColor || '#1f2937',
                opacity: 0.9,
                lineHeight: 1.2,
                fontFamily: headlineStyle?.fontFamily || 'inherit'
              }}
            >
              {hashtag}
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-0"></div>

        {/* Footer Elements from Design 7 */}
        <div className="flex justify-between items-center pointer-events-auto shrink-0 z-40 mt-auto">
            <div className="flex flex-col items-center justify-center text-center">
              {/* Website Initial Icon */}
              <div 
                className="rounded-full bg-white border-2 flex items-center justify-center mb-4 shadow-lg shrink-0 border-white" 
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
              <span className="text-lg mb-1 font-medium bg-black/30 px-2 rounded w-fit" style={{ color: customVisitTextColor || bgContrastColor, opacity: customVisitTextColor ? 1 : 0.9 }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
              <span className="text-3xl font-bold drop-shadow-md bg-black/30 px-2 rounded w-fit" style={{ color: customVisitTextColor || (bgContrastColor === '#FFFFFF' ? '#facc15' : bgContrastColor) }}>{website}</span>
            </div>
        </div>
      </div>
    </div>
  );
};
