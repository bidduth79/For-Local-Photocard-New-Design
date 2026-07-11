import React from 'react';

export interface AppState {
  activeTab: 'news' | 'quote';
  darkMode: boolean;
  language: 'bn' | 'en';
  scale: number;
  
  // News Card State
  title: string;
  image: string;
  date: Date;
  brandName: string;
  themeColor: string;
  design: number;
  customWebsite: string;
  customLogo: string;
  fullBrandLogo: string;
  fullBrandLogoHeight: number;
  gradientStart: string;
  gradientEnd: string;
  headlineFontSize: number;
  headlineColor: string;
  brandFontSize: number;
  brandColor: string;
  watermarkScale: number;
  watermarkOpacity: number;
  showWatermark: boolean;
  backgroundPatterns: string[];
  patternScale: number;
  patternRotation: number;
  patternOpacity: number;
  patternColor: string;
  isPatternSettingsExpanded: boolean;

  // Quote Card State
  quoteText: string;
  speakerName: string;
  speakerDesignation: string;
  quoteImage: string;
  quoteColor: string;
  quoteFontSize: number;
  quoteFontFamily: string;
  quoteTextAlign: 'left' | 'center' | 'right' | 'justify';
  showNeon: boolean;
  neonColor: string;
  removeBackground: boolean;
  quoteGradientStart: string;
  quoteGradientEnd: string;
  imageScale: number;
}

export interface NewsControlsProps {
  state: AppState;
  setters: {
    setTitle: (val: string) => void;
    setImage: (val: string) => void;
    setDate: (val: Date) => void;
    setBrandName: (val: string) => void;
    setThemeColor: (val: string) => void;
    setDesign: (val: number) => void;
    setCustomWebsite: (val: string) => void;
    setCustomLogo: (val: string) => void;
    setFullBrandLogo: (val: string) => void;
    setFullBrandLogoHeight: (val: number) => void;
    setGradientStart: (val: string) => void;
    setGradientEnd: (val: string) => void;
    setHeadlineFontSize: (val: number) => void;
    setHeadlineColor: (val: string) => void;
    setBrandFontSize: (val: number) => void;
    setBrandColor: (val: string) => void;
    setWatermarkScale: (val: number) => void;
    setWatermarkOpacity: (val: number) => void;
    setShowWatermark: (val: boolean) => void;
    setBackgroundPatterns: (val: string[]) => void;
    setPatternScale: (val: number) => void;
    setPatternRotation: (val: number) => void;
    setPatternOpacity: (val: number) => void;
    setIsPatternSettingsExpanded: (val: boolean) => void;
  };
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'news' | 'quote') => void;
}

export interface QuoteControlsProps {
  state: AppState;
  setters: {
    setQuoteText: (val: string) => void;
    setSpeakerName: (val: string) => void;
    setSpeakerDesignation: (val: string) => void;
    setQuoteImage: (val: string) => void;
    setQuoteColor: (val: string) => void;
    setQuoteFontSize: (val: number) => void;
    setQuoteFontFamily: (val: string) => void;
    setQuoteTextAlign: (val: 'left' | 'center' | 'right' | 'justify') => void;
    setShowNeon: (val: boolean) => void;
    setNeonColor: (val: string) => void;
    setRemoveBackground: (val: boolean) => void;
    setQuoteGradientStart: (val: string) => void;
    setQuoteGradientEnd: (val: string) => void;
    setImageScale: (val: number) => void;
  };
  quoteImageInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'news' | 'quote') => void;
}
