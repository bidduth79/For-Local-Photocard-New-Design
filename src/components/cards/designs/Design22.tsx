import React from 'react';
import { NewsDesignProps } from './types';
import { getContrastColor } from '../../../utils/colorUtils';
import { QRCodeSVG } from 'qrcode.react';

export const Design22: React.FC<NewsDesignProps> = ({
  title,
  themeColor,
  customLogo,
  fullBrandLogo,
  brandName,
  website,
  brandColor,
  renderFormattedTitle,
  renderImage,
  headlineStyle,
  headlineColor,
  formattedDate,
  customLogoBgColor,
  qrValue,
  customQrColor,
  customVisitTextColor,
  customDetailsTextColor
}) => {
  const primaryColor = themeColor || '#064e3b';
  const logoBorderColor = brandColor || '#facc15';
  const bgContrastColor = getContrastColor(primaryColor);
  
  return (
    <div className="absolute inset-0 bg-gray-900 [.export-video_&]:!bg-transparent [&.export-video]:!bg-transparent z-0 overflow-hidden pointer-events-none">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {renderImage("w-full h-full object-cover")}
      </div>
      
      {/* Top Left Brand & Date */}
      <div className="absolute top-12 left-16 z-20 flex flex-col items-start drop-shadow-md">
        <span className="text-5xl font-bold text-white shadow-black drop-shadow-xl" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.8)' }}>
          {brandName}
        </span>
        {formattedDate && (
          <span className="text-3xl font-medium text-white/90 drop-shadow mt-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {formattedDate}
          </span>
        )}
      </div>

      {/* Footer Area */}
      <div className="absolute bottom-0 left-0 right-0 h-28 w-full flex items-center justify-between px-16 pointer-events-auto shrink-0 z-40" style={{ backgroundColor: primaryColor, color: bgContrastColor }}>
         <div className="flex items-center gap-4">
            <div className="bg-white p-1.5 rounded flex items-center gap-2">
               <span className="text-sm font-bold px-2 text-gray-800">স্ক্যান করুন</span>
               <QRCodeSVG value={qrValue || website || 'https://www.google.com'} size={60} level="M" fgColor={customQrColor || "#000000"} />
            </div>
            <div className="flex flex-col justify-center">
               <span className="text-sm font-medium" style={{ opacity: 0.9, color: customVisitTextColor || bgContrastColor }}>আরও বিস্তারিত জানতে ভিজিট করুন</span>
               <span className="text-2xl font-bold" style={{ color: customVisitTextColor || bgContrastColor }}>{website}</span>
            </div>
         </div>
         <div className="text-2xl font-bold flex items-center h-full" style={{ color: customDetailsTextColor || bgContrastColor }}>বিস্তারিত কমেন্টে</div>
      </div>

      {/* Bottom Slanted Banner (Moved Up) */}
      <div className="absolute bottom-28 left-0 w-full h-[400px] z-10">
        <svg className="w-full h-full" viewBox="0 0 1080 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="bannerGrad22" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
              <stop offset="100%" stopColor="#022c22" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <polygon points="0,50 1080,200 1080,400 0,400" fill="url(#bannerGrad22)" />
          <line x1="0" y1="50" x2="1080" y2="200" stroke={logoBorderColor} strokeWidth="15" />
          <line x1="0" y1="15" x2="1080" y2="165" stroke="white" strokeWidth="8" strokeDasharray="0, 25" strokeLinecap="round" />
        </svg>
      </div>

      {/* Logo Container */}
      <div 
        className="absolute z-20 flex items-center justify-center rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-white"
        style={{ 
          width: '320px', 
          height: '320px',
          left: '60px',
          bottom: '220px',
          border: `15px solid ${logoBorderColor}`
        }}
      >
        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center p-2 bg-white">
            {customLogo ? (
                <img src={customLogo} alt="Logo" className="w-full h-full object-contain rounded-full" />
            ) : fullBrandLogo ? (
                <img src={fullBrandLogo} alt="Logo" className="w-full h-full object-contain rounded-full" />
            ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: customLogoBgColor || primaryColor }}>
                    <span className="font-bold uppercase text-white" style={{ fontSize: '120px' }}>
                        {brandName ? brandName.charAt(0) : ''}
                    </span>
                </div>
            )}
        </div>
      </div>

      {/* Title Area Above Footer */}
      <div className="absolute bottom-[220px] left-[420px] right-16 z-20 flex flex-col justify-center min-h-[200px]">
        {title && (
          <h2 
            className="font-bold drop-shadow-lg line-clamp-4"
            style={{ 
              ...headlineStyle, 
              color: headlineColor || 'white',
              fontSize: `${(headlineStyle?.fontSize ? parseInt(headlineStyle.fontSize as string) : 52) * 0.9}px`,
              textShadow: '0 4px 8px rgba(0,0,0,0.5)'
            }}
          >
            {renderFormattedTitle()}
          </h2>
        )}
      </div>
    </div>
  );
};
