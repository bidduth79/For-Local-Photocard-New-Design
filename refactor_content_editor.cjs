const fs = require('fs');
let file = fs.readFileSync('src/components/controls/news/ContentEditor.tsx', 'utf-8');

file = file.replace(/interface ContentEditorProps \{[\s\S]*?\}/, '');

const replacer = `import { useAppContext } from '../../../context/AppContext';
import { useAppStore } from '../../../store/appStore';
import { useShallow } from 'zustand/react/shallow';

const ContentEditor: React.FC = () => {
  const { fetchLinkData, handleImageUpload, fileInputRef, fileInputRef2 } = useAppContext();
  const {
    url, setUrl, loading, error, title, setTitle, visualTitle, setVisualTitle,
    isVisualMode, setIsVisualMode, image, image2, date, setDate, language, darkMode,
    isContentEditorExpanded: isExpanded, setIsContentEditorExpanded: setIsExpanded,
    headlineFontSize, setHeadlineFontSize, headlineColor,
    showFontSizeControl, setShowFontSizeControl, showColorControl, setShowColorControl,
    textAlign, setTextAlign, selectedDesign, description, setDescription, hashtag, setHashtag,
    descriptionFontSize, setDescriptionFontSize, descriptionColor, setDescriptionColor,
    descriptionBgColor, setDescriptionBgColor, showDescriptionBg, setShowDescriptionBg,
    descriptionTextAlign, setDescriptionTextAlign, descriptionOffsetX, setDescriptionOffsetX,
    descriptionOffsetY, setDescriptionOffsetY, customFontUrl, setCustomFontUrl,
    customFontName, setCustomFontName, illustrationPrompt, setIllustrationPrompt,
    isGeneratingIllustration, setIsGeneratingIllustration, setImage, imageOffsetY, setImageOffsetY,
    setAutoColorMode
  } = useAppStore(useShallow(state => ({
    url: state.url, setUrl: state.setUrl, loading: state.loading, error: state.error, title: state.title, setTitle: state.setTitle,
    visualTitle: state.visualTitle, setVisualTitle: state.setVisualTitle, isVisualMode: state.isVisualMode, setIsVisualMode: state.setIsVisualMode,
    image: state.image, image2: state.image2, date: state.date, setDate: state.setDate, language: state.language, darkMode: state.darkMode,
    isContentEditorExpanded: state.isContentEditorExpanded, setIsContentEditorExpanded: state.setIsContentEditorExpanded,
    headlineFontSize: state.headlineFontSize, setHeadlineFontSize: state.setHeadlineFontSize, headlineColor: state.headlineColor,
    showFontSizeControl: state.showFontSizeControl, setShowFontSizeControl: state.setShowFontSizeControl, showColorControl: state.showColorControl,
    setShowColorControl: state.setShowColorControl, textAlign: state.textAlign, setTextAlign: state.setTextAlign, selectedDesign: state.selectedDesign,
    description: state.description, setDescription: state.setDescription, hashtag: state.hashtag, setHashtag: state.setHashtag,
    descriptionFontSize: state.descriptionFontSize, setDescriptionFontSize: state.setDescriptionFontSize, descriptionColor: state.descriptionColor,
    setDescriptionColor: state.setDescriptionColor, descriptionBgColor: state.descriptionBgColor, setDescriptionBgColor: state.setDescriptionBgColor,
    showDescriptionBg: state.showDescriptionBg, setShowDescriptionBg: state.setShowDescriptionBg, descriptionTextAlign: state.descriptionTextAlign,
    setDescriptionTextAlign: state.setDescriptionTextAlign, descriptionOffsetX: state.descriptionOffsetX, setDescriptionOffsetX: state.setDescriptionOffsetX,
    descriptionOffsetY: state.descriptionOffsetY, setDescriptionOffsetY: state.setDescriptionOffsetY, customFontUrl: state.customFontUrl,
    setCustomFontUrl: state.setCustomFontUrl, customFontName: state.customFontName, setCustomFontName: state.setCustomFontName,
    illustrationPrompt: state.illustrationPrompt, setIllustrationPrompt: state.setIllustrationPrompt, isGeneratingIllustration: state.isGeneratingIllustration,
    setIsGeneratingIllustration: state.setIsGeneratingIllustration, setImage: state.setImage, imageOffsetY: state.imageOffsetY, setImageOffsetY: state.setImageOffsetY,
    setAutoColorMode: state.setAutoColorMode
  })));

  const setHeadlineColor = (c: string) => {
    useAppStore.getState().setHeadlineColor(c);
    setAutoColorMode(false);
  };
`;

file = file.replace(/const ContentEditor: React\.FC<ContentEditorProps> = \(\{[\s\S]*?\}\) => \{/, replacer);

fs.writeFileSync('src/components/controls/news/ContentEditor.tsx', file);
console.log('done!');
