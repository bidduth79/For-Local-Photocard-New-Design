import React from "react";
import { NewsDesignProps } from "./types";
import { getContrastColor } from "../../../utils/colorUtils";
import { QRCodeSVG } from "qrcode.react";
import { GeometricOverlay } from "./GeometricOverlays";
import { useAppStore } from "../../../store/appStore";

export const Design20: React.FC<NewsDesignProps> = ({
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
  image,
  showSocialIcons,
  hashtag,
  qrValue,
  renderImage,
  renderBackgroundPattern,
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
  overlayOpacity,
  videoFit,
  videoBgColor,
}) => {
  const bgContrastColor = getContrastColor(themeColor);
  const { videoLogo, videoLogoScale, videoLogoX, videoLogoY } = useAppStore();
  const rectRef = React.useRef<SVGRectElement>(null);

  React.useEffect(() => {
    let animationFrameId: number;
    const updateProgress = () => {
      const video = document.getElementById(
        "main-photocard-video",
      ) as HTMLVideoElement;
      if (video && video.duration && rectRef.current) {
        const currentProgress =
          100 - (video.currentTime / video.duration) * 100;
        rectRef.current.style.strokeDashoffset = currentProgress.toString();
      }
      animationFrameId = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-full flex-1 min-h-0 overflow-hidden bg-black [.export-video_&]:!bg-transparent">
      <svg className="absolute inset-0 w-full h-full z-50 pointer-events-none hide-on-export">
        <rect
          ref={rectRef}
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke={themeColor}
          strokeWidth="20"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          className="transition-none"
        />
      </svg>
      

      
      {/* Video Logo Overlay */}
      {videoLogo && (
        <div 
          className="absolute z-50 pointer-events-none flex items-center justify-center"
          style={{
            left: '50%',
            top: videoLogoY !== 0 ? `${videoLogoY}px` : (videoFit === 'contain' ? '386px' : '150px'),
            transform: `translate(calc(-50% + ${videoLogoX}px), -50%) scale(${videoLogoScale / 100})`,
          }}
        >
          {videoLogo.startsWith('data:video/') ? (
            <video src={videoLogo} autoPlay loop muted playsInline className="max-w-full max-h-full object-contain video-logo-layer" />
          ) : (
            <img src={videoLogo} alt="Video Logo" className="max-w-full max-h-full object-contain" />
          )}
        </div>
      )}

      
      {/* Fullscreen Background Image/Video with Zoom/Pan Support */}
      {renderBackgroundPattern()}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        {image ? (
          renderImage("w-full h-full object-cover")
        ) : (
          <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center border-2 border-dashed border-white/20">
            <svg
              className="w-16 h-16 text-white/40 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="text-white/40 font-medium text-2xl">
              Upload a video or image
            </span>
          </div>
        )}
      </div>

      {/* Geometric Shapes & Patterns */}
      {showGeometricShapes && (
        <div className="absolute inset-0 z-20 pointer-events-none fg-layer">
          <GeometricOverlay color={geometricShapeColor} opacity={geometricShapeOpacity} />
        </div>
      )}
      
      {/* Gradient Overlay for Text Readability */}
      {overlayOpacity !== 0 && (
        <div className="absolute inset-0 z-10 bg-gradient-to-t [.export-video_&]:!bg-transparent from-black/90 via-black/40 to-transparent pointer-events-none fg-layer" />
      )}

      {/* Logo Overlay */}
      <div className="absolute top-0 left-16 right-16 h-[116px] flex items-center justify-between pointer-events-none z-40 fg-layer">
        <div className="flex items-center justify-start gap-3">
          {fullBrandLogo ? (
            <img
              src={fullBrandLogo}
              alt="Full Logo"
              className="object-contain shrink-0 drop-shadow-md"
              style={{ height: `${fullBrandLogoHeight || 150}px` }}
            />
          ) : (
            <>
              {customLogo ? (
                <img
                  src={customLogo}
                  alt="Brand"
                  className="object-contain shrink-0 drop-shadow-lg"
                  style={{ height: `${(brandFontSize || 40) * 1.5}px` }}
                />
              ) : (
                <div
                  className="rounded-full flex items-center justify-center shadow-lg shrink-0 border-2 border-white"
                  style={{
                    backgroundColor: customLogoBgColor || themeColor,
                    width: `${(brandFontSize || 40) * 1.5}px`,
                    height: `${(brandFontSize || 40) * 1.5}px`,
                  }}
                >
                  <span
                    className="font-bold drop-shadow-md"
                    style={{
                      fontSize: `${(brandFontSize || 40) * 0.8}px`,
                      color: customLogoTextColor || "white",
                    }}
                  >
                    {brandName ? brandName.charAt(0).toUpperCase() : ""}
                  </span>
                </div>
              )}
              <h1
                className="font-bold whitespace-nowrap leading-normal drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
                style={{
                  ...brandStyle,
                  color: brandColor || "#ffffff",
                  fontSize: `${brandFontSize || 40}px`,
                }}
              >
                {brandName}
              </h1>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span
            className="font-bold text-xl px-4 py-2 rounded-lg shadow-sm"
            style={{
              backgroundColor: customDateBgColor || themeColor,
              color: customDateColor || bgContrastColor,
            }}
          >
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Content Area (Expands Upwards) */}
      {videoFit === 'contain' ? (
        <div className="absolute left-10 right-10 flex flex-col items-center justify-center pointer-events-none z-30 fg-layer" style={{ top: '1264px', bottom: '112px' }}>
          <div className="w-full text-center">
            {hashtag && (
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-lg drop-shadow-md">
                  {hashtag}
                </span>
              </div>
            )}
            <h1
              className="font-black leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              style={{
                color: headlineColor || "#ffffff",
                fontSize: `${headlineFontSize || 100}px`,
                textShadow: `3px 3px 0 ${themeColor}, -3px -3px 0 ${themeColor}, 3px -3px 0 ${themeColor}, -3px 3px 0 ${themeColor}, 0 8px 15px rgba(0,0,0,0.6)`,
                ...headlineStyle,
                textAlign: "center",
                lineHeight: "1.1",
              }}
            >
              {renderFormattedTitle()}
            </h1>
          </div>
        </div>
      ) : (
        <div className="absolute inset-x-10 bottom-36 top-[116px] z-30 flex flex-col justify-end pointer-events-none pb-6 fg-layer">
          <div className="w-full text-center">
            {hashtag && (
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-lg drop-shadow-md">
                  {hashtag}
                </span>
              </div>
            )}
            <h1
              className="font-black leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              style={{
                color: headlineColor || "#ffffff",
                fontSize: `${headlineFontSize || 100}px`,
                textShadow: `3px 3px 0 ${themeColor}, -3px -3px 0 ${themeColor}, 3px -3px 0 ${themeColor}, -3px 3px 0 ${themeColor}, 0 8px 15px rgba(0,0,0,0.6)`,
                ...headlineStyle,
                textAlign: "center",
                lineHeight: "1.1",
              }}
            >
              {renderFormattedTitle()}
            </h1>
          </div>
        </div>
      )}

      {/* Footer Area */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 w-full flex items-center justify-between px-16 pointer-events-auto shrink-0 z-40 fg-layer"
        style={{ backgroundColor: themeColor, color: bgContrastColor }}
      >
        <div className="flex items-center gap-4">
          <div className="bg-white p-1.5 rounded flex items-center gap-2">
            <span className="text-sm font-bold px-2 text-gray-800">
              স্ক্যান করুন
            </span>
            <QRCodeSVG
              value={qrValue}
              size={60}
              level="M"
              fgColor={customQrColor || "#000000"}
            />
          </div>
          <div className="flex flex-col justify-center">
            <span
              className="text-sm font-medium"
              style={{
                opacity: 0.9,
                color: customVisitTextColor || bgContrastColor,
              }}
            >
              আরও বিস্তারিত জানতে ভিজিট করুন
            </span>
            <span
              className="text-2xl font-bold"
              style={{ color: customVisitTextColor || bgContrastColor }}
            >
              {website}
            </span>
          </div>
        </div>
        <div
          className="flex items-center gap-6 text-xl font-bold"
          style={{ color: customDetailsTextColor || bgContrastColor }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>45K</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span>1.2M</span>
          </div>
        </div>
      </div>
    </div>
  );
};
