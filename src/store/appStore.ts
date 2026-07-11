export interface AppState {
  activeTab: "news" | "quote";
  language: "en" | "bn";
  darkMode: boolean;
  isSettingsLoaded: boolean;
  showFontSizeControl: boolean;
  showColorControl: boolean;
  showBrandFontSizeControl: boolean;
  showBrandColorControl: boolean;
  isBrandingExpanded: boolean;
  isContentEditorExpanded: boolean;
  isDesignSettingsExpanded: boolean;
  isQuoteSpeakerExpanded: boolean;
  isStyleFontExpanded: boolean;
  isWatermarkExpanded: boolean;
  isAdvancedColorsExpanded: boolean;
  isMobileDesignSettingsOpen: boolean;
  url: string;
  loading: boolean;
  error: string;
  title: string;
  visualTitle: string;
  isVisualMode: boolean;
  image: string;
  image2: string;
  date: Date;
  brandName: string;
  brandFontSize: number;
  brandColor: string;
  customWebsite: string;
  customLogo: string;
  fullBrandLogo: string;
  fullBrandLogoHeight: number;
  videoLogo: string;
  videoLogoScale: number;
  videoLogoX: number;
  videoLogoY: number;
  design18LogoHeight: number;
  selectedDesign: number;
  videoResolution: "1080p" | "720p";
  themeColor: string;
  gradientStart: string;
  gradientEnd: string;
  cardGradientStart: string;
  cardGradientEnd: string;
  headlineFontSize: number;
  headlineColor: string;
  backgroundPatterns: string[];
  patternScale: number;
  patternRotation: number;
  patternOpacity: number;
  patternColor: string;
  isPatternSettingsExpanded: boolean;
  customFontUrl: string;
  customFontName: string;
  brandFontUrl: string;
  brandFontName: string;
  overlayOpacity: number;
  showGeometricShapes: boolean;
  showDetailedNewsBox: boolean;
  geometricShapeColor: string;
  geometricShapeOpacity: number;
  geometricShapesConfig: any[];
  lastExtractedImage: string;
  applyGradientToAll: boolean;
  newsImageScale: number;
  autoColorMode: boolean;
  customDateColor: string;
  customDateBgColor: string;
  customDetailsTextColor: string;
  customVisitTextColor: string;
  customLogoTextColor: string;
  customLogoBgColor: string;
  customQrColor: string;
  customSocialIconColor: string;
  description: string;
  hashtag: string;
  showSocialIcons: boolean;
  descriptionFontSize: number;
  descriptionColor: string;
  descriptionBgColor: string;
  showDescriptionBg: boolean;
  descriptionTextAlign: "left" | "center" | "right" | "justify";
  descriptionOffsetX: number;
  descriptionOffsetY: number;
  illustrationPrompt: string;
  isGeneratingIllustration: boolean;
  quoteText: string;
  speakerName: string;
  speakerDesignation: string;
  quoteImage: string;
  quoteFontSize: number;
  quoteColor: string;
  videoFit: "cover" | "contain";
  videoFadeEdges: boolean;
  videoBgColor: string;
  imageScale: number;
  image2Scale: number;
  image2OffsetY: number;
  image2OffsetX: number;
  image2FlipH: boolean;
  imageFilter: string;
  image2Filter: string;
  imageVignette: number;
  image2Vignette: number;
  watermarkScale: number;
  watermarkOpacity: number;
  showWatermark: boolean;
  quoteTextAlign: "left" | "center" | "right" | "justify";
  quoteFontFamily: string;
  quoteFontUrl: string;
  neonColor: string;
  showNeon: boolean;
  removeBackground: boolean;
  quoteGradientStart: string;
  quoteGradientEnd: string;
  imageOffsetY: number;
  imageOffsetX: number;
  imageFlipH: boolean;
  textAlign: "left" | "center" | "right" | "justify";
  setActiveTab: (val: "news" | "quote") => void;
  setLanguage: (val: "en" | "bn") => void;
  setDarkMode: (val: boolean) => void;
  setIsSettingsLoaded: (val: boolean) => void;
  setShowFontSizeControl: (val: boolean) => void;
  setShowColorControl: (val: boolean) => void;
  setShowBrandFontSizeControl: (val: boolean) => void;
  setShowBrandColorControl: (val: boolean) => void;
  setIsBrandingExpanded: (val: boolean) => void;
  setIsContentEditorExpanded: (val: boolean) => void;
  setIsDesignSettingsExpanded: (val: boolean) => void;
  setIsQuoteSpeakerExpanded: (val: boolean) => void;
  setIsStyleFontExpanded: (val: boolean) => void;
  setIsWatermarkExpanded: (val: boolean) => void;
  setIsAdvancedColorsExpanded: (val: boolean) => void;
  setIsMobileDesignSettingsOpen: (val: boolean) => void;
  setUrl: (val: string) => void;
  setLoading: (val: boolean) => void;
  setError: (val: string) => void;
  setTitle: (val: string) => void;
  setVisualTitle: (val: string) => void;
  setIsVisualMode: (val: boolean) => void;
  setImage: (val: string) => void;
  setImage2: (val: string) => void;
  setDate: (val: Date) => void;
  setBrandName: (val: string) => void;
  setBrandFontSize: (val: number) => void;
  setBrandColor: (val: string) => void;
  setCustomWebsite: (val: string) => void;
  setCustomLogo: (val: string) => void;
  setFullBrandLogo: (val: string) => void;
  setFullBrandLogoHeight: (val: number) => void;
  setVideoLogo: (val: string) => void;
  setVideoLogoScale: (val: number) => void;
  setVideoLogoX: (val: number) => void;
  setVideoLogoY: (val: number) => void;
  setDesign18LogoHeight: (val: number) => void;
  setSelectedDesign: (val: number) => void;
  setVideoResolution: (val: "1080p" | "720p") => void;
  setThemeColor: (val: string) => void;
  setGradientStart: (val: string) => void;
  setGradientEnd: (val: string) => void;
  setCardGradientStart: (val: string) => void;
  setCardGradientEnd: (val: string) => void;
  setHeadlineFontSize: (val: number) => void;
  setHeadlineColor: (val: string) => void;
  setBackgroundPatterns: (val: string[]) => void;
  setPatternScale: (val: number) => void;
  setPatternRotation: (val: number) => void;
  setPatternOpacity: (val: number) => void;
  setPatternColor: (val: string) => void;
  setIsPatternSettingsExpanded: (val: boolean) => void;
  setCustomFontUrl: (val: string) => void;
  setCustomFontName: (val: string) => void;
  setBrandFontUrl: (val: string) => void;
  setBrandFontName: (val: string) => void;
  setOverlayOpacity: (val: number) => void;
  setShowGeometricShapes: (val: boolean) => void;
  setShowDetailedNewsBox: (val: boolean) => void;
  setGeometricShapeColor: (val: string) => void;
  setGeometricShapeOpacity: (val: number) => void;
  setGeometricShapesConfig: (val: any[]) => void;
  setLastExtractedImage: (val: string) => void;
  setApplyGradientToAll: (val: boolean) => void;
  setNewsImageScale: (val: number) => void;
  setAutoColorMode: (val: boolean) => void;
  setCustomDateColor: (val: string) => void;
  setCustomDateBgColor: (val: string) => void;
  setCustomDetailsTextColor: (val: string) => void;
  setCustomVisitTextColor: (val: string) => void;
  setCustomLogoTextColor: (val: string) => void;
  setCustomLogoBgColor: (val: string) => void;
  setCustomQrColor: (val: string) => void;
  setCustomSocialIconColor: (val: string) => void;
  setDescription: (val: string) => void;
  setHashtag: (val: string) => void;
  setShowSocialIcons: (val: boolean) => void;
  setDescriptionFontSize: (val: number) => void;
  setDescriptionColor: (val: string) => void;
  setDescriptionBgColor: (val: string) => void;
  setShowDescriptionBg: (val: boolean) => void;
  setDescriptionTextAlign: (val: "left" | "center" | "right" | "justify") => void;
  setDescriptionOffsetX: (val: number) => void;
  setDescriptionOffsetY: (val: number) => void;
  setIllustrationPrompt: (val: string) => void;
  setIsGeneratingIllustration: (val: boolean) => void;
  setQuoteText: (val: string) => void;
  setSpeakerName: (val: string) => void;
  setSpeakerDesignation: (val: string) => void;
  setQuoteImage: (val: string) => void;
  setQuoteFontSize: (val: number) => void;
  setQuoteColor: (val: string) => void;
  setVideoFit: (val: "cover" | "contain") => void;
  setVideoFadeEdges: (val: boolean) => void;
  setVideoBgColor: (val: string) => void;
  setImageScale: (val: number) => void;
  setImage2Scale: (val: number) => void;
  setImage2OffsetY: (val: number) => void;
  setImage2OffsetX: (val: number) => void;
  setImage2FlipH: (val: boolean) => void;
  setImageFilter: (val: string) => void;
  setImage2Filter: (val: string) => void;
  setImageVignette: (val: number) => void;
  setImage2Vignette: (val: number) => void;
  setWatermarkScale: (val: number) => void;
  setWatermarkOpacity: (val: number) => void;
  setShowWatermark: (val: boolean) => void;
  setQuoteTextAlign: (val: "left" | "center" | "right" | "justify") => void;
  setQuoteFontFamily: (val: string) => void;
  setQuoteFontUrl: (val: string) => void;
  setNeonColor: (val: string) => void;
  setShowNeon: (val: boolean) => void;
  setRemoveBackground: (val: boolean) => void;
  setQuoteGradientStart: (val: string) => void;
  setQuoteGradientEnd: (val: string) => void;
  setImageOffsetY: (val: number) => void;
  setImageOffsetX: (val: number) => void;
  setImageFlipH: (val: boolean) => void;
  setTextAlign: (val: "left" | "center" | "right" | "justify") => void;
}

