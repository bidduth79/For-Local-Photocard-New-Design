import React, { useState } from 'react';
import Photocard from '../cards/Photocard';
import { SavedFont } from '../../hooks/useFonts';
import { Save, Check } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface NewsPreviewProps {
  photocardRef: React.RefObject<HTMLDivElement>;
  title: string;
  visualTitle: string;
  isVisualMode: boolean;
  image: string;
  image2?: string;
  date: Date;
  url: string;
  brandName: string;
  themeColor: string;
  design: number;
  customWebsite: string;
  customLogo: string;
  fullBrandLogo?: string;
  fullBrandLogoHeight?: number;
  gradientStart: string;
  gradientEnd: string;
  cardGradientStart: string;
  cardGradientEnd: string;
  headlineFontSize: number;
  headlineColor: string;
  brandFontSize: number;
  brandColor: string;
  watermarkScale: number;
  watermarkOpacity: number;
  showWatermark: boolean;
  imageOffsetY: number;
  setImageOffsetY: (offset: number) => void;
  imageOffsetX?: number;
  setImageOffsetX?: (offset: number) => void;
  imageFlipH?: boolean;
  setImageFlipH?: (flip: boolean) => void;
  textAlign?: "left" | "center" | "right" | "justify";
  headlineWatermark?: string;
  customFontName: string;
  brandFontName: string;
  customFontUrl?: string;
  brandFontUrl?: string;
  overlayOpacity: number;
  showGeometricShapes: boolean;
  showDetailedNewsBox: boolean;
  geometricShapeColor: string;
  geometricShapeOpacity: number;
  backgroundPatterns?: string[];
  patternScale?: number;
  patternRotation?: number;
  patternOpacity?: number;
  patternColor?: string;
  applyGradientToAll: boolean;
  imageScale: number;
  setImageScale: (scale: number) => void;
  image2Scale?: number;
  setImage2Scale?: (scale: number) => void;
  image2OffsetY?: number;
  setImage2OffsetY?: (offset: number) => void;
  image2OffsetX?: number;
  setImage2OffsetX?: (offset: number) => void;
  image2FlipH?: boolean;
  setImage2FlipH?: (flip: boolean) => void;
  imageFilter?: string;
  setImageFilter?: (filter: string) => void;
  image2Filter?: string;
  setImage2Filter?: (filter: string) => void;
  imageVignette?: number;
  setImageVignette?: (vignette: number) => void;
  image2Vignette?: number;
  setImage2Vignette?: (vignette: number) => void;
  allFonts?: SavedFont[];
  description?: string;
  hashtag?: string;
  showSocialIcons?: boolean;
  videoFit?: "cover" | "contain";
  videoFadeEdges?: boolean;
  videoBgColor?: string;
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
}

