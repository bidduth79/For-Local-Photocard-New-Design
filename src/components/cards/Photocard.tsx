import React, { forwardRef, useRef, useState } from "react";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { Globe, CheckCircle2, ChevronDown, Calendar, Link as LinkIcon, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, FlipHorizontal } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { SavedFont } from "../../hooks/useFonts";
import { useFontDataUrl } from "../../hooks/useFontDataUrl";
import { NewsDesignProps } from "./designs/types";

const Design0 = React.lazy(() => import('./designs/Design0').then(module => ({ default: module.Design0 })));
const Design1 = React.lazy(() => import('./designs/Design1').then(module => ({ default: module.Design1 })));
const Design2 = React.lazy(() => import('./designs/Design2').then(module => ({ default: module.Design2 })));
const Design3 = React.lazy(() => import('./designs/Design3').then(module => ({ default: module.Design3 })));
const Design4 = React.lazy(() => import('./designs/Design4').then(module => ({ default: module.Design4 })));
const Design5 = React.lazy(() => import('./designs/Design5').then(module => ({ default: module.Design5 })));
const Design6 = React.lazy(() => import('./designs/Design6').then(module => ({ default: module.Design6 })));
const Design7 = React.lazy(() => import('./designs/Design7').then(module => ({ default: module.Design7 })));
const Design8 = React.lazy(() => import('./designs/Design8').then(module => ({ default: module.Design8 })));
const Design9 = React.lazy(() => import('./designs/Design9').then(module => ({ default: module.Design9 })));
const Design10 = React.lazy(() => import('./designs/Design10').then(module => ({ default: module.Design10 })));
const Design11 = React.lazy(() => import('./designs/Design11').then(module => ({ default: module.Design11 })));
const Design12 = React.lazy(() => import('./designs/Design12').then(module => ({ default: module.Design12 })));
const Design13 = React.lazy(() => import('./designs/Design13').then(module => ({ default: module.Design13 })));
const Design14 = React.lazy(() => import('./designs/Design14').then(module => ({ default: module.Design14 })));
const Design15 = React.lazy(() => import('./designs/Design15').then(module => ({ default: module.Design15 })));
const Design16 = React.lazy(() => import('./designs/Design16').then(module => ({ default: module.Design16 })));
const Design17 = React.lazy(() => import('./designs/Design17').then(module => ({ default: module.Design17 })));
const Design18 = React.lazy(() => import('./designs/Design18').then(module => ({ default: module.Design18 })));
const Design19 = React.lazy(() => import('./designs/Design19').then(module => ({ default: module.Design19 })));
const Design20 = React.lazy(() => import('./designs/Design20').then(module => ({ default: module.Design20 })));
const Design21 = React.lazy(() => import('./designs/Design21').then(module => ({ default: module.Design21 })));
const Design22 = React.lazy(() => import('./designs/Design22').then(module => ({ default: module.Design22 })));

interface PhotocardProps {
  title: string;
  isVisualMode?: boolean;
  image: string;
  image2?: string;
  date: Date;
  url: string;
  brandName: string;
  themeColor: string;
  design: number;
  customWebsite?: string;
  customLogo?: string;
  fullBrandLogo?: string;
  fullBrandLogoHeight?: number;
  gradientStart?: string;
  gradientEnd?: string;
  cardGradientStart?: string;
  cardGradientEnd?: string;
  headlineFontSize?: number;
  headlineColor?: string;
  brandFontSize?: number;
  brandColor?: string;
  imageOffsetY?: number;
  onOffsetChange?: (offset: number) => void;
  imageOffsetX?: number;
  onOffsetXChange?: (offset: number) => void;
  imageFlipH?: boolean;
  onFlipHChange?: () => void;
  textAlign?: "left" | "center" | "right" | "justify";
  backgroundPatterns?: string[];
  patternScale?: number;
  patternRotation?: number;
  patternOpacity?: number;
  patternColor?: string;
  customFontName?: string;
  brandFontName?: string;
  customFontUrl?: string;
  brandFontUrl?: string;
  overlayOpacity?: number;
  showGeometricShapes?: boolean;
  showDetailedNewsBox?: boolean;
  geometricShapeColor?: string;
  geometricShapeOpacity?: number;
  applyGradientToAll?: boolean;
  imageScale?: number;
  image2Scale?: number;
  image2OffsetY?: number;
  onOffset2Change?: (offset: number) => void;
  image2OffsetX?: number;
  onOffset2XChange?: (offset: number) => void;
  image2FlipH?: boolean;
  onFlipH2Change?: () => void;
  imageFilter?: string;
  image2Filter?: string;
  imageVignette?: number;
  image2Vignette?: number;
  allFonts?: SavedFont[];
  description?: string;
  hashtag?: string;
  showSocialIcons?: boolean;
  descriptionFontSize?: number;
  descriptionColor?: string;
  descriptionBgColor?: string;
  showDescriptionBg?: boolean;
  descriptionTextAlign?: "left" | "center" | "right" | "justify";
  descriptionOffsetX?: number;
  descriptionOffsetY?: number;
  customDateColor?: string;
  customDateBgColor?: string;
  customDetailsTextColor?: string;
  customVisitTextColor?: string;
  customLogoTextColor?: string;
  customLogoBgColor?: string;
  customQrColor?: string;
  customSocialIconColor?: string;
  videoFit?: "cover" | "contain";
  videoFadeEdges?: boolean;
  videoBgColor?: string;
}