import { create } from 'zustand';

export const useAppStore = create<AppState>((set) => ({
  activeTab: "news",
  setActiveTab: (val) => set({ activeTab: val }),
  language: "bn",
  setLanguage: (val) => set({ language: val }),
  darkMode: true,
  setDarkMode: (val) => set({ darkMode: val }),
  isSettingsLoaded: false,
  setIsSettingsLoaded: (val) => set({ isSettingsLoaded: val }),
  showFontSizeControl: false,
  setShowFontSizeControl: (val) => set({ showFontSizeControl: val }),
  showColorControl: false,
  setShowColorControl: (val) => set({ showColorControl: val }),
  showBrandFontSizeControl: false,
  setShowBrandFontSizeControl: (val) => set({ showBrandFontSizeControl: val }),
  showBrandColorControl: false,
  setShowBrandColorControl: (val) => set({ showBrandColorControl: val }),
  isBrandingExpanded: false,
  setIsBrandingExpanded: (val) => set({ isBrandingExpanded: val }),
  isContentEditorExpanded: false,
  setIsContentEditorExpanded: (val) => set({ isContentEditorExpanded: val }),
  isDesignSettingsExpanded: false,
  setIsDesignSettingsExpanded: (val) => set({ isDesignSettingsExpanded: val }),
  isQuoteSpeakerExpanded: false,
  setIsQuoteSpeakerExpanded: (val) => set({ isQuoteSpeakerExpanded: val }),
  isStyleFontExpanded: false,
  setIsStyleFontExpanded: (val) => set({ isStyleFontExpanded: val }),
  isWatermarkExpanded: false,
  setIsWatermarkExpanded: (val) => set({ isWatermarkExpanded: val }),
  isAdvancedColorsExpanded: false,
  setIsAdvancedColorsExpanded: (val) => set({ isAdvancedColorsExpanded: val }),
  isMobileDesignSettingsOpen: false,
  setIsMobileDesignSettingsOpen: (val) => set({ isMobileDesignSettingsOpen: val }),
  url: "",
  setUrl: (val) => set({ url: val }),
  loading: false,
  setLoading: (val) => set({ loading: val }),
  error: "",
  setError: (val) => set({ error: val }),
  title: "",
  setTitle: (val) => set({ title: val }),
  visualTitle: "",
  setVisualTitle: (val) => set({ visualTitle: val }),
  isVisualMode: false,
  setIsVisualMode: (val) => set({ isVisualMode: val }),
  image: "",
  setImage: (val) => set({ image: val }),
  image2: "",
  setImage2: (val) => set({ image2: val }),
  date: new Date(),
  setDate: (val) => set({ date: val }),
  brandName: "নিউজ সাইটের নাম",
  setBrandName: (val) => set({ brandName: val }),
  brandFontSize: 40,
  setBrandFontSize: (val) => set({ brandFontSize: val }),
  brandColor: "#5934e8",
  setBrandColor: (val) => set({ brandColor: val }),
  customWebsite: "",
  setCustomWebsite: (val) => set({ customWebsite: val }),
  customLogo: "",
  setCustomLogo: (val) => set({ customLogo: val }),
  fullBrandLogo: "",
  setFullBrandLogo: (val) => set({ fullBrandLogo: val }),
  fullBrandLogoHeight: 60,
  videoLogo: "",
  videoLogoScale: 100,
  videoLogoX: 0,
  videoLogoY: 0,
  setFullBrandLogoHeight: (val) => set({ fullBrandLogoHeight: val }),
  setVideoLogo: (val) => set({ videoLogo: val }),
  setVideoLogoScale: (val) => set({ videoLogoScale: val }),
  setVideoLogoX: (val) => set({ videoLogoX: val }),
  setVideoLogoY: (val) => set({ videoLogoY: val }),
  design18LogoHeight: 120,
  setDesign18LogoHeight: (val) => set({ design18LogoHeight: val }),
  selectedDesign: 0,
  videoResolution: "1080p",
  setSelectedDesign: (val) => set({ selectedDesign: val }),
  setVideoResolution: (val) => set({ videoResolution: val }),
  themeColor: "#f59e0b",
  setThemeColor: (val) => set({ themeColor: val }),
  gradientStart: "#1f2937",
  setGradientStart: (val) => set({ gradientStart: val }),
  gradientEnd: "#000000",
  setGradientEnd: (val) => set({ gradientEnd: val }),
  cardGradientStart: "#1f2937",
  setCardGradientStart: (val) => set({ cardGradientStart: val }),
  cardGradientEnd: "#000000",
  setCardGradientEnd: (val) => set({ cardGradientEnd: val }),
  headlineFontSize: 80,
  setHeadlineFontSize: (val) => set({ headlineFontSize: val }),
  headlineColor: "#111827",
  setHeadlineColor: (val) => set({ headlineColor: val }),
  backgroundPatterns: [],
  setBackgroundPatterns: (val) => set({ backgroundPatterns: val }),
  patternScale: 100,
  setPatternScale: (val) => set({ patternScale: val }),
  patternRotation: 0,
  setPatternRotation: (val) => set({ patternRotation: val }),
  patternOpacity: 10,
  setPatternOpacity: (val) => set({ patternOpacity: val }),
  patternColor: "#888888",
  setPatternColor: (val) => set({ patternColor: val }),
  isPatternSettingsExpanded: false,
  setIsPatternSettingsExpanded: (val) => set({ isPatternSettingsExpanded: val }),
  customFontUrl: "",
  setCustomFontUrl: (val) => set({ customFontUrl: val }),
  customFontName: "Hind Siliguri",
  setCustomFontName: (val) => set({ customFontName: val }),
  brandFontUrl: "",
  setBrandFontUrl: (val) => set({ brandFontUrl: val }),
  brandFontName: "Hind Siliguri",
  setBrandFontName: (val) => set({ brandFontName: val }),
  overlayOpacity: 20,
  setOverlayOpacity: (val) => set({ overlayOpacity: val }),
  showGeometricShapes: true,
  setShowGeometricShapes: (val) => set({ showGeometricShapes: val }),
  showDetailedNewsBox: true,
  setShowDetailedNewsBox: (val) => set({ showDetailedNewsBox: val }),
  geometricShapeColor: "#ffffff",
  setGeometricShapeColor: (val) => set({ geometricShapeColor: val }),
  geometricShapeOpacity: 0.2,
  setGeometricShapeOpacity: (val) => set({ geometricShapeOpacity: val }),
  geometricShapesConfig: [],
  setGeometricShapesConfig: (val) => set({ geometricShapesConfig: val }),
  lastExtractedImage: "",
  setLastExtractedImage: (val) => set({ lastExtractedImage: val }),
  applyGradientToAll: false,
  setApplyGradientToAll: (val) => set({ applyGradientToAll: val }),
  newsImageScale: 100,
  setNewsImageScale: (val) => set({ newsImageScale: val }),
  autoColorMode: true,
  setAutoColorMode: (val) => set({ autoColorMode: val }),
  customDateColor: "",
  setCustomDateColor: (val) => set({ customDateColor: val }),
  customDateBgColor: "",
  setCustomDateBgColor: (val) => set({ customDateBgColor: val }),
  customDetailsTextColor: "",
  setCustomDetailsTextColor: (val) => set({ customDetailsTextColor: val }),
  customVisitTextColor: "",
  setCustomVisitTextColor: (val) => set({ customVisitTextColor: val }),
  customLogoTextColor: "",
  setCustomLogoTextColor: (val) => set({ customLogoTextColor: val }),
  customLogoBgColor: "",
  setCustomLogoBgColor: (val) => set({ customLogoBgColor: val }),
  customQrColor: "",
  setCustomQrColor: (val) => set({ customQrColor: val }),
  customSocialIconColor: "",
  setCustomSocialIconColor: (val) => set({ customSocialIconColor: val }),
  description: "",
  setDescription: (val) => set({ description: val }),
  hashtag: "",
  setHashtag: (val) => set({ hashtag: val }),
  showSocialIcons: true,
  setShowSocialIcons: (val) => set({ showSocialIcons: val }),
  descriptionFontSize: 24,
  setDescriptionFontSize: (val) => set({ descriptionFontSize: val }),
  descriptionColor: "rgba(255, 255, 255, 0.9)",
  setDescriptionColor: (val) => set({ descriptionColor: val }),
  descriptionBgColor: "#fef266",
  setDescriptionBgColor: (val) => set({ descriptionBgColor: val }),
  showDescriptionBg: true,
  setShowDescriptionBg: (val) => set({ showDescriptionBg: val }),
  descriptionTextAlign: "left",
  setDescriptionTextAlign: (val) => set({ descriptionTextAlign: val }),
  descriptionOffsetX: 0,
  setDescriptionOffsetX: (val) => set({ descriptionOffsetX: val }),
  descriptionOffsetY: 0,
  setDescriptionOffsetY: (val) => set({ descriptionOffsetY: val }),
  illustrationPrompt: "Transform this image into a high-quality digital illustration style, similar to a modern vector art or digital painting. Keep the main subjects recognizable but stylized. Add a beautiful, complementary background.",
  setIllustrationPrompt: (val) => set({ illustrationPrompt: val }),
  isGeneratingIllustration: false,
  setIsGeneratingIllustration: (val) => set({ isGeneratingIllustration: val }),
  quoteText: "",
  setQuoteText: (val) => set({ quoteText: val }),
  speakerName: "",
  setSpeakerName: (val) => set({ speakerName: val }),
  speakerDesignation: "",
  setSpeakerDesignation: (val) => set({ speakerDesignation: val }),
  quoteImage: "",
  setQuoteImage: (val) => set({ quoteImage: val }),
  quoteFontSize: 60,
  setQuoteFontSize: (val) => set({ quoteFontSize: val }),
  quoteColor: "#111827",
  setQuoteColor: (val) => set({ quoteColor: val }),
  videoFit: "cover",
  setVideoFit: (val) => set({ videoFit: val }),
  videoFadeEdges: false,
  setVideoFadeEdges: (val) => set({ videoFadeEdges: val }),
  videoBgColor: "#000000",
  setVideoBgColor: (val) => set({ videoBgColor: val }),
  imageScale: 100,
  setImageScale: (val) => set({ imageScale: val }),
  image2Scale: 100,
  setImage2Scale: (val) => set({ image2Scale: val }),
  image2OffsetY: 0,
  setImage2OffsetY: (val) => set({ image2OffsetY: val }),
  image2OffsetX: 0,
  setImage2OffsetX: (val) => set({ image2OffsetX: val }),
  image2FlipH: false,
  setImage2FlipH: (val) => set({ image2FlipH: val }),
  imageFilter: "none",
  setImageFilter: (val) => set({ imageFilter: val }),
  image2Filter: "none",
  setImage2Filter: (val) => set({ image2Filter: val }),
  imageVignette: 0,
  setImageVignette: (val) => set({ imageVignette: val }),
  image2Vignette: 0,
  setImage2Vignette: (val) => set({ image2Vignette: val }),
  watermarkScale: 50,
  setWatermarkScale: (val) => set({ watermarkScale: val }),
  watermarkOpacity: 10,
  setWatermarkOpacity: (val) => set({ watermarkOpacity: val }),
  showWatermark: true,
  setShowWatermark: (val) => set({ showWatermark: val }),
  quoteTextAlign: "left",
  setQuoteTextAlign: (val) => set({ quoteTextAlign: val }),
  quoteFontFamily: "Hind Siliguri",
  setQuoteFontFamily: (val) => set({ quoteFontFamily: val }),
  quoteFontUrl: "",
  setQuoteFontUrl: (val) => set({ quoteFontUrl: val }),
  neonColor: "#5934e8",
  setNeonColor: (val) => set({ neonColor: val }),
  showNeon: true,
  setShowNeon: (val) => set({ showNeon: val }),
  removeBackground: true,
  setRemoveBackground: (val) => set({ removeBackground: val }),
  quoteGradientStart: "#dbeafe",
  setQuoteGradientStart: (val) => set({ quoteGradientStart: val }),
  quoteGradientEnd: "#eff6ff",
  setQuoteGradientEnd: (val) => set({ quoteGradientEnd: val }),
  imageOffsetY: 0,
  setImageOffsetY: (val) => set({ imageOffsetY: val }),
  imageOffsetX: 0,
  setImageOffsetX: (val) => set({ imageOffsetX: val }),
  imageFlipH: false,
  setImageFlipH: (val) => set({ imageFlipH: val }),
  textAlign: "left",
  setTextAlign: (val) => set({ textAlign: val }),
}));