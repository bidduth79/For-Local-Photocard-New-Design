import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NewsPreview from './NewsPreview';
import { useAppContext } from '../../context/AppContext';
import { defaultFonts } from '../../data/fonts';
import { useFonts } from '../../hooks/useFonts';

export default function PreviewRenderer() {
  const state = useAppContext();
  const { savedFonts } = useFonts();
  
  const allFonts = React.useMemo(() => [
    ...defaultFonts.map(f => ({ id: f.name, name: f.name, originalName: f.label, url: '' })),
    ...savedFonts
  ], [savedFonts]);

  const handlePrevDesign = () => {
    if (state.activeTab === 'news') {
      state.setSelectedDesign(state.selectedDesign > 0 ? state.selectedDesign - 1 : 22);
    }
  };

  const handleNextDesign = () => {
    if (state.activeTab === 'news') {
      state.setSelectedDesign(state.selectedDesign < 22 ? state.selectedDesign + 1 : 0);
    }
  };

  return (
    <div className="relative group">
      <NewsPreview 
        photocardRef={state.photocardRef}
        title={state.title}
        visualTitle={state.visualTitle}
        isVisualMode={state.isVisualMode}
        image={state.image}
        image2={state.image2}
        date={state.date}
        url={state.url}
        brandName={state.brandName}
        themeColor={state.themeColor}
        design={state.selectedDesign}
        setDesign={state.setSelectedDesign}
        customWebsite={state.customWebsite}
        customLogo={state.customLogo}
        fullBrandLogo={state.fullBrandLogo}
        fullBrandLogoHeight={state.selectedDesign === 18 ? state.design18LogoHeight : state.fullBrandLogoHeight}
        gradientStart={state.gradientStart}
        gradientEnd={state.gradientEnd}
        cardGradientStart={state.cardGradientStart}
        cardGradientEnd={state.cardGradientEnd}
        headlineFontSize={state.headlineFontSize}
        headlineColor={state.headlineColor}
        brandFontSize={state.brandFontSize}
        brandColor={state.brandColor}
        watermarkScale={state.watermarkScale}
        watermarkOpacity={state.watermarkOpacity}
        showWatermark={false}
        imageOffsetY={state.imageOffsetY}
        setImageOffsetY={state.setImageOffsetY}
        imageOffsetX={state.imageOffsetX}
        setImageOffsetX={state.setImageOffsetX}
        imageFlipH={state.imageFlipH}
        setImageFlipH={state.setImageFlipH}
        textAlign={state.textAlign}
        backgroundPatterns={state.backgroundPatterns}
        patternScale={state.patternScale}
        patternRotation={state.patternRotation}
        patternOpacity={state.patternOpacity}
        patternColor={state.patternColor}
        customFontName={state.customFontName}
        brandFontName={state.brandFontName}
        customFontUrl={state.customFontUrl}
        brandFontUrl={state.brandFontUrl}
        overlayOpacity={state.overlayOpacity}
        showGeometricShapes={state.showGeometricShapes}
        showDetailedNewsBox={state.showDetailedNewsBox}
        geometricShapeColor={state.geometricShapeColor}
        geometricShapeOpacity={state.geometricShapeOpacity}
        applyGradientToAll={state.applyGradientToAll}
        imageScale={state.newsImageScale}
        setImageScale={state.setNewsImageScale}
        image2Scale={state.image2Scale}
        setImage2Scale={state.setImage2Scale}
        image2OffsetY={state.image2OffsetY}
        setImage2OffsetY={state.setImage2OffsetY}
        image2OffsetX={state.image2OffsetX}
        setImage2OffsetX={state.setImage2OffsetX}
        image2FlipH={state.image2FlipH}
        setImage2FlipH={state.setImage2FlipH}
        imageFilter={state.imageFilter}
        setImageFilter={state.setImageFilter}
        image2Filter={state.image2Filter}
        setImage2Filter={state.setImage2Filter}
        imageVignette={state.imageVignette}
        setImageVignette={state.setImageVignette}
        image2Vignette={state.image2Vignette}
        setImage2Vignette={state.setImage2Vignette}
        allFonts={allFonts}
        description={state.description}
        hashtag={state.hashtag}
        showSocialIcons={state.showSocialIcons}
        videoFit={state.videoFit}
        videoFadeEdges={state.videoFadeEdges}
        videoBgColor={state.videoBgColor}
        descriptionFontSize={state.descriptionFontSize}
        descriptionColor={state.descriptionColor}
        descriptionBgColor={state.descriptionBgColor}
        showDescriptionBg={state.showDescriptionBg}
        descriptionTextAlign={state.descriptionTextAlign}
        descriptionOffsetX={state.descriptionOffsetX}
        descriptionOffsetY={state.descriptionOffsetY}
        customDateColor={state.customDateColor}
        customDateBgColor={state.customDateBgColor}
        customDetailsTextColor={state.customDetailsTextColor}
        customVisitTextColor={state.customVisitTextColor}
        customLogoTextColor={state.customLogoTextColor}
        customLogoBgColor={state.customLogoBgColor}
        customQrColor={state.customQrColor}
        customSocialIconColor={state.customSocialIconColor}
      />
      
      {/* Navigation Arrows */}
      {(!state.image?.startsWith('data:video/')) && (
        <>
          <button 
            onClick={handlePrevDesign}
            className="absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg backdrop-blur-sm border border-gray-200 z-50 opacity-80 hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
            title="Previous Design"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={handleNextDesign}
            className="absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg backdrop-blur-sm border border-gray-200 z-50 opacity-80 hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
            title="Next Design"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}