const FloralPattern = ({ color = "currentColor", opacity = 0.05 }) => (
  <div className="absolute inset-0 pointer-events-none z-0" style={{ opacity }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="floral" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M50 50 C 20 20 20 80 50 50 M50 50 C 80 20 80 80 50 50" stroke={color} fill="none" strokeWidth="2" />
          <circle cx="50" cy="50" r="5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#floral)" />
    </svg>
  </div>
);

const Photocard = forwardRef<HTMLDivElement, PhotocardProps>(
  ({ title, isVisualMode = false, image, image2, date, url, brandName, themeColor, design, customWebsite, customLogo, fullBrandLogo, fullBrandLogoHeight, gradientStart, gradientEnd, cardGradientStart, cardGradientEnd, headlineFontSize = 80, headlineColor = "#111827", brandFontSize = 40, brandColor = "#5934e8", imageOffsetY = 0, onOffsetChange, imageOffsetX = 0, onOffsetXChange, imageFlipH = false, onFlipHChange, image2Scale = 100, image2OffsetY = 0, onOffset2Change, image2OffsetX = 0, onOffset2XChange, image2FlipH = false, onFlipH2Change, imageFilter = "none", image2Filter = "none", imageVignette = 0, image2Vignette = 0, textAlign = "left", backgroundPatterns = [], patternScale = 100, patternRotation = 0, patternOpacity = 10, patternColor = "#888888", customFontName, brandFontName, customFontUrl, brandFontUrl, overlayOpacity = 20, showGeometricShapes = true, showDetailedNewsBox = true, geometricShapeColor = "white", geometricShapeOpacity = 1, applyGradientToAll = false, imageScale = 100, allFonts = [], description, hashtag, showSocialIcons = true, videoFit = "cover", videoFadeEdges = false, videoBgColor = "#000000", descriptionFontSize = 24, descriptionColor = "rgba(255, 255, 255, 0.9)", descriptionBgColor = "#fef266", showDescriptionBg = true, descriptionTextAlign = "left", descriptionOffsetX = 0, descriptionOffsetY = 0, customDateColor, customDateBgColor, customDetailsTextColor, customVisitTextColor, customLogoTextColor, customLogoBgColor, customQrColor, customSocialIconColor }, ref) => {
    const dragRef = useRef({ isDragging: false, startY: 0, initialOffsetY: 0 });
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });

    const safeCustomFontUrl = useFontDataUrl(customFontUrl);
    const safeBrandFontUrl = useFontDataUrl(brandFontUrl);

    // Helper to convert English digits to Bengali
    const toBengaliDigits = (str: string) => {
      return str.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);
    };

    const formattedDateString = toBengaliDigits(format(date, "EEEE, d MMMM yyyy", { locale: bn }));
    const formattedDate = <span style={{ lineHeight: '1.4', paddingBottom: '0.1em', paddingTop: '0.1em', display: 'inline-block' }}>{formattedDateString}</span>;
    const website = customWebsite || "mediacell.news";
    const qrValue = url || (website.startsWith("http") ? website : `https://${website}`);
    const globalIsVideo = image && (image.startsWith('data:video/') || image.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i));
    const globalIsVideoDesign = globalIsVideo;

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isEditMode) return;
      // Prevent drag if clicking on buttons
      if ((e.target as HTMLElement).closest('button')) return;
      
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setInitialOffset({ x: imageOffsetX, y: imageOffsetY });
      e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || !isEditMode) return;
      
      // Calculate delta in screen pixels
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      // The card might be scaled down in preview. We need to adjust delta.
      const rect = e.currentTarget.getBoundingClientRect();
      const scaleX = rect.width / e.currentTarget.offsetWidth;
      const scaleY = rect.height / e.currentTarget.offsetHeight;
      
      // Adjust delta by scale, and invert X if image is flipped horizontally
      const adjustedDeltaX = (deltaX / scaleX) * (imageFlipH ? -1 : 1);
      const adjustedDeltaY = deltaY / scaleY;
      
      // 1 unit of offset = 1% movement (0 to 100%)
      if (onOffsetXChange) {
        const newX = Math.max(-100, Math.min(100, initialOffset.x + adjustedDeltaX));
        onOffsetXChange(newX);
      }
      if (onOffsetChange) {
        const newY = Math.max(-100, Math.min(100, initialOffset.y + adjustedDeltaY));
        onOffsetChange(newY);
      }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      setIsDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    };

    const handleOffsetChange = (delta: number) => {
      if (onOffsetChange) {
        const newY = Math.max(-100, Math.min(100, imageOffsetY + delta));
        onOffsetChange(newY);
      }
    };

    const handleOffsetXChange = (delta: number) => {
      if (onOffsetXChange) {
        const adjustedDelta = delta * (imageFlipH ? -1 : 1);
        const newX = Math.max(-100, Math.min(100, imageOffsetX + adjustedDelta));
        onOffsetXChange(newX);
      }
    };

    const renderImage = (className: string, customImageSrc?: string, isSecondary: boolean = false) => {
      const imageUrl = customImageSrc || image;
      if (!imageUrl) return null;
      
      const currentScale = isSecondary ? image2Scale : imageScale;
      const currentOffsetX = isSecondary ? image2OffsetX : imageOffsetX;
      const currentOffsetY = isSecondary ? image2OffsetY : imageOffsetY;
      const currentFlipH = isSecondary ? image2FlipH : imageFlipH;
      const currentFilter = isSecondary ? image2Filter : imageFilter;
      const currentVignette = isSecondary ? image2Vignette : imageVignette;
      const currentOnOffsetXChange = isSecondary ? onOffset2XChange : onOffsetXChange;
      const currentOnOffsetYChange = isSecondary ? onOffset2Change : onOffsetChange;
      
      const isFullscreenDesign = [3, 7, 9, 13, 16, 17, 18, 20, 21, 22].includes(design);
      
      const isVideo = imageUrl.startsWith('data:video/') || imageUrl.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i);
      const isValidImage = !isVideo;
      const isVideoDesign = isVideo;
      const videoSrc = isVideoDesign && imageUrl.startsWith('data:video/blob;') 
        ? imageUrl.replace('data:video/blob;', '') 
        : imageUrl;

      const localHandlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isEditMode) return;
        if ((e.target as HTMLElement).closest('button')) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setInitialOffset({ x: currentOffsetX, y: currentOffsetY });
      };

      const localHandlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        const rect = e.currentTarget.getBoundingClientRect();
        const scaleX = rect.width / e.currentTarget.offsetWidth;
        const scaleY = rect.height / e.currentTarget.offsetHeight;
        const adjustedDeltaX = (deltaX / scaleX) * (currentFlipH ? -1 : 1);
        const adjustedDeltaY = deltaY / scaleY;
        
        if (currentOnOffsetXChange) {
          const newX = Math.max(-2000, Math.min(2000, initialOffset.x + adjustedDeltaX));
          currentOnOffsetXChange(newX);
        }
        if (currentOnOffsetYChange) {
          const newY = Math.max(-2000, Math.min(2000, initialOffset.y + adjustedDeltaY));
          currentOnOffsetYChange(newY);
        }
      };
      
      return (
        <div 
          className={`preview-image-container ${className} relative overflow-hidden ${isEditMode ? 'ring-4 ring-[#5934e8] ring-inset cursor-move' : ''}`}
          onDoubleClick={() => setIsEditMode(!isEditMode)}
          onPointerDown={localHandlePointerDown}
          onPointerMove={localHandlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Blurred Background Layer for Portrait/Empty Space */}
          {isVideoDesign && videoFit === 'contain' ? (
            <div
              className="absolute inset-0 w-full h-full pointer-events-none video-bg-layer"
              style={{ backgroundColor: videoBgColor }}
            />
          ) : (isValidImage && design !== 21 && !isVideoDesign) ? (
            <div
              className="absolute inset-0 w-full h-full pointer-events-none blurred-bg-layer"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                filter: 'blur(20px)',
                transform: 'scale(1.1)',
                opacity: 0.6
              }}
            />
          ) : null}
          {/* Background Pattern for Video */}
          {isVideoDesign && renderBackgroundPattern && (
            <div className="absolute inset-0 z-0 pointer-events-none">
              {renderBackgroundPattern()}
            </div>
          )}
          {/* Main Image/Video Layer */}
          {isVideoDesign && videoSrc ? (
            <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
              <video
                id="main-photocard-video"
                data-fade-edges={videoFadeEdges && videoFit === "contain"}
                className="video-layer main-video-layer"
                src={videoSrc}
                autoPlay
                loop
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: (isVideoDesign && videoFit === 'contain') ? 'contain' : (isFullscreenDesign ? 'cover' : 'contain'),
                  objectPosition: videoFit === 'contain' ? '50% 50%' : `calc(50% + ${currentOffsetX}px) calc(50% + ${currentOffsetY}px)`,
                  transform: videoFit === 'contain' 
                    ? `translate(${currentOffsetX}px, ${currentOffsetY}px) scaleX(${currentFlipH ? -1 : 1}) scale(${currentScale / 100})`
                    : `scaleX(${currentFlipH ? -1 : 1}) scale(${currentScale / 100})`,
                  filter: currentFilter !== 'none' ? currentFilter : undefined,
                  ...(videoFadeEdges && videoFit === 'contain' ? {
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                  } : {})
                }}
              />
              {currentVignette > 0 && (
                <div 
                  className="absolute inset-0 w-full h-full pointer-events-none z-20" 
                  style={{
                    background: `radial-gradient(circle, transparent 40%, rgba(0,0,0,${currentVignette / 100}) 120%)`
                  }} 
                />
              )}
              <div className="absolute top-4 right-4 z-[60] flex flex-col gap-2 pointer-events-auto hide-on-export">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const v = document.getElementById('main-photocard-video') as HTMLVideoElement;
                    const bgV = document.querySelector('.video-layer:not(.main-video-layer)') as HTMLVideoElement;
                    if (v) {
                      if (v.paused) {
                        v.play();
                        if (bgV) bgV.play();
                      } else {
                        v.pause();
                        if (bgV) bgV.pause();
                      }
                    }
                  }}
                  className="p-3 bg-black/60 text-white rounded-full hover:bg-black/80 backdrop-blur-md shadow-lg border border-white/20 transition-all"
                  title="Play/Pause"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const v = document.getElementById('main-photocard-video') as HTMLVideoElement;
                    if (v) {
                      v.muted = !v.muted;
                    }
                  }}
                  className="p-3 bg-black/60 text-white rounded-full hover:bg-black/80 backdrop-blur-md shadow-lg border border-white/20 transition-all"
                  title="Mute/Unmute"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M15.536 8.464L12 12m0 0l-3.536 3.536M12 12L8.464 8.464M12 12l3.536 3.536" />
                  </svg>
                </button>
              </div>
            </div>
          ) : isValidImage ? (
            <>
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: isFullscreenDesign ? 'cover' : 'contain',
                  backgroundPosition: `calc(50% + ${currentOffsetX}px) calc(50% + ${currentOffsetY}px)`,
                  backgroundRepeat: 'no-repeat',
                  transform: `scaleX(${currentFlipH ? -1 : 1}) scale(${currentScale / 100})`,
                  filter: currentFilter !== 'none' ? currentFilter : undefined
                }}
              />
              {currentVignette > 0 && (
                <div 
                  className="absolute inset-0 w-full h-full pointer-events-none" 
                  style={{
                    background: `radial-gradient(circle, transparent 40%, rgba(0,0,0,${currentVignette / 100}) 120%)`
                  }} 
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 font-medium">
              Video not supported in this design
            </div>
          )}
          {/* Global Overlay */}
          {overlayOpacity !== 0 && design !== 21 && (
            design === 3 ? (
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{ 
                  background: `linear-gradient(to top, ${themeColor}${Math.round((overlayOpacity / 100) * 255).toString(16).padStart(2, '0')}, transparent)`
                }}
              />
            ) : (
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-200 bg-black"
                style={{ 
                  opacity: overlayOpacity / 100
                }}
              />
            )
          )}
          {/* Edit Mode Controls */}
          {isEditMode && (
            <div className="absolute inset-0 flex items-center justify-center z-[100] pointer-events-none hide-on-export">
              <div className="relative w-48 h-48">
                {/* Center Flip Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); if (onFlipHChange) onFlipHChange(); }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#5934e8]/80 hover:bg-[#5934e8] text-white rounded-full flex items-center justify-center pointer-events-auto backdrop-blur-md transition-all shadow-2xl border-2 border-white/30 hover:scale-110"
                  title="Flip Horizontally"
                >
                  <FlipHorizontal size={28} />
                </button>
                {/* Up Arrow */}
                <button 
                  onClick={(e) => { e.stopPropagation(); handleOffsetChange(-5); }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center pointer-events-auto backdrop-blur-md transition-all shadow-2xl border-2 border-white/30 hover:scale-110"
                >
                  <ArrowUp size={32} />
                </button>
                {/* Down Arrow */}
                <button 
                  onClick={(e) => { e.stopPropagation(); handleOffsetChange(5); }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center pointer-events-auto backdrop-blur-md transition-all shadow-2xl border-2 border-white/30 hover:scale-110"
                >
                  <ArrowDown size={32} />
                </button>
                {/* Left Arrow */}
                <button 
                  onClick={(e) => { e.stopPropagation(); handleOffsetXChange(-5); }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center pointer-events-auto backdrop-blur-md transition-all shadow-2xl border-2 border-white/30 hover:scale-110"
                >
                  <ArrowLeft size={32} />
                </button>
                {/* Right Arrow */}
                <button 
                  onClick={(e) => { e.stopPropagation(); handleOffsetXChange(5); }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center pointer-events-auto backdrop-blur-md transition-all shadow-2xl border-2 border-white/30 hover:scale-110"
                >
                  <ArrowRight size={32} />
                </button>
              </div>
            </div>
          )}
        </div>
      );
    };

    const renderBackgroundPattern = () => {
      if (!backgroundPatterns || backgroundPatterns.length === 0) return null;

      // Convert opacity from 0-100 to 0-1
      const opacityValue = patternOpacity / 100;

      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden pattern-bg-layer">
          {backgroundPatterns.map((pattern, index) => {
            // If the pattern is an SVG data URL, we can try to replace the stroke/fill color
            let coloredPattern = pattern;
            if (pattern.startsWith('data:image/svg+xml')) {
              try {
                const decodedSvg = decodeURIComponent(pattern.split(',')[1]);
                // Replace #888 or other default colors with the selected patternColor
                // We use a simple regex to find stroke="#..." or fill="#..." that aren't "none"
                const coloredSvg = decodedSvg
                  .replace(/stroke="[^"]*"/g, (match) => match.includes('none') ? match : `stroke="${patternColor}"`)
                  .replace(/fill="[^"]*"/g, (match) => match.includes('none') ? match : `fill="${patternColor}"`);
                coloredPattern = `data:image/svg+xml,${encodeURIComponent(coloredSvg)}`;
              } catch (e) {
                console.error("Error coloring SVG pattern", e);
              }
            }

            return (
              <div
                key={index}
                className={`absolute inset-[-50%] z-0 pointer-events-none ${globalIsVideoDesign ? 'animate-bg-pattern' : ''}`}
                style={{
                  backgroundImage: `url("${coloredPattern}")`,
                  backgroundSize: `${patternScale * 2}px ${patternScale * 2}px`,
                  backgroundRepeat: 'repeat',
                  backgroundPosition: 'center',
                  '--pattern-size': `${patternScale * 2}px`,
                  opacity: opacityValue,
                  transform: `rotate(${patternRotation}deg)`,
                  transformOrigin: 'center center'
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      );
    };

    const headlineStyle: React.CSSProperties = {
      fontSize: `${headlineFontSize}px`,
      color: headlineColor,
      fontFamily: customFontName ? `'${customFontName.replace(/['"]/g, '')}', sans-serif` : 'inherit',
      textAlign: textAlign,
      paddingTop: '0.2em',
      lineHeight: '1.4'
    };

    const brandStyle = {
      color: brandColor,
      fontSize: `${brandFontSize}px`,
      fontFamily: brandFontName ? `'${brandFontName.replace(/['"]/g, '')}', sans-serif` : 'inherit',
      textShadow: '0px 2px 4px rgba(0,0,0,0.5)'
    };

    const renderFormattedTitle = () => {
      if (!title || title === '<p><br></p>') {
        return (
          <span className="w-full block preview-title-container" style={{ textAlign }}>
            কনটেন্ট ইডিটর থেকে হেডলাইন লিখুন।
          </span>
        );
      }

      const isHtml = /<[a-z][\s\S]*>/i.test(title);

      if (isVisualMode && isHtml) {
        return (
          <div 
            className="w-full block quill-content preview-title-container" 
            style={{ textAlign, fontFamily: 'inherit' }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        );
      }

      const renderParts = (text: string) => {
        // Handle quotes with --
        if (text.includes('--')) {
          const parts = text.split('--');
          const quoteText = parts[0].trim();
          const authorText = parts.slice(1).join('--').trim();
          
          let containerAlign = 'justify-center';
          if (textAlign === 'left') containerAlign = 'justify-start';
          if (textAlign === 'right') containerAlign = 'justify-end';

          return (
            <div className={`flex w-full ${containerAlign} mt-2`}>
              <div className="flex flex-col gap-2 inline-block">
                <div className="italic font-medium opacity-90 text-left">
                  ❝{renderInlineFormatting(quoteText)}❞
                </div>
                <div className="font-bold opacity-80 text-right" style={{ fontSize: '0.75em' }}>
                  - {renderInlineFormatting(authorText)}
                </div>
              </div>
            </div>
          );
        }
        return renderInlineFormatting(text);
      };

      const renderInlineFormatting = (text: string) => {
        return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const innerText = part.slice(2, -2);
            // Check for color syntax like (লাল) Text
            const colorMatch = innerText.match(/^\((.*?)\)(.*)/);
            
            let bgColor = themeColor;
            let displayText = innerText;

            if (colorMatch) {
              const colorName = colorMatch[1].trim();
              displayText = colorMatch[2].trim();
              
              const colorMap: Record<string, string> = {
                'লাল': 'red', 'নীল': 'blue', 'সবুজ': 'green', 'হলুদ': 'yellow',
                'কালো': 'black', 'সাদা': 'white', 'কমলা': 'orange', 'গোলাপি': 'pink',
                'বেগুনি': 'purple', 'খয়েরি': 'brown', 'ধূসর': 'gray', 'সোনালী': 'gold',
                'রুপালী': 'silver', 'আকাশি': 'skyblue'
              };
              
              bgColor = colorMap[colorName] || colorName;
            }

            return (
              <span 
                key={i} 
                className="px-3 py-1 rounded-lg inline-block mx-1 drop-shadow-none leading-none align-baseline" 
                style={{ backgroundColor: bgColor, color: '#ffffff', textShadow: 'none' }}
              >
                {displayText}
              </span>
            );
          }
          return part;
        });
      };

      const renderHighlightedText = (text: string, showColon: boolean) => {
        // Check for font syntax like [Mina]Text or (২ লাল ১০)Text
        const fontMatch = text.match(/^(?:\[(.*?)\]|\((.*?)\))(.*)/);
        let fontName = customFontName ? `'${customFontName.replace(/['"]/g, '')}', sans-serif` : 'inherit';
        let displayText = text;
        let customColor = themeColor;
        let customFontSize = Math.max(10, headlineFontSize - 2);

        if (fontMatch) {
          const bracketName = fontMatch[1];
          const parenContent = fontMatch[2];
          displayText = fontMatch[3].trim();

          if (bracketName) {
            fontName = `'${bracketName.replace(/['"]/g, '')}', sans-serif`;
          } else if (parenContent) {
            // Convert Bengali digits to English digits
            const englishNumberStr = parenContent.replace(/[০-৯]/g, (d) => "0123456789"["০১২৩৪৫৬৭৮৯".indexOf(d)]);
            const tokens = englishNumberStr.trim().split(/\s+/);
            
            const colorMap: Record<string, string> = {
              'লাল': 'red', 'নীল': 'blue', 'সবুজ': 'green', 'হলুদ': 'yellow',
              'কালো': 'black', 'সাদা': 'white', 'কমলা': 'orange', 'গোলাপি': 'pink',
              'বেগুনি': 'purple', 'খয়েরি': 'brown', 'ধূসর': 'gray', 'সোনালী': 'gold',
              'রুপালী': 'silver', 'আকাশি': 'skyblue'
            };

            let fontIndex = -1;

            if (tokens.length === 1) {
              if (/^\d+$/.test(tokens[0])) {
                fontIndex = parseInt(tokens[0], 10) - 1;
              } else {
                customColor = colorMap[tokens[0]] || tokens[0];
              }
            } else if (tokens.length === 2) {
              if (/^\d+$/.test(tokens[0]) && /^\d+$/.test(tokens[1])) {
                fontIndex = parseInt(tokens[0], 10) - 1;
                customFontSize = parseInt(tokens[1], 10);
              } else if (/^\d+$/.test(tokens[0])) {
                fontIndex = parseInt(tokens[0], 10) - 1;
                customColor = colorMap[tokens[1]] || tokens[1];
              } else if (/^\d+$/.test(tokens[1])) {
                customColor = colorMap[tokens[0]] || tokens[0];
                customFontSize = parseInt(tokens[1], 10);
              } else {
                customColor = colorMap[tokens[0]] || tokens[0];
              }
            } else if (tokens.length >= 3) {
              if (/^\d+$/.test(tokens[0])) fontIndex = parseInt(tokens[0], 10) - 1;
              customColor = colorMap[tokens[1]] || tokens[1];
              if (/^\d+$/.test(tokens[2])) customFontSize = parseInt(tokens[2], 10);
            }

            if (fontIndex >= 0 && fontIndex < allFonts.length) {
              fontName = `'${allFonts[fontIndex].name.replace(/['"]/g, '')}', sans-serif`;
            }
          }
        }

        return (
          <span 
            className="w-full block mb-3" 
            style={{ 
              color: customColor, 
              fontSize: `${customFontSize}px`,
              textAlign: 'center',
              fontFamily: fontName
            }}
          >
            {displayText}{showColon ? ':' : ''}
          </span>
        );
      };

      if (title.includes(':::')) {
        const parts = title.split(':::');
        const beforeColon = parts[0];
        const afterColon = parts.slice(1).join(':::');

        return (
          <span className="w-full block preview-title-container" style={{ textAlign }}>
            {renderHighlightedText(beforeColon, true)}
            <span className="w-full block" style={{ textAlign }}>
              {renderParts(afterColon)}
            </span>
          </span>
        );
      } else if (title.includes('::')) {
        const parts = title.split('::');
        const beforeColon = parts[0];
        const afterColon = parts.slice(1).join('::');

        return (
          <span className="w-full block preview-title-container" style={{ textAlign }}>
            {renderHighlightedText(beforeColon, false)}
            <span className="w-full block" style={{ textAlign }}>
              {renderParts(afterColon)}
            </span>
          </span>
        );
      }

      return (
        <span className="w-full block preview-title-container" style={{ textAlign }}>
          {renderParts(title)}
        </span>
      );
    };

      const designProps: NewsDesignProps = {
      title,
      image,
      image2,
      formattedDate,
      themeColor,
      customLogo,
      fullBrandLogo,
      fullBrandLogoHeight,
      brandName,
      website,
      qrValue,
      headlineFontSize,
      headlineColor,
      brandFontSize,
      brandColor,
      textAlign: textAlign as "left" | "center" | "right" | "justify",
      gradientStart,
      gradientEnd,
      cardGradientStart,
      cardGradientEnd,
      applyGradientToAll,
      description,
      hashtag,
      showSocialIcons,
      descriptionFontSize,
      descriptionColor,
      descriptionBgColor,
      showDescriptionBg,
      descriptionTextAlign: descriptionTextAlign as "left" | "center" | "right" | "justify",
      descriptionOffsetX,
      descriptionOffsetY,
      overlayOpacity,
      showGeometricShapes,
      showDetailedNewsBox,
      videoFit: videoFit as "contain" | "cover",
      videoBgColor,
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
      renderFormattedTitle,
      renderImage,
      renderBackgroundPattern,
      FloralPattern,
      brandStyle,
      headlineStyle
    };

    const renderDesign = () => {
      switch (design) {
        case 0: return <Design0 {...designProps} />;
        case 1: return <Design1 {...designProps} />;
        case 2: return <Design2 {...designProps} />;
        case 3: return <Design3 {...designProps} />;
        case 4: return <Design4 {...designProps} />;
        case 5: return <Design5 {...designProps} />;
        case 6: return <Design6 {...designProps} />;
        case 7: return <Design7 {...designProps} />;
        case 8: return <Design8 {...designProps} />;
        case 9: return <Design9 {...designProps} />;
        case 10: return <Design10 {...designProps} />;
        case 11: return <Design11 {...designProps} />;
        case 12: return <Design12 {...designProps} />;
        case 13: return <Design13 {...designProps} />;
        case 14: return <Design14 {...designProps} />;
        case 15: return <Design15 {...designProps} />;
        case 16: return <Design16 {...designProps} />;
        case 17: return <Design17 {...designProps} />;
        case 18: return <Design18 {...designProps} />;
        case 19: return <Design19 {...designProps} />;
        case 20: return <Design20 {...designProps} />;
        case 21: return <Design21 {...designProps} />;
        case 22: return <Design22 {...designProps} />;
        default: return null;
      }
    };

    const getDimensions = () => {
      if (design === 20) {
        return { width: '1080px', height: '1920px' };
      }
      return { width: '1080px', height: '1350px' };
    };

    const dims = getDimensions();

    return (
      <div
        ref={ref}
        className="bg-white relative overflow-hidden flex flex-col font-sans [.export-video_&]:!bg-transparent"
        style={{
          width: dims.width,
          height: dims.height,
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        }}
      >
        <style>
          {`
            @keyframes colorCycle {
              0% { color: #ff0055; text-shadow: 0 2px 4px rgba(0,0,0,0.6); }
              20% { color: #00aaff; text-shadow: 0 2px 4px rgba(0,0,0,0.6); }
              40% { color: #00ffaa; text-shadow: 0 2px 4px rgba(0,0,0,0.6); }
              60% { color: #aa00ff; text-shadow: 0 2px 4px rgba(0,0,0,0.6); }
              80% { color: #ffaa00; text-shadow: 0 2px 4px rgba(0,0,0,0.6); }
              100% { color: #ff0055; text-shadow: 0 2px 4px rgba(0,0,0,0.6); }
            }
            .auto-color-text {
              animation: colorCycle 5s linear infinite;
            }
            ${customFontName && safeCustomFontUrl ? `
              @font-face {
                font-family: '${customFontName.replace(/['"]/g, '')}';
                src: url('${safeCustomFontUrl}');
                font-display: swap;
              }
            ` : ''}
            ${brandFontName && safeBrandFontUrl ? `
              @font-face {
                font-family: '${brandFontName.replace(/['"]/g, '')}';
                src: url('${safeBrandFontUrl}');
                font-display: swap;
              }
            ` : ''}
          `}
        </style>
        <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center min-h-[400px]"></div>}>
          {renderDesign()}
        </React.Suspense>
      </div>
    );
  },
);

Photocard.displayName = "Photocard";

export default React.memo(Photocard);
