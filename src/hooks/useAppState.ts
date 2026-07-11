import { useAppStore } from '../store/appStore';
import React, { useRef, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { defaultPatterns } from "../data/defaultPatterns";
import { showToast } from "../utils/toast";

export const useAppState = () => {
  const activeTab = useAppStore(s => s.activeTab);
  const setActiveTab = useAppStore(s => s.setActiveTab);
  
  // App UI State
  const language = useAppStore(s => s.language);
  const setLanguage = useAppStore(s => s.setLanguage);
  const darkMode = useAppStore(s => s.darkMode);
  const setDarkMode = useAppStore(s => s.setDarkMode);
  const isSettingsLoaded = useAppStore(s => s.isSettingsLoaded);
  const setIsSettingsLoaded = useAppStore(s => s.setIsSettingsLoaded);
  
  // Floating Controls State (Shared)
  const showFontSizeControl = useAppStore(s => s.showFontSizeControl);
  const setShowFontSizeControl = useAppStore(s => s.setShowFontSizeControl);
  const showColorControl = useAppStore(s => s.showColorControl);
  const setShowColorControl = useAppStore(s => s.setShowColorControl);
  const showBrandFontSizeControl = useAppStore(s => s.showBrandFontSizeControl);
  const setShowBrandFontSizeControl = useAppStore(s => s.setShowBrandFontSizeControl);
  const showBrandColorControl = useAppStore(s => s.showBrandColorControl);
  const setShowBrandColorControl = useAppStore(s => s.setShowBrandColorControl);

  // Accordion State (Default Collapsed)
  const isBrandingExpanded = useAppStore(s => s.isBrandingExpanded);
  const setIsBrandingExpanded = useAppStore(s => s.setIsBrandingExpanded);
  const isContentEditorExpanded = useAppStore(s => s.isContentEditorExpanded);
  const setIsContentEditorExpanded = useAppStore(s => s.setIsContentEditorExpanded);
  const isDesignSettingsExpanded = useAppStore(s => s.isDesignSettingsExpanded);
  const setIsDesignSettingsExpanded = useAppStore(s => s.setIsDesignSettingsExpanded);
  const isQuoteSpeakerExpanded = useAppStore(s => s.isQuoteSpeakerExpanded);
  const setIsQuoteSpeakerExpanded = useAppStore(s => s.setIsQuoteSpeakerExpanded);
  const isStyleFontExpanded = useAppStore(s => s.isStyleFontExpanded);
  const setIsStyleFontExpanded = useAppStore(s => s.setIsStyleFontExpanded);
  const isWatermarkExpanded = useAppStore(s => s.isWatermarkExpanded);
  const setIsWatermarkExpanded = useAppStore(s => s.setIsWatermarkExpanded);
  const isAdvancedColorsExpanded = useAppStore(s => s.isAdvancedColorsExpanded);
  const setIsAdvancedColorsExpanded = useAppStore(s => s.setIsAdvancedColorsExpanded);
  const isMobileDesignSettingsOpen = useAppStore(s => s.isMobileDesignSettingsOpen);
  const setIsMobileDesignSettingsOpen = useAppStore(s => s.setIsMobileDesignSettingsOpen);

  // News Card State
  const url = useAppStore(s => s.url);
  const setUrl = useAppStore(s => s.setUrl);
  const loading = useAppStore(s => s.loading);
  const setLoading = useAppStore(s => s.setLoading);
  const error = useAppStore(s => s.error);
  const setError = useAppStore(s => s.setError);
  const title = useAppStore(s => s.title);
  const setTitle = useAppStore(s => s.setTitle);
  const visualTitle = useAppStore(s => s.visualTitle);
  const setVisualTitle = useAppStore(s => s.setVisualTitle);
  const isVisualMode = useAppStore(s => s.isVisualMode);
  const setIsVisualMode = useAppStore(s => s.setIsVisualMode);
  const image = useAppStore(s => s.image);
  const setImage = useAppStore(s => s.setImage); // URL or Base64
  const image2 = useAppStore(s => s.image2);
  const setImage2 = useAppStore(s => s.setImage2); // Second image for Design 17
  const date = useAppStore(s => s.date);
  const setDate = useAppStore(s => s.setDate);
  
  // Branding State (Shared)
  const brandName = useAppStore(s => s.brandName);
  const setBrandName = useAppStore(s => s.setBrandName);
  const brandFontSize = useAppStore(s => s.brandFontSize);
  const setBrandFontSize = useAppStore(s => s.setBrandFontSize);
  const brandColor = useAppStore(s => s.brandColor);
  const setBrandColor = useAppStore(s => s.setBrandColor);
  const customWebsite = useAppStore(s => s.customWebsite);
  const setCustomWebsite = useAppStore(s => s.setCustomWebsite);
  const customLogo = useAppStore(s => s.customLogo);
  const setCustomLogo = useAppStore(s => s.setCustomLogo);
  const fullBrandLogo = useAppStore(s => s.fullBrandLogo);
  const setFullBrandLogo = useAppStore(s => s.setFullBrandLogo);
  const fullBrandLogoHeight = useAppStore(s => s.fullBrandLogoHeight);
  const setFullBrandLogoHeight = useAppStore(s => s.setFullBrandLogoHeight);
  const videoLogo = useAppStore(s => s.videoLogo);
  const setVideoLogo = useAppStore(s => s.setVideoLogo);
  const videoLogoScale = useAppStore(s => s.videoLogoScale);
  const setVideoLogoScale = useAppStore(s => s.setVideoLogoScale);
  const videoLogoX = useAppStore(s => s.videoLogoX);
  const setVideoLogoX = useAppStore(s => s.setVideoLogoX);
  const videoLogoY = useAppStore(s => s.videoLogoY);
  const setVideoLogoY = useAppStore(s => s.setVideoLogoY);
  const design18LogoHeight = useAppStore(s => s.design18LogoHeight);
  const setDesign18LogoHeight = useAppStore(s => s.setDesign18LogoHeight);

  // News Design State
  const selectedDesign = useAppStore(s => s.selectedDesign);
  const videoResolution = useAppStore(s => s.videoResolution);
  const setVideoResolution = useAppStore(s => s.setVideoResolution);
  const setSelectedDesign = useAppStore(s => s.setSelectedDesign);
  const themeColor = useAppStore(s => s.themeColor);
  const setThemeColor = useAppStore(s => s.setThemeColor);
  const gradientStart = useAppStore(s => s.gradientStart);
  const setGradientStart = useAppStore(s => s.setGradientStart); // Dark gray
  const gradientEnd = useAppStore(s => s.gradientEnd);
  const setGradientEnd = useAppStore(s => s.setGradientEnd); // Black
  const cardGradientStart = useAppStore(s => s.cardGradientStart);
  const setCardGradientStart = useAppStore(s => s.setCardGradientStart);
  const cardGradientEnd = useAppStore(s => s.cardGradientEnd);
  const setCardGradientEnd = useAppStore(s => s.setCardGradientEnd);
  const headlineFontSize = useAppStore(s => s.headlineFontSize);
  const setHeadlineFontSize = useAppStore(s => s.setHeadlineFontSize);
  const headlineColor = useAppStore(s => s.headlineColor);
  const setHeadlineColor = useAppStore(s => s.setHeadlineColor);
  const backgroundPatterns = useAppStore(s => s.backgroundPatterns);
  const setBackgroundPatterns = useAppStore(s => s.setBackgroundPatterns);
  const patternScale = useAppStore(s => s.patternScale);
  const setPatternScale = useAppStore(s => s.setPatternScale);
  const patternRotation = useAppStore(s => s.patternRotation);
  const setPatternRotation = useAppStore(s => s.setPatternRotation);
  const patternOpacity = useAppStore(s => s.patternOpacity);
  const setPatternOpacity = useAppStore(s => s.setPatternOpacity);
  const patternColor = useAppStore(s => s.patternColor);
  const setPatternColor = useAppStore(s => s.setPatternColor);
  const isPatternSettingsExpanded = useAppStore(s => s.isPatternSettingsExpanded);
  const setIsPatternSettingsExpanded = useAppStore(s => s.setIsPatternSettingsExpanded);
  const customFontUrl = useAppStore(s => s.customFontUrl);
  const setCustomFontUrl = useAppStore(s => s.setCustomFontUrl);
  const customFontName = useAppStore(s => s.customFontName);
  const setCustomFontName = useAppStore(s => s.setCustomFontName);
  const brandFontUrl = useAppStore(s => s.brandFontUrl);
  const setBrandFontUrl = useAppStore(s => s.setBrandFontUrl);
  const brandFontName = useAppStore(s => s.brandFontName);
  const setBrandFontName = useAppStore(s => s.setBrandFontName);
  const overlayOpacity = useAppStore(s => s.overlayOpacity);
  const setOverlayOpacity = useAppStore(s => s.setOverlayOpacity); // Default 20%
  const showGeometricShapes = useAppStore(s => s.showGeometricShapes);
  const setShowGeometricShapes = useAppStore(s => s.setShowGeometricShapes);
  const showDetailedNewsBox = useAppStore(s => s.showDetailedNewsBox);
  const setShowDetailedNewsBox = useAppStore(s => s.setShowDetailedNewsBox);
  const geometricShapeColor = useAppStore(s => s.geometricShapeColor);
  const setGeometricShapeColor = useAppStore(s => s.setGeometricShapeColor);
  const geometricShapeOpacity = useAppStore(s => s.geometricShapeOpacity);
  const setGeometricShapeOpacity = useAppStore(s => s.setGeometricShapeOpacity); // Default 20% opacity
  const geometricShapesConfig = useAppStore(s => s.geometricShapesConfig);
  const setGeometricShapesConfig = useAppStore(s => s.setGeometricShapesConfig);
  const lastExtractedImage = useAppStore(s => s.lastExtractedImage);
  const setLastExtractedImage = useAppStore(s => s.setLastExtractedImage);
  const lastExtractedImageRef = useRef("");
  const applyGradientToAll = useAppStore(s => s.applyGradientToAll);
  const setApplyGradientToAll = useAppStore(s => s.setApplyGradientToAll);
  const newsImageScale = useAppStore(s => s.newsImageScale);
  const setNewsImageScale = useAppStore(s => s.setNewsImageScale);
  const autoColorMode = useAppStore(s => s.autoColorMode);
  const setAutoColorMode = useAppStore(s => s.setAutoColorMode);
  
  // Advanced Color Settings
  const customDateColor = useAppStore(s => s.customDateColor);
  const setCustomDateColor = useAppStore(s => s.setCustomDateColor);
  const customDateBgColor = useAppStore(s => s.customDateBgColor);
  const setCustomDateBgColor = useAppStore(s => s.setCustomDateBgColor);
  const customDetailsTextColor = useAppStore(s => s.customDetailsTextColor);
  const setCustomDetailsTextColor = useAppStore(s => s.setCustomDetailsTextColor);
  const customVisitTextColor = useAppStore(s => s.customVisitTextColor);
  const setCustomVisitTextColor = useAppStore(s => s.setCustomVisitTextColor);
  const customLogoTextColor = useAppStore(s => s.customLogoTextColor);
  const setCustomLogoTextColor = useAppStore(s => s.setCustomLogoTextColor);
  const customLogoBgColor = useAppStore(s => s.customLogoBgColor);
  const setCustomLogoBgColor = useAppStore(s => s.setCustomLogoBgColor);
  const customQrColor = useAppStore(s => s.customQrColor);
  const setCustomQrColor = useAppStore(s => s.setCustomQrColor);
  const customSocialIconColor = useAppStore(s => s.customSocialIconColor);
  const setCustomSocialIconColor = useAppStore(s => s.setCustomSocialIconColor);
  
  // Design 11 Specific State
  const description = useAppStore(s => s.description);
  const setDescription = useAppStore(s => s.setDescription);
  const hashtag = useAppStore(s => s.hashtag);
  const setHashtag = useAppStore(s => s.setHashtag);
  const showSocialIcons = useAppStore(s => s.showSocialIcons);
  const setShowSocialIcons = useAppStore(s => s.setShowSocialIcons);
  const descriptionFontSize = useAppStore(s => s.descriptionFontSize);
  const setDescriptionFontSize = useAppStore(s => s.setDescriptionFontSize);
  const descriptionColor = useAppStore(s => s.descriptionColor);
  const setDescriptionColor = useAppStore(s => s.setDescriptionColor);
  const descriptionBgColor = useAppStore(s => s.descriptionBgColor);
  const setDescriptionBgColor = useAppStore(s => s.setDescriptionBgColor);
  const showDescriptionBg = useAppStore(s => s.showDescriptionBg);
  const setShowDescriptionBg = useAppStore(s => s.setShowDescriptionBg);
  const descriptionTextAlign = useAppStore(s => s.descriptionTextAlign);
  const setDescriptionTextAlign = useAppStore(s => s.setDescriptionTextAlign);
  const descriptionOffsetX = useAppStore(s => s.descriptionOffsetX);
  const setDescriptionOffsetX = useAppStore(s => s.setDescriptionOffsetX);
  const descriptionOffsetY = useAppStore(s => s.descriptionOffsetY);
  const setDescriptionOffsetY = useAppStore(s => s.setDescriptionOffsetY);

  // Design 19 Specific State
  const illustrationPrompt = useAppStore(s => s.illustrationPrompt);
  const setIllustrationPrompt = useAppStore(s => s.setIllustrationPrompt);
  const isGeneratingIllustration = useAppStore(s => s.isGeneratingIllustration);
  const setIsGeneratingIllustration = useAppStore(s => s.setIsGeneratingIllustration);

  // Quote Card State
  const quoteText = useAppStore(s => s.quoteText);
  const setQuoteText = useAppStore(s => s.setQuoteText);
  const speakerName = useAppStore(s => s.speakerName);
  const setSpeakerName = useAppStore(s => s.setSpeakerName);
  const speakerDesignation = useAppStore(s => s.speakerDesignation);
  const setSpeakerDesignation = useAppStore(s => s.setSpeakerDesignation);
  const quoteImage = useAppStore(s => s.quoteImage);
  const setQuoteImage = useAppStore(s => s.setQuoteImage);
  const quoteFontSize = useAppStore(s => s.quoteFontSize);
  const setQuoteFontSize = useAppStore(s => s.setQuoteFontSize);
  const quoteColor = useAppStore(s => s.quoteColor);
  const setQuoteColor = useAppStore(s => s.setQuoteColor);
  const imageScale = useAppStore(s => s.imageScale);
  const videoFit = useAppStore(s => s.videoFit);
  const videoBgColor = useAppStore(s => s.videoBgColor);
  const setVideoFit = useAppStore(s => s.setVideoFit);
  const setVideoBgColor = useAppStore(s => s.setVideoBgColor);
  const setImageScale = useAppStore(s => s.setImageScale);
  const image2Scale = useAppStore(s => s.image2Scale);
  const setImage2Scale = useAppStore(s => s.setImage2Scale);
  const image2OffsetY = useAppStore(s => s.image2OffsetY);
  const setImage2OffsetY = useAppStore(s => s.setImage2OffsetY);
  const image2OffsetX = useAppStore(s => s.image2OffsetX);
  const setImage2OffsetX = useAppStore(s => s.setImage2OffsetX);
  const image2FlipH = useAppStore(s => s.image2FlipH);
  const setImage2FlipH = useAppStore(s => s.setImage2FlipH);
  const imageFilter = useAppStore(s => s.imageFilter);
  const setImageFilter = useAppStore(s => s.setImageFilter);
  const image2Filter = useAppStore(s => s.image2Filter);
  const setImage2Filter = useAppStore(s => s.setImage2Filter);
  const imageVignette = useAppStore(s => s.imageVignette);
  const setImageVignette = useAppStore(s => s.setImageVignette);
  const image2Vignette = useAppStore(s => s.image2Vignette);
  const setImage2Vignette = useAppStore(s => s.setImage2Vignette);
  const watermarkScale = useAppStore(s => s.watermarkScale);
  const setWatermarkScale = useAppStore(s => s.setWatermarkScale);
  const watermarkOpacity = useAppStore(s => s.watermarkOpacity);
  const setWatermarkOpacity = useAppStore(s => s.setWatermarkOpacity);
  const showWatermark = useAppStore(s => s.showWatermark);
  const setShowWatermark = useAppStore(s => s.setShowWatermark);
  const quoteTextAlign = useAppStore(s => s.quoteTextAlign);
  const setQuoteTextAlign = useAppStore(s => s.setQuoteTextAlign);
  const quoteFontFamily = useAppStore(s => s.quoteFontFamily);
  const setQuoteFontFamily = useAppStore(s => s.setQuoteFontFamily);
  const quoteFontUrl = useAppStore(s => s.quoteFontUrl);
  const setQuoteFontUrl = useAppStore(s => s.setQuoteFontUrl);
  const neonColor = useAppStore(s => s.neonColor);
  const setNeonColor = useAppStore(s => s.setNeonColor);
  const showNeon = useAppStore(s => s.showNeon);
  const setShowNeon = useAppStore(s => s.setShowNeon);
  const removeBackground = useAppStore(s => s.removeBackground);
  const setRemoveBackground = useAppStore(s => s.setRemoveBackground);
  const quoteGradientStart = useAppStore(s => s.quoteGradientStart);
  const setQuoteGradientStart = useAppStore(s => s.setQuoteGradientStart);
  const quoteGradientEnd = useAppStore(s => s.quoteGradientEnd);
  const setQuoteGradientEnd = useAppStore(s => s.setQuoteGradientEnd);

  const photocardRef = useRef<HTMLDivElement>(null);
  const quoteCardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const quoteImageInputRef = useRef<HTMLInputElement>(null);
  const isSwitchingDesign = useRef(false);
  const imageOffsetY = useAppStore(s => s.imageOffsetY);
  const setImageOffsetY = useAppStore(s => s.setImageOffsetY);
  const imageOffsetX = useAppStore(s => s.imageOffsetX);
  const setImageOffsetX = useAppStore(s => s.setImageOffsetX);
  const imageFlipH = useAppStore(s => s.imageFlipH);
  const setImageFlipH = useAppStore(s => s.setImageFlipH);
  const textAlign = useAppStore(s => s.textAlign);
  const setTextAlign = useAppStore(s => s.setTextAlign);

  const scrollToPanel = useCallback((panelId: string) => {
    // Expand the corresponding panel
    if (panelId.startsWith('panel-content-editor')) setIsContentEditorExpanded(true);
    if (panelId.startsWith('panel-design-settings')) setIsDesignSettingsExpanded(true);
    if (panelId.startsWith('panel-brand-settings')) setIsBrandingExpanded(true);
    if (panelId.startsWith('panel-watermark-settings')) setIsWatermarkExpanded(true);
    if (panelId.startsWith('panel-quote-editor')) setIsQuoteSpeakerExpanded(true);
    if (panelId.startsWith('panel-style-settings')) setIsStyleFontExpanded(true);
    if (panelId.startsWith('panel-advanced-colors')) setIsAdvancedColorsExpanded(true);

    // Wait for the DOM to update and expand before calculating scroll position
    setTimeout(() => {
      const element = document.getElementById(panelId);
      if (element) {
        // Find the scrollable container (the left sidebar)
        const container = element.closest('.custom-scrollbar') || window;
        
        // Calculate position
        const elementRect = element.getBoundingClientRect();
        const containerRect = container === window 
          ? { top: 0 } 
          : (container as HTMLElement).getBoundingClientRect();
        
        const scrollTop = container === window 
          ? window.scrollY 
          : (container as HTMLElement).scrollTop;
          
        const targetY = elementRect.top - containerRect.top + scrollTop - 20; // 20px padding
        
        container.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      }
    }, 100);
  }, []);

  // Load settings from LocalStorage or Firebase
  useEffect(() => {
    const applySettings = (data: any) => {
      if (data.language !== undefined) setLanguage(data.language);
      if (data.darkMode !== undefined) setDarkMode(data.darkMode);
      if (data.url !== undefined) setUrl(data.url);
      if (data.title !== undefined) setTitle(data.title);
      if (data.visualTitle !== undefined) setVisualTitle(data.visualTitle);
      if (data.isVisualMode !== undefined) setIsVisualMode(data.isVisualMode);
      if (data.image !== undefined) { if (typeof data.image === "string" && (data.image.startsWith("blob:") || data.image.startsWith("data:video/blob;"))) setImage(""); else setImage(data.image); }
      if (data.image2 !== undefined) { if (typeof data.image2 === "string" && (data.image2.startsWith("blob:") || data.image2.startsWith("data:video/blob;"))) setImage2(""); else setImage2(data.image2); }
      if (data.brandName !== undefined) {
        if (data.brandName === "" && !data.customLogo) {
          setBrandName("নিউজ সাইটের নাম");
        } else {
          setBrandName(data.brandName);
        }
      }
      if (data.brandFontSize !== undefined) setBrandFontSize(data.brandFontSize);
      if (data.brandColor !== undefined) setBrandColor(data.brandColor);
      if (data.customWebsite !== undefined) setCustomWebsite(data.customWebsite);
      if (data.customLogo !== undefined) setCustomLogo(data.customLogo);
      if (data.fullBrandLogo !== undefined) setFullBrandLogo(data.fullBrandLogo);
      if (data.fullBrandLogoHeight !== undefined) setFullBrandLogoHeight(data.fullBrandLogoHeight);
      if (data.design18LogoHeight !== undefined) setDesign18LogoHeight(data.design18LogoHeight);
      if (data.selectedDesign !== undefined) setSelectedDesign(data.selectedDesign);
      if (data.themeColor !== undefined) setThemeColor(data.themeColor);
      if (data.gradientStart !== undefined) setGradientStart(data.gradientStart);
      if (data.gradientEnd !== undefined) setGradientEnd(data.gradientEnd);
      if (data.cardGradientStart !== undefined) setCardGradientStart(data.cardGradientStart);
      if (data.cardGradientEnd !== undefined) setCardGradientEnd(data.cardGradientEnd);
      if (data.headlineFontSize !== undefined) setHeadlineFontSize(data.headlineFontSize);
      if (data.headlineColor !== undefined) setHeadlineColor(data.headlineColor);
      if (data.backgroundPatterns !== undefined) setBackgroundPatterns(data.backgroundPatterns);
      if (data.patternScale !== undefined) setPatternScale(data.patternScale);
      if (data.patternRotation !== undefined) setPatternRotation(data.patternRotation);
      if (data.patternOpacity !== undefined) setPatternOpacity(data.patternOpacity);
      if (data.patternColor !== undefined) setPatternColor(data.patternColor);
      if (data.customFontUrl !== undefined) setCustomFontUrl(data.customFontUrl);
      if (data.customFontName !== undefined) setCustomFontName(data.customFontName);
      if (data.brandFontUrl !== undefined) setBrandFontUrl(data.brandFontUrl);
      if (data.brandFontName !== undefined) setBrandFontName(data.brandFontName);
      if (data.overlayOpacity !== undefined) setOverlayOpacity(data.overlayOpacity);
      if (data.showGeometricShapes !== undefined) setShowGeometricShapes(data.showGeometricShapes);
      if (data.showDetailedNewsBox !== undefined) setShowDetailedNewsBox(data.showDetailedNewsBox);
      if (data.geometricShapeColor !== undefined) setGeometricShapeColor(data.geometricShapeColor);
      if (data.geometricShapeOpacity !== undefined) setGeometricShapeOpacity(data.geometricShapeOpacity);
      if (data.geometricShapesConfig !== undefined) setGeometricShapesConfig(data.geometricShapesConfig);
      if (data.applyGradientToAll !== undefined) setApplyGradientToAll(data.applyGradientToAll);
      if (data.newsImageScale !== undefined) setNewsImageScale(data.newsImageScale);
      if (data.autoColorMode !== undefined) setAutoColorMode(data.autoColorMode);
      if (data.description !== undefined) setDescription(data.description);
      if (data.hashtag !== undefined) setHashtag(data.hashtag);
      if (data.showSocialIcons !== undefined) setShowSocialIcons(data.showSocialIcons);
      if (data.descriptionFontSize !== undefined) setDescriptionFontSize(data.descriptionFontSize);
      if (data.descriptionColor !== undefined) setDescriptionColor(data.descriptionColor);
      if (data.descriptionBgColor !== undefined) setDescriptionBgColor(data.descriptionBgColor);
      if (data.showDescriptionBg !== undefined) setShowDescriptionBg(data.showDescriptionBg);
      if (data.descriptionTextAlign !== undefined) setDescriptionTextAlign(data.descriptionTextAlign);
      if (data.descriptionOffsetX !== undefined) setDescriptionOffsetX(data.descriptionOffsetX);
      if (data.descriptionOffsetY !== undefined) setDescriptionOffsetY(data.descriptionOffsetY);
      if (data.quoteText !== undefined) setQuoteText(data.quoteText);
      if (data.speakerName !== undefined) setSpeakerName(data.speakerName);
      if (data.speakerDesignation !== undefined) setSpeakerDesignation(data.speakerDesignation);
      if (data.quoteImage !== undefined) { if (typeof data.quoteImage === "string" && (data.quoteImage.startsWith("blob:") || data.quoteImage.startsWith("data:video/blob;"))) setQuoteImage(""); else setQuoteImage(data.quoteImage); }
      if (data.quoteFontSize !== undefined) setQuoteFontSize(data.quoteFontSize);
      if (data.quoteColor !== undefined) setQuoteColor(data.quoteColor);
      if (data.imageScale !== undefined) setImageScale(data.imageScale);
        if (data.videoFit !== undefined) useAppStore.getState().setVideoFit(data.videoFit);
      if (data.videoBgColor !== undefined) useAppStore.getState().setVideoBgColor(data.videoBgColor);
        if (data.videoFit !== undefined) setVideoFit(data.videoFit);
        if (data.videoBgColor !== undefined) setVideoBgColor(data.videoBgColor);
      if (data.watermarkScale !== undefined) setWatermarkScale(data.watermarkScale);
      if (data.watermarkOpacity !== undefined) setWatermarkOpacity(data.watermarkOpacity);
      if (data.showWatermark !== undefined) setShowWatermark(data.showWatermark);
      if (data.quoteTextAlign !== undefined) setQuoteTextAlign(data.quoteTextAlign);
      if (data.quoteFontFamily !== undefined) setQuoteFontFamily(data.quoteFontFamily);
      if (data.quoteFontUrl !== undefined) setQuoteFontUrl(data.quoteFontUrl);
      if (data.neonColor !== undefined) setNeonColor(data.neonColor);
      if (data.showNeon !== undefined) setShowNeon(data.showNeon);
      if (data.removeBackground !== undefined) setRemoveBackground(data.removeBackground);
      if (data.quoteGradientStart !== undefined) setQuoteGradientStart(data.quoteGradientStart);
      if (data.quoteGradientEnd !== undefined) setQuoteGradientEnd(data.quoteGradientEnd);
      if (data.imageOffsetY !== undefined) setImageOffsetY(data.imageOffsetY);
      if (data.imageOffsetX !== undefined) setImageOffsetX(data.imageOffsetX);
      if (data.imageFlipH !== undefined) setImageFlipH(data.imageFlipH);
      if (data.textAlign !== undefined) setTextAlign(data.textAlign);
      if (data.customDateColor !== undefined) setCustomDateColor(data.customDateColor);
      if (data.customDateBgColor !== undefined) setCustomDateBgColor(data.customDateBgColor);
      if (data.customDetailsTextColor !== undefined) setCustomDetailsTextColor(data.customDetailsTextColor);
      if (data.customVisitTextColor !== undefined) setCustomVisitTextColor(data.customVisitTextColor);
      if (data.customLogoTextColor !== undefined) setCustomLogoTextColor(data.customLogoTextColor);
      if (data.customLogoBgColor !== undefined) setCustomLogoBgColor(data.customLogoBgColor);
      if (data.customQrColor !== undefined) setCustomQrColor(data.customQrColor);
      if (data.customSocialIconColor !== undefined) setCustomSocialIconColor(data.customSocialIconColor);
    };

    const loadSettings = async () => {
      // 1. Try to load from LocalStorage first
      try {
        const localDataStr = localStorage.getItem("app_settings");
        if (localDataStr) {
          const data = JSON.parse(localDataStr);
          applySettings(data);
          setIsSettingsLoaded(true);
          return; // Exit early if local data exists
        }
      } catch (e) {
        console.error("Error reading from localStorage", e);
      }

      // 2. If no local data, fetch from Firebase
      if (db) {
        try {
          const docRef = doc(db, "settings", "demo_data");
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            applySettings(data);
            
            // Save fetched demo data to local storage for next time
            try {
              localStorage.setItem("app_settings", JSON.stringify(data));
            } catch (e) {
              console.error("Error saving to localStorage", e);
            }
          }
        } catch (error) {
          console.error("Error loading settings from Firebase:", error);
        }
      }

      setIsSettingsLoaded(true);
    };
    
    loadSettings();
  }, []);

  // Save to LocalStorage whenever settings change, but only AFTER initial load
  useEffect(() => {
    if (!isSettingsLoaded) return;

    const currentState = {
      language, darkMode,
      url, title, visualTitle, isVisualMode, image, image2,
      brandName, brandFontSize, brandColor, customWebsite, customLogo, fullBrandLogo, fullBrandLogoHeight, design18LogoHeight,
      selectedDesign, themeColor, gradientStart, gradientEnd, cardGradientStart, cardGradientEnd,
      headlineFontSize, headlineColor, backgroundPatterns, patternScale, patternRotation, patternOpacity, patternColor, customFontUrl, customFontName,
      brandFontUrl, brandFontName, overlayOpacity, showGeometricShapes, showDetailedNewsBox,
      geometricShapeColor, geometricShapeOpacity, geometricShapesConfig, applyGradientToAll,
      newsImageScale, autoColorMode, description, hashtag, showSocialIcons, descriptionFontSize,
      descriptionColor, descriptionBgColor, showDescriptionBg, descriptionTextAlign, descriptionOffsetX, descriptionOffsetY, quoteText, speakerName, speakerDesignation,
      quoteImage, quoteFontSize, quoteColor, imageScale, videoFit, videoBgColor, watermarkScale, watermarkOpacity,
      showWatermark, quoteTextAlign, quoteFontFamily, quoteFontUrl, neonColor, showNeon,
      removeBackground, quoteGradientStart, quoteGradientEnd, imageOffsetY, imageOffsetX,
      imageFlipH, textAlign, customDateColor, customDateBgColor, customDetailsTextColor,
      customVisitTextColor, customLogoTextColor, customLogoBgColor, customQrColor, customSocialIconColor
    };

    const saveTimeout = setTimeout(() => {
      try {
        // Create a copy of the state to save
        const stateToSave = { ...currentState };
        
        // Always strip base64 images from localStorage to prevent quota issues.
        // Images should be re-uploaded or fetched from URLs if needed.
        const isBase64 = (str: string) => str && (str.startsWith('data:image') || str.startsWith('data:video') || str.startsWith('blob:'));
        
        if (isBase64(stateToSave.image)) {
          stateToSave.image = "";
        }
        if (isBase64(stateToSave.image2)) {
          stateToSave.image2 = "";
        }
        if (isBase64(stateToSave.quoteImage)) {
          stateToSave.quoteImage = "";
        }
        if (isBase64(stateToSave.customLogo)) {
          stateToSave.customLogo = "";
        }
        if (isBase64(stateToSave.fullBrandLogo)) {
          stateToSave.fullBrandLogo = "";
        }
        if (isBase64((stateToSave as any).lastExtractedImage)) {
          (stateToSave as any).lastExtractedImage = "";
        }

        localStorage.setItem("app_settings", JSON.stringify(stateToSave));
      } catch (e) {
        console.error("Error saving to localStorage, possibly quota exceeded. Trying without images.", e);
        try {
          const stateWithoutImages = { ...currentState, image: "", image2: "", quoteImage: "", customLogo: "", fullBrandLogo: "", lastExtractedImage: "" } as any;
          localStorage.setItem("app_settings", JSON.stringify(stateWithoutImages));
        } catch (e2) {
          console.error("Still failed to save to localStorage", e2);
        }
      }
    }, 1000); // debounce by 1 second

    return () => clearTimeout(saveTimeout);
  }, [
    isSettingsLoaded,
    language, darkMode, url, title, visualTitle, isVisualMode, image, image2,
    brandName, brandFontSize, brandColor, customWebsite, customLogo, fullBrandLogo, fullBrandLogoHeight, design18LogoHeight,
    selectedDesign, themeColor, gradientStart, gradientEnd, cardGradientStart, cardGradientEnd,
    headlineFontSize, headlineColor, backgroundPatterns, patternScale, patternRotation, patternOpacity, customFontUrl, customFontName,
    brandFontUrl, brandFontName, overlayOpacity, showGeometricShapes, showDetailedNewsBox,
    geometricShapeColor, geometricShapeOpacity, geometricShapesConfig, applyGradientToAll,
    newsImageScale, autoColorMode, description, hashtag, showSocialIcons, descriptionFontSize,
    descriptionColor, descriptionBgColor, showDescriptionBg, descriptionTextAlign, descriptionOffsetX, descriptionOffsetY, quoteText, speakerName, speakerDesignation,
    quoteImage, quoteFontSize, quoteColor, imageScale, videoFit, videoBgColor, watermarkScale, watermarkOpacity,
    showWatermark, quoteTextAlign, quoteFontFamily, quoteFontUrl, neonColor, showNeon,
    removeBackground, quoteGradientStart, quoteGradientEnd, imageOffsetY, imageOffsetX,
    imageFlipH, textAlign, customDateColor, customDateBgColor, customDetailsTextColor,
    customVisitTextColor, customLogoTextColor, customLogoBgColor, customQrColor, customSocialIconColor
  ]);

  // Load custom font if available
  useEffect(() => {
    if (customFontUrl && customFontName) {
      const font = new FontFace(customFontName, `url(${customFontUrl})`);
      font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
      }).catch(err => console.error("Error loading custom font:", err));
    }
  }, [customFontUrl, customFontName]);

  // Load brand font if available
  useEffect(() => {
    if (brandFontUrl && brandFontName) {
      const font = new FontFace(brandFontName, `url(${brandFontUrl})`);
      font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
      }).catch(err => console.error("Error loading brand font:", err));
    }
  }, [brandFontUrl, brandFontName]);

  const handleDesignChange = (newDesign: number) => {
    isSwitchingDesign.current = true;
    setSelectedDesign(newDesign);
    
    // Reset image adjustments on design change
    setImageOffsetY(0);
    setImageOffsetX(0);
    setImageFlipH(false);
    setNewsImageScale(100);

    // Set sensible default colors for specific designs
    if (newDesign === 21) {
      setDescriptionColor("#000000");
      setDescriptionBgColor("#fef266");
    } else {
      setDescriptionColor("rgba(255, 255, 255, 0.9)");
    }

    setTimeout(() => {
      isSwitchingDesign.current = false;
    }, 100);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        if (window.screen && window.screen.orientation && (window.screen.orientation as any).lock) {
          await (window.screen.orientation as any).lock('portrait').catch(() => {
            // Ignore errors if orientation lock is not supported or allowed
          });
        }
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const reloadApp = () => {
    window.location.reload();
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === "bn" ? "en" : "bn");
  };

  const fetchLinkData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/fetch-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch link data");
      }

      setTitle(data.title || "");
      if (data.image) setImage(data.image);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "news" | "news2" | "logo" | "quote" | "watermark" | "fullBrandLogo") => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        const videoUrl = URL.createObjectURL(file);
        const markedUrl = `data:video/blob;${videoUrl}`;
        if (type === "news") {
          setImage(markedUrl);
          setSelectedDesign(20);
        } else if (type === "news2") {
          setImage2(markedUrl);
          setSelectedDesign(20);
        } else if (type === "quote") {
          setQuoteImage(markedUrl);
        }
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = reader.result as string;
        const isVideo = imageUrl.startsWith('data:video/');
        
        // Prevent video upload for logos and quotes
        if (isVideo && (type === "logo" || type === "quote" || type === "watermark" || type === "fullBrandLogo")) {
          showToast.error(language === 'bn' ? 'এই অংশে ভিডিও আপলোড করা যাবে না।' : 'Video upload is not supported here.');
          return;
        }

        if (type === "news") {
          const appState = useAppStore.getState();
          if (isVideo) {
            setImage(imageUrl);
            setSelectedDesign(20);
          } else if (appState.selectedDesign === 21 && appState.removeBackground) {
            // Show original image while processing
            setImage(imageUrl);
            showToast.loading(language === 'bn' ? 'ছবির ব্যাকগ্রাউন্ড রিমুভ করা হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...' : 'Removing background, please wait...', { id: 'bg-remove' });
            try {
              const { removeBackground } = await import('@imgly/background-removal');
              const config = {
                publicPath: "https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/",
                progress: (key: string, current: number, total: number) => {
                  if (total > 0 && current <= total) {
                    const percent = Math.round((current / total) * 100);
                    const msgBn = key.includes('fetch') ? `মডেল ডাউনলোড হচ্ছে (${percent}%)...` : `ব্যাকগ্রাউন্ড রিমুভ হচ্ছে (${percent}%)...`;
                    const msgEn = key.includes('fetch') ? `Downloading model (${percent}%)...` : `Processing (${percent}%)...`;
                    showToast.loading(language === 'bn' ? msgBn : msgEn, { id: 'bg-remove' });
                  }
                }
              };
              const blob = await removeBackground(file, config);
              const blobReader = new FileReader();
              blobReader.onloadend = () => {
                setImage(blobReader.result as string);
                showToast.success(language === 'bn' ? 'ব্যাকগ্রাউন্ড সফলভাবে রিমুভ করা হয়েছে!' : 'Background removed successfully!', { id: 'bg-remove' });
              };
              blobReader.readAsDataURL(blob);
            } catch (err: any) {
              console.error("Background removal error:", err);
              showToast.error(language === 'bn' ? `রিমুভ ব্যর্থ: ${err.message || 'অজানা ত্রুটি'}` : `Failed to remove background: ${err.message || 'Unknown error'}`, { id: 'bg-remove' });
            }
          } else {
            setImage(imageUrl);
            if (appState.selectedDesign !== 21) {
              await generateContentFromImage(imageUrl, "news");
            }
          }
        } else if (type === "news2") {
          setImage2(imageUrl);
          if (isVideo) setSelectedDesign(20);
        } else if (type === "logo") {
          setCustomLogo(imageUrl);
        } else if (type === "quote") {
          setQuoteImage(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generateContentFromImage = async (base64Image: string, type: "news" | "quote") => {
    try {
      const appState = useAppStore.getState();
      // Ensure we never auto-generate text for Design 21
      if (appState.selectedDesign === 21) {
        return;
      }
      showToast.success(language === 'bn' ? 'ছবি থেকে এআই দিয়ে কন্টেন্ট তৈরি হচ্ছে...' : 'Generating content from image using AI...');
      const { GoogleGenAI } = await import('@google/genai');
      const apiKey = localStorage.getItem('GEMINI_API_KEY') || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        showToast.error(language === 'bn' ? 'API Key পাওয়া যায়নি। দয়া করে সেটিংস থেকে সেট করুন।' : 'API Key missing. Please set it in Settings.');
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      
      const base64Data = base64Image.split(',')[1];
      const mimeType = base64Image.split(';')[0].split(':')[1];
      
      let prompt = "";
      if (type === "news") {
        prompt = `Analyze this image and generate a catchy news headline and a short news description in Bengali. 
        Return the response strictly in JSON format like this:
        {
          "headline": "Your generated headline here",
          "description": "Your generated description here"
        }`;
      } else if (type === "quote") {
        prompt = `Analyze this image and generate a meaningful quote and a suitable speaker name in Bengali based on the visual context. 
        Return the response strictly in JSON format like this:
        {
          "quote": "Your generated quote here",
          "speaker": "Speaker Name"
        }`;
      }

      let response;
      const contentsPayload = {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      };

      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite-preview',
          contents: contentsPayload,
        });
      } catch (firstError) {
        console.warn("Primary model failed, falling back to gemini-3-flash-preview", firstError);
        response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: contentsPayload,
        });
      }

      if (response.text) {
        const text = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(text);
        
        if (type === "news") {
          if (data.headline) setTitle(data.headline);
          if (data.description) setDescription(data.description);
        } else if (type === "quote") {
          if (data.quote) setQuoteText(data.quote);
          if (data.speaker) setSpeakerName(data.speaker);
        }
        showToast.success(language === 'bn' ? 'এআই কন্টেন্ট তৈরি সম্পন্ন হয়েছে!' : 'AI content generation complete!');
      }
    } catch (error: any) {
      console.error("Error generating content from image:", error);
      const errorMsg = error?.message || '';
      if (errorMsg.includes('API key not valid') || errorMsg.includes('API_KEY_INVALID')) {
        showToast.error(language === 'bn' ? 'আপনার API Key সঠিক নয়। দয়া করে সেটিংস থেকে সঠিক Key দিন অথবা মুছে ফেলুন।' : 'Invalid API Key. Please check your settings.');
      } else {
        showToast.error(language === 'bn' ? `এআই কন্টেন্ট তৈরি করতে সমস্যা হয়েছে: ${errorMsg}` : `Failed to generate AI content: ${errorMsg}`);
      }
    }
  };

  const handleColorExtracted = useCallback((color: string, rgb: [number, number, number]) => {
    if (!image || !autoColorMode) return;
    
    if (image !== lastExtractedImageRef.current) {
      setThemeColor(color);
      
      // Calculate relative luminance (WCAG formula) for better contrast detection
      // Convert RGB values to sRGB
      const sRGB = rgb.map(val => {
        val /= 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      const luminance = 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
      
      // If luminance is low (dark background), use white text. If high (light background), use dark text.
      // Threshold is typically around 0.179 for WCAG, but 0.5 is often used for simple contrast.
      const newHeadlineColor = luminance > 0.179 ? '#111827' : '#ffffff';
      setHeadlineColor(newHeadlineColor);
      
      // For brand color, ensure it has enough contrast against the background
      if (luminance > 0.179) {
        // Light background -> dark brand color
        setBrandColor('#111827');
      } else {
        // Dark background -> light brand color or the extracted color if it's bright enough
        // Since the extracted color IS the background, using it for text would be invisible.
        // We use white instead for better visibility.
        setBrandColor('#ffffff');
      }
      
      // Set gradients based on the extracted color
      setGradientStart(color);
      const darken = (factor: number) => `rgb(${Math.floor(rgb[0] * factor)}, ${Math.floor(rgb[1] * factor)}, ${Math.floor(rgb[2] * factor)})`;
      setGradientEnd(darken(0.5));
      setCardGradientStart(color);
      setCardGradientEnd(darken(0.5));
      
      setNeonColor(color);
      lastExtractedImageRef.current = image;
      setLastExtractedImage(image);
    }
  }, [image, autoColorMode]);

  // Reset auto color mode when a new image is loaded or fetched
  useEffect(() => {
    if (image && image !== lastExtractedImageRef.current) {
      setAutoColorMode(true);
    }
  }, [image]);

  const resetAll = () => {
    // Reset Content
    setUrl("");
    setTitle("");
    setImage("");
    setImage2("");
    setQuoteText("");
    setSpeakerName("");
    setSpeakerDesignation("");
    setQuoteImage("");
    setDescription("");
    setHashtag("");
    
    // Reset Image Adjustments
    setImageOffsetY(0);
    setImageOffsetX(0);
    setImageFlipH(false);
    setNewsImageScale(100);
    setImageScale(100);
  };

  const randomizeGeometricShapes = () => {
    const types = ['circle', 'cross', 'hexagon', 'square', 'dots', 'parallelLines', 'triangle', 'zigzag', 'circleDots', 'dottedCircle', 'solidCircle'];
    const newConfig = Array.from({ length: 15 }).map(() => {
      const type = types[Math.floor(Math.random() * types.length)];
      const size = Math.floor(Math.random() * 150) + 30; // 30px to 180px
      const top = Math.random() > 0.5 ? `${Math.floor(Math.random() * 100)}%` : undefined;
      const bottom = top ? undefined : `${Math.floor(Math.random() * 100)}%`;
      const left = Math.random() > 0.5 ? `${Math.floor(Math.random() * 100)}%` : undefined;
      const right = left ? undefined : `${Math.floor(Math.random() * 100)}%`;
      const rotation = Math.floor(Math.random() * 360);
      const opacityMultiplier = Math.random() * 0.8 + 0.2; // 0.2 to 1.0 multiplier

      return { type, size, top, bottom, left, right, rotation, opacityMultiplier };
    });
    setGeometricShapesConfig(newConfig);
  };

  const resetGeometricShapes = () => {
    setGeometricShapesConfig([]);
  };

  const applyRandomDesign = () => {
    isSwitchingDesign.current = true;
    // Random design 0-19
    const randomDesign = Math.floor(Math.random() * 20);
    setSelectedDesign(randomDesign);

    // Random color
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    setThemeColor(randomColor);
    
    // Calculate contrast for headline
    const hex = randomColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    setHeadlineColor(luminance > 0.5 ? '#111827' : '#ffffff');
    setBrandColor(luminance > 0.8 ? '#111827' : randomColor);

    // Random gradients
    setGradientStart(randomColor);
    const darken = (factor: number) => `rgb(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)})`;
    setGradientEnd(darken(0.5));
    setCardGradientStart(randomColor);
    setCardGradientEnd(darken(0.5));
    setNeonColor(randomColor);
    
    // Random geometric shapes toggle
    setShowGeometricShapes(Math.random() > 0.5);
    
    // Random overlay opacity (10-60)
    setOverlayOpacity(Math.floor(Math.random() * 50) + 10);
    
    setTimeout(() => {
      isSwitchingDesign.current = false;
    }, 100);
  };

  const loadDemoSetup = async () => {
    if (!db) {
      showToast.error("Firebase is not initialized.");
      return false;
    }

    try {
      showToast.success(language === 'bn' ? 'ডেমো ডাটা লোড হচ্ছে...' : 'Loading demo data...');
      const docRef = doc(db, "settings", "demo_data");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Apply the settings
        if (data.language !== undefined) setLanguage(data.language);
        if (data.darkMode !== undefined) setDarkMode(data.darkMode);
        if (data.url !== undefined) setUrl(data.url);
        if (data.title !== undefined) setTitle(data.title);
        if (data.visualTitle !== undefined) setVisualTitle(data.visualTitle);
        if (data.isVisualMode !== undefined) setIsVisualMode(data.isVisualMode);
        if (data.image !== undefined) setImage(data.image);
        if (data.image2 !== undefined) setImage2(data.image2);
        if (data.brandName !== undefined) setBrandName(data.brandName);
        if (data.brandFontSize !== undefined) setBrandFontSize(data.brandFontSize);
        if (data.brandColor !== undefined) setBrandColor(data.brandColor);
        if (data.customWebsite !== undefined) setCustomWebsite(data.customWebsite);
        if (data.customLogo !== undefined) setCustomLogo(data.customLogo);
        if (data.fullBrandLogo !== undefined) setFullBrandLogo(data.fullBrandLogo);
        if (data.fullBrandLogoHeight !== undefined) setFullBrandLogoHeight(data.fullBrandLogoHeight);
        if (data.design18LogoHeight !== undefined) setDesign18LogoHeight(data.design18LogoHeight);
        if (data.selectedDesign !== undefined) setSelectedDesign(data.selectedDesign);
        if (data.themeColor !== undefined) setThemeColor(data.themeColor);
        if (data.gradientStart !== undefined) setGradientStart(data.gradientStart);
        if (data.gradientEnd !== undefined) setGradientEnd(data.gradientEnd);
        if (data.cardGradientStart !== undefined) setCardGradientStart(data.cardGradientStart);
        if (data.cardGradientEnd !== undefined) setCardGradientEnd(data.cardGradientEnd);
        if (data.headlineFontSize !== undefined) setHeadlineFontSize(data.headlineFontSize);
        if (data.headlineColor !== undefined) setHeadlineColor(data.headlineColor);
        if (data.backgroundPatterns !== undefined) setBackgroundPatterns(data.backgroundPatterns);
        if (data.patternScale !== undefined) setPatternScale(data.patternScale);
        if (data.patternRotation !== undefined) setPatternRotation(data.patternRotation);
        if (data.patternOpacity !== undefined) setPatternOpacity(data.patternOpacity);
        if (data.patternColor !== undefined) setPatternColor(data.patternColor);
        if (data.customFontUrl !== undefined) setCustomFontUrl(data.customFontUrl);
        if (data.customFontName !== undefined) setCustomFontName(data.customFontName);
        if (data.brandFontUrl !== undefined) setBrandFontUrl(data.brandFontUrl);
        if (data.brandFontName !== undefined) setBrandFontName(data.brandFontName);
        if (data.overlayOpacity !== undefined) setOverlayOpacity(data.overlayOpacity);
        if (data.showGeometricShapes !== undefined) setShowGeometricShapes(data.showGeometricShapes);
        if (data.showDetailedNewsBox !== undefined) setShowDetailedNewsBox(data.showDetailedNewsBox);
        if (data.geometricShapeColor !== undefined) setGeometricShapeColor(data.geometricShapeColor);
        if (data.geometricShapeOpacity !== undefined) setGeometricShapeOpacity(data.geometricShapeOpacity);
        if (data.geometricShapesConfig !== undefined) setGeometricShapesConfig(data.geometricShapesConfig);
        if (data.applyGradientToAll !== undefined) setApplyGradientToAll(data.applyGradientToAll);
        if (data.newsImageScale !== undefined) setNewsImageScale(data.newsImageScale);
        if (data.autoColorMode !== undefined) setAutoColorMode(data.autoColorMode);
        if (data.description !== undefined) setDescription(data.description);
        if (data.hashtag !== undefined) setHashtag(data.hashtag);
        if (data.showSocialIcons !== undefined) setShowSocialIcons(data.showSocialIcons);
        if (data.descriptionFontSize !== undefined) setDescriptionFontSize(data.descriptionFontSize);
        if (data.descriptionColor !== undefined) setDescriptionColor(data.descriptionColor);
        if (data.descriptionBgColor !== undefined) setDescriptionBgColor(data.descriptionBgColor);
        if (data.showDescriptionBg !== undefined) setShowDescriptionBg(data.showDescriptionBg);
        if (data.descriptionTextAlign !== undefined) setDescriptionTextAlign(data.descriptionTextAlign);
        if (data.descriptionOffsetX !== undefined) setDescriptionOffsetX(data.descriptionOffsetX);
        if (data.descriptionOffsetY !== undefined) setDescriptionOffsetY(data.descriptionOffsetY);
        if (data.quoteText !== undefined) setQuoteText(data.quoteText);
        if (data.speakerName !== undefined) setSpeakerName(data.speakerName);
        if (data.speakerDesignation !== undefined) setSpeakerDesignation(data.speakerDesignation);
        if (data.quoteImage !== undefined) setQuoteImage(data.quoteImage);
        if (data.quoteFontSize !== undefined) setQuoteFontSize(data.quoteFontSize);
        if (data.quoteColor !== undefined) setQuoteColor(data.quoteColor);
        if (data.imageScale !== undefined) setImageScale(data.imageScale);
        if (data.watermarkScale !== undefined) setWatermarkScale(data.watermarkScale);
        if (data.watermarkOpacity !== undefined) setWatermarkOpacity(data.watermarkOpacity);
        if (data.showWatermark !== undefined) setShowWatermark(data.showWatermark);
        if (data.quoteTextAlign !== undefined) setQuoteTextAlign(data.quoteTextAlign);
        if (data.quoteFontFamily !== undefined) setQuoteFontFamily(data.quoteFontFamily);
        if (data.quoteFontUrl !== undefined) setQuoteFontUrl(data.quoteFontUrl);
        if (data.neonColor !== undefined) setNeonColor(data.neonColor);
        if (data.showNeon !== undefined) setShowNeon(data.showNeon);
        if (data.removeBackground !== undefined) setRemoveBackground(data.removeBackground);
        if (data.quoteGradientStart !== undefined) setQuoteGradientStart(data.quoteGradientStart);
        if (data.quoteGradientEnd !== undefined) setQuoteGradientEnd(data.quoteGradientEnd);
        if (data.imageOffsetY !== undefined) setImageOffsetY(data.imageOffsetY);
        if (data.imageOffsetX !== undefined) setImageOffsetX(data.imageOffsetX);
        if (data.imageFlipH !== undefined) setImageFlipH(data.imageFlipH);
        if (data.textAlign !== undefined) setTextAlign(data.textAlign);
        if (data.customDateColor !== undefined) setCustomDateColor(data.customDateColor);
        if (data.customDateBgColor !== undefined) setCustomDateBgColor(data.customDateBgColor);
        if (data.customDetailsTextColor !== undefined) setCustomDetailsTextColor(data.customDetailsTextColor);
        if (data.customVisitTextColor !== undefined) setCustomVisitTextColor(data.customVisitTextColor);
        if (data.customLogoTextColor !== undefined) setCustomLogoTextColor(data.customLogoTextColor);
        if (data.customLogoBgColor !== undefined) setCustomLogoBgColor(data.customLogoBgColor);
        if (data.customQrColor !== undefined) setCustomQrColor(data.customQrColor);
        if (data.customSocialIconColor !== undefined) setCustomSocialIconColor(data.customSocialIconColor);

        // Save to local storage
        try {
          localStorage.setItem("app_settings", JSON.stringify(data));
        } catch (e) {
          console.error("Error saving to localStorage", e);
        }
        
        showToast.success(language === 'bn' ? 'ডেমো ডাটা সফলভাবে লোড হয়েছে!' : 'Demo data loaded successfully!');
        return true;
      } else {
        showToast.error(language === 'bn' ? 'কোনো ডেমো ডাটা পাওয়া যায়নি।' : 'No demo data found.');
        return false;
      }
    } catch (error) {
      console.error("Error loading demo setup from Firebase:", error);
      showToast.error(language === 'bn' ? 'ডেমো ডাটা লোড করতে সমস্যা হয়েছে।' : 'Failed to load demo data.');
      return false;
    }
  };

  return {
    activeTab, setActiveTab,
    language, setLanguage,
    darkMode, setDarkMode,
    isSettingsLoaded, setIsSettingsLoaded,
    showFontSizeControl, setShowFontSizeControl,
    showColorControl, setShowColorControl,
    showBrandFontSizeControl, setShowBrandFontSizeControl,
    showBrandColorControl, setShowBrandColorControl,
    isBrandingExpanded, setIsBrandingExpanded,
    isContentEditorExpanded, setIsContentEditorExpanded,
    isDesignSettingsExpanded, setIsDesignSettingsExpanded,
    isQuoteSpeakerExpanded, setIsQuoteSpeakerExpanded,
    isStyleFontExpanded, setIsStyleFontExpanded,
    isWatermarkExpanded, setIsWatermarkExpanded,
    isAdvancedColorsExpanded, setIsAdvancedColorsExpanded,
    isMobileDesignSettingsOpen, setIsMobileDesignSettingsOpen,
    url, setUrl,
    loading, setLoading,
    error, setError,
    title, setTitle,
    visualTitle, setVisualTitle,
    isVisualMode, setIsVisualMode,
    image, setImage,
    image2, setImage2,
    date, setDate,
    brandName, setBrandName,
    brandFontSize, setBrandFontSize,
    brandColor, setBrandColor,
    customWebsite, setCustomWebsite,
    customLogo, setCustomLogo,
    fullBrandLogo, setFullBrandLogo,
    fullBrandLogoHeight, setFullBrandLogoHeight, design18LogoHeight, setDesign18LogoHeight,
    videoLogo, setVideoLogo, videoLogoScale, setVideoLogoScale, videoLogoX, setVideoLogoX, videoLogoY, setVideoLogoY,
    selectedDesign, setSelectedDesign: handleDesignChange, videoResolution, setVideoResolution,
    themeColor, setThemeColor,
    gradientStart, setGradientStart,
    gradientEnd, setGradientEnd,
    cardGradientStart, setCardGradientStart,
    cardGradientEnd, setCardGradientEnd,
    headlineFontSize, setHeadlineFontSize,
    headlineColor, setHeadlineColor,
    backgroundPatterns, setBackgroundPatterns,
    patternScale, setPatternScale,
    patternRotation, setPatternRotation,
    patternOpacity, setPatternOpacity,
    patternColor, setPatternColor,
    isPatternSettingsExpanded, setIsPatternSettingsExpanded,
    customFontUrl, setCustomFontUrl,
    customFontName, setCustomFontName,
    brandFontUrl, setBrandFontUrl,
    brandFontName, setBrandFontName,
    overlayOpacity, setOverlayOpacity,
    showGeometricShapes, setShowGeometricShapes,
    showDetailedNewsBox, setShowDetailedNewsBox,
    geometricShapeColor, setGeometricShapeColor,
    geometricShapeOpacity, setGeometricShapeOpacity,
    geometricShapesConfig, setGeometricShapesConfig,
    randomizeGeometricShapes, resetGeometricShapes,
    lastExtractedImage, setLastExtractedImage,
    applyGradientToAll, setApplyGradientToAll,
    newsImageScale, setNewsImageScale,
    autoColorMode, setAutoColorMode,
    description, setDescription,
    hashtag, setHashtag,
    showSocialIcons, setShowSocialIcons,
    descriptionFontSize, setDescriptionFontSize,
    descriptionColor, setDescriptionColor,
    descriptionBgColor, setDescriptionBgColor,
    showDescriptionBg, setShowDescriptionBg,
    descriptionTextAlign, setDescriptionTextAlign,
    descriptionOffsetX, setDescriptionOffsetX,
    descriptionOffsetY, setDescriptionOffsetY,
    illustrationPrompt, setIllustrationPrompt,
    isGeneratingIllustration, setIsGeneratingIllustration,
    quoteText, setQuoteText,
    speakerName, setSpeakerName,
    speakerDesignation, setSpeakerDesignation,
    quoteImage, setQuoteImage,
    quoteFontSize, setQuoteFontSize,
    quoteColor, setQuoteColor,
    imageScale, setImageScale,
    videoFit, setVideoFit,
    videoBgColor, setVideoBgColor,
    image2Scale, setImage2Scale,
    image2OffsetY, setImage2OffsetY,
    image2OffsetX, setImage2OffsetX,
    image2FlipH, setImage2FlipH,
    imageFilter, setImageFilter,
    image2Filter, setImage2Filter,
    imageVignette, setImageVignette,
    image2Vignette, setImage2Vignette,
    watermarkScale, setWatermarkScale,
    watermarkOpacity, setWatermarkOpacity,
    showWatermark, setShowWatermark,
    quoteTextAlign, setQuoteTextAlign,
    quoteFontFamily, setQuoteFontFamily,
    quoteFontUrl, setQuoteFontUrl,
    neonColor, setNeonColor,
    showNeon, setShowNeon,
    removeBackground, setRemoveBackground,
    quoteGradientStart, setQuoteGradientStart,
    quoteGradientEnd, setQuoteGradientEnd,
    photocardRef, quoteCardRef, fileInputRef, fileInputRef2, logoInputRef, quoteImageInputRef,
    imageOffsetY, setImageOffsetY,
    imageOffsetX, setImageOffsetX,
    imageFlipH, setImageFlipH,
    textAlign, setTextAlign,
    customDateColor, setCustomDateColor,
    customDateBgColor, setCustomDateBgColor,
    customDetailsTextColor, setCustomDetailsTextColor,
    customVisitTextColor, setCustomVisitTextColor,
    customLogoTextColor, setCustomLogoTextColor,
    customLogoBgColor, setCustomLogoBgColor,
    customQrColor, setCustomQrColor,
    customSocialIconColor, setCustomSocialIconColor,
    toggleFullscreen, reloadApp, toggleTheme, toggleLanguage,
    fetchLinkData, handleImageUpload, handleColorExtracted, resetAll, applyRandomDesign,
    loadDemoSetup, scrollToPanel
  };
};