const NewsPreview: React.FC<NewsPreviewProps> = ({
  photocardRef,
  title,
  visualTitle,
  isVisualMode,
  image,
  image2,
  date,
  url,
  brandName,
  themeColor,
  design,
  customWebsite,
  customLogo,
  fullBrandLogo,
  fullBrandLogoHeight,
  gradientStart,
  gradientEnd,
  cardGradientStart,
  cardGradientEnd,
  headlineFontSize,
  headlineColor,
  brandFontSize,
  brandColor,
  watermarkScale,
  watermarkOpacity,
  showWatermark,
  imageOffsetY,
  setImageOffsetY,
  imageOffsetX,
  setImageOffsetX,
  imageFlipH,
  setImageFlipH,
  textAlign,
  headlineWatermark,
  customFontName,
  brandFontName,
  customFontUrl,
  brandFontUrl,
  overlayOpacity,
  showGeometricShapes,
  showDetailedNewsBox,
  geometricShapeColor,
  geometricShapeOpacity,
  backgroundPatterns,
  patternScale,
  patternRotation,
  patternOpacity,
  patternColor,
  applyGradientToAll,
  imageScale,
  setImageScale,
  image2Scale,
  setImage2Scale,
  image2OffsetY,
  setImage2OffsetY,
  image2OffsetX,
  setImage2OffsetX,
  image2FlipH,
  setImage2FlipH,
  imageFilter,
  setImageFilter,
  image2Filter,
  setImage2Filter,
  imageVignette,
  setImageVignette,
  image2Vignette,
  setImage2Vignette,
  allFonts,
  description,
  hashtag,
  showSocialIcons,
  videoFit,
  videoFadeEdges,
  videoBgColor,
  descriptionFontSize,
  descriptionColor,
  descriptionBgColor,
  showDescriptionBg,
  descriptionTextAlign,
  descriptionOffsetX,
  descriptionOffsetY,
  customDateColor,
  customDateBgColor,
  customDetailsTextColor,
  customVisitTextColor,
  customLogoTextColor,
  customLogoBgColor,
  customQrColor,
  customSocialIconColor,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && containerRef.current.parentElement) {
        const parentWidth = containerRef.current.parentElement.clientWidth;
        const baseWidth = 1080;
        const scale = parentWidth / baseWidth;
        containerRef.current.style.transform = `scale(${scale})`;
        containerRef.current.style.transformOrigin = 'top left';
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current?.parentElement) {
      observer.observe(containerRef.current.parentElement);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
      observer.disconnect();
    };
  }, []);

  const getDimensions = () => {
    if (design === 20) {
      return { width: '1080px', height: '1920px' };
    }
    return { width: '1080px', height: '1350px' };
  };

  const dims = getDimensions();

  const { scrollToPanel } = useAppContext();

  const handlePreviewClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // 1. Check if clicked on Watermark
    if (target.closest('.watermark-overlay')) {
      scrollToPanel('panel-watermark-settings');
      return;
    }
    
    // 2. Check if clicked on Image
    if (target.closest('.preview-image-container')) {
      scrollToPanel('panel-content-editor');
      return;
    }

    // 3. Check if clicked on Title
    if (target.closest('.quill-content') || target.closest('.preview-title-container')) {
      scrollToPanel('panel-content-editor');
      return;
    }
    
    const plainTitle = title.replace(/<[^>]*>?/gm, '').trim();
    const targetText = target.textContent || '';
    
    // If the target contains the title and is relatively small (not the whole card)
    if (plainTitle.length > 5 && targetText.includes(plainTitle.substring(0, 10)) && targetText.length < plainTitle.length + 50) {
      scrollToPanel('panel-content-editor');
      return;
    }
    if (targetText.includes('হেডলাইন লিখুন') && targetText.length < 50) {
      scrollToPanel('panel-content-editor');
      return;
    }
    
    // Check if clicked on description
    if (description && targetText.includes(description.substring(0, 10)) && targetText.length < description.length + 50) {
      scrollToPanel('panel-content-editor');
      return;
    }
    if (targetText.includes('বিস্তারিত খবর লিখুন') && targetText.length < 50) {
      scrollToPanel('panel-content-editor');
      return;
    }

    // 4. Check if clicked on Brand Logo / Name / Website
    if (target.tagName === 'IMG') {
      const src = target.getAttribute('src');
      if (src === customLogo || src === fullBrandLogo) {
        scrollToPanel('panel-brand-settings');
        return;
      }
    }
    
    if (brandName && targetText.includes(brandName) && targetText.length < brandName.length + 20) {
      scrollToPanel('panel-brand-settings');
      return;
    }
    
    const website = customWebsite || "mediacell.news";
    if (targetText.includes(website) && targetText.length < website.length + 20) {
      scrollToPanel('panel-brand-settings');
      return;
    }
    
    // Check if clicked on QR code or Globe icon (SVG)
    // But only if it's not part of the social icons in the description
    if (target.closest('svg') && !target.closest('.social-icons-container')) {
      scrollToPanel('panel-brand-settings');
      return;
    }
    
    // 5. Default fallback
    scrollToPanel('panel-design-settings');
  };

  return (
    <div className="relative w-full" onClick={handlePreviewClick}>
      <div className={`relative w-full ${design === 20 ? 'aspect-[9/16]' : 'aspect-[4/5]'} bg-gray-200 overflow-hidden rounded-3xl shadow-2xl transition-all duration-300`}>
        <div 
          ref={containerRef}
          className="absolute top-0 left-0 transition-transform duration-0 ease-out shadow-2xl cursor-pointer"
          style={{ 
            width: dims.width, 
            height: dims.height 
          }}
        >
        <div ref={photocardRef} className="w-full h-full">
          <Photocard
            title={isVisualMode ? visualTitle : title}
            isVisualMode={isVisualMode}
            image={image}
            image2={image2}
            date={date}
            url={url}
            brandName={brandName}
            themeColor={themeColor}
            design={design}
            customWebsite={customWebsite}
            customLogo={customLogo}
            fullBrandLogo={fullBrandLogo}
            fullBrandLogoHeight={fullBrandLogoHeight}
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
            cardGradientStart={cardGradientStart}
            cardGradientEnd={cardGradientEnd}
            headlineFontSize={headlineFontSize}
            headlineColor={headlineColor}
            brandFontSize={brandFontSize}
            brandColor={brandColor}
            imageOffsetY={imageOffsetY}
            onOffsetChange={setImageOffsetY}
            imageOffsetX={imageOffsetX}
            onOffsetXChange={setImageOffsetX}
            imageFlipH={imageFlipH}
            onFlipHChange={() => setImageFlipH && setImageFlipH(!imageFlipH)}
            textAlign={textAlign}
            headlineWatermark={headlineWatermark}
            customFontName={customFontName}
            brandFontName={brandFontName}
            customFontUrl={customFontUrl}
            brandFontUrl={brandFontUrl}
            overlayOpacity={overlayOpacity}
            showGeometricShapes={showGeometricShapes}
            showDetailedNewsBox={showDetailedNewsBox}
            geometricShapeColor={geometricShapeColor}
            geometricShapeOpacity={geometricShapeOpacity}
            backgroundPatterns={backgroundPatterns}
            patternScale={patternScale}
            patternRotation={patternRotation}
            patternOpacity={patternOpacity}
            patternColor={patternColor}
            applyGradientToAll={applyGradientToAll}
            imageScale={imageScale}
            image2Scale={image2Scale}
            image2OffsetY={image2OffsetY}
            onOffset2Change={setImage2OffsetY}
            image2OffsetX={image2OffsetX}
            onOffset2XChange={setImage2OffsetX}
            image2FlipH={image2FlipH}
            onFlipH2Change={() => setImage2FlipH && setImage2FlipH(!image2FlipH)}
            imageFilter={imageFilter}
            image2Filter={image2Filter}
            imageVignette={imageVignette}
            image2Vignette={image2Vignette}
            allFonts={allFonts}
            description={description}
            hashtag={hashtag}
            showSocialIcons={showSocialIcons}
            videoFit={videoFit}
            videoFadeEdges={videoFadeEdges}
            videoBgColor={videoBgColor}
            descriptionFontSize={descriptionFontSize}
            descriptionColor={descriptionColor}
            descriptionBgColor={descriptionBgColor}
            showDescriptionBg={showDescriptionBg}
            descriptionTextAlign={descriptionTextAlign}
            descriptionOffsetX={descriptionOffsetX}
            descriptionOffsetY={descriptionOffsetY}
            customDateColor={customDateColor}
            customDateBgColor={customDateBgColor}
            customDetailsTextColor={customDetailsTextColor}
            customVisitTextColor={customVisitTextColor}
            customLogoTextColor={customLogoTextColor}
            customLogoBgColor={customLogoBgColor}
            customQrColor={customQrColor}
            customSocialIconColor={customSocialIconColor}
          />
          
          {/* Watermark Overlay */}
          {showWatermark && (
            <div 
              className="watermark-overlay absolute inset-0 pointer-events-none z-50 flex items-center justify-center"
              style={{ opacity: watermarkOpacity / 100 }}
            >
              {customLogo ? (
                <img 
                  src={customLogo} 
                  alt="Watermark" 
                  style={{ 
                    width: `${watermarkScale}%`,
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <h1 
                  className="font-bold text-gray-500/20 rotate-45 whitespace-nowrap"
                  style={{ 
                    fontSize: `${watermarkScale * 2}px`,
                    color: brandColor
                  }}
                >
                  {brandName}
                </h1>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-gray-200 z-50 overflow-hidden">
        <button 
          onClick={() => setImageScale(Math.min(200, imageScale + 5))}
          className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:text-black transition-colors border-b border-gray-200"
          title="Zoom In"
        >
          <span className="text-xl font-bold">+</span>
        </button>
        <button 
          onClick={() => setImageScale(Math.max(50, imageScale - 5))}
          className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
          title="Zoom Out"
        >
          <span className="text-xl font-bold">-</span>
        </button>
      </div>
    </div>
    </div>
  );
};

export default React.memo(NewsPreview);
