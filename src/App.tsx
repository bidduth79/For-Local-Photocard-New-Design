import React, { useState, useEffect } from "react";
import { Download, X, Palette } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { initializeUserDoc } from "./services/authService";

// Components
import Header from "./components/layout/Header";
import ColorExtractor from "./components/controls/ColorExtractor";
import SidebarControls from "./components/controls/SidebarControls";
import RightSidebarControls from "./components/controls/RightSidebarControls";
import PreviewControls from "./components/preview/PreviewControls";
import PreviewRenderer from "./components/preview/PreviewRenderer";
import DesignSettings from "./components/controls/news/DesignSettings";
import { PatternSettings } from "./components/controls/news/PatternSettings";
import AdvancedColorSettings from "./components/controls/news/AdvancedColorSettings";
import AuthModal from "./components/AuthModal";
import ProfileModal from "./components/ProfileModal";
import AdminPanel from "./components/admin/AdminPanel";
import FullscreenPreviewModal from "./components/modals/FullscreenPreviewModal";
import MobileDesignSettingsModal from "./components/modals/MobileDesignSettingsModal";
import { ApiSettingsModal } from "./components/modals/ApiSettingsModal";
import { useAppContext } from "./context/AppContext";
import { useImageDownload } from "./hooks/useImageDownload";
import { useAppStore } from "./store/appStore";

export default function App() {
  const state = useAppContext();
  const { downloadImage: downloadImageHook, shareImage: shareImageHook } = useImageDownload();
  const [isFullscreenPreviewOpen, setIsFullscreenPreviewOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isApiSettingsModalOpen, setIsApiSettingsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);
  const [readyVideoInfo, setReadyVideoInfo] = useState<{url: string, filename: string} | null>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't change design if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement || 
        e.target instanceof HTMLSelectElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }
      
      const store = useAppStore.getState();
      const validDesigns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
      
      // Prevent video upload from changing to non-video designs (and vice versa for non-video)
      // Or just respect `image` starting with `data:video/`
      const isVideo = store.image?.startsWith('data:video/');

      
      const availableDesigns = validDesigns;
      
      if (e.key === 'ArrowRight') {
        const currentIndex = availableDesigns.indexOf(store.selectedDesign);
        const nextIndex = (currentIndex + 1) % availableDesigns.length;
        store.setSelectedDesign(availableDesigns[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = availableDesigns.indexOf(store.selectedDesign);
        const prevIndex = (currentIndex - 1 + availableDesigns.length) % availableDesigns.length;
        store.setSelectedDesign(availableDesigns[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Update IP and last login for all users
        initializeUserDoc(user).catch(console.error);
        
        if (!user.isAnonymous) {
          setIsAuthenticated(true);
          if (db) {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            
            if (userDoc.exists()) {
              const userData = userDoc.data();
              
              // Auto-upgrade rkbbd79@gmail.com to admin if not already
              if (user.email === 'rkbbd79@gmail.com' && !userData.isAdmin) {
                import('firebase/firestore').then(({ updateDoc }) => {
                  updateDoc(userRef, { isAdmin: true, isPremium: true });
                });
                setIsAdmin(true);
              } else {
                setIsAdmin(userData.isAdmin || false);
              }
            } else {
              setIsAdmin(false);
            }
          }
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const downloadImage = async () => {
    const imageUrl = state.image;
    const isVideoFile = imageUrl?.startsWith('data:video/') || imageUrl?.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i);
    const isVideoDesign = state.selectedDesign === 20;
    if (isVideoFile || isVideoDesign) {
      setIsProcessingVideo(true);
    }
    let result = null;
    try {
      result = await downloadImageHook('news', state.photocardRef, state.quoteCardRef, state.selectedDesign, state.language, imageUrl, (state as any).videoResolution);
    } catch (e) {
      console.error(e);
      import('react-hot-toast').then(({ toast }) => toast.error('Error generating image/video'));
    } finally {
      setIsProcessingVideo(false);
    }
    
    if (result && result.videoUrl) {
      setReadyVideoInfo({ url: result.videoUrl, filename: result.filename });
    }

    if (result && result.requiresLicense) {
      import('react-hot-toast').then(({ toast }) => {
        toast.error(state.language === 'bn' ? 'আপনার ফ্রি ডাউনলোড লিমিট শেষ হয়ে গেছে!' : 'Your free download limit has been reached!');
      });
      if (isAuthenticated) {
        setIsProfileModalOpen(true);
      } else {
        setIsAuthModalOpen(true);
      }
    }
  };

  const shareImage = () => {
    const imageUrl = state.image;
    shareImageHook('news', state.photocardRef, state.quoteCardRef, state.language, imageUrl, (state as any).videoResolution);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${state.darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      

      {readyVideoInfo && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white px-4">
          <div className="bg-white text-gray-900 p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-4">{state.language === 'bn' ? 'ভিডিও প্রস্তুত!' : 'Video is Ready!'}</h2>
            <p className="text-gray-600 mb-6">
              {state.language === 'bn' ? 'আপনার ভিডিও ডাউনলোডের জন্য প্রস্তুত।' : 'Your video is ready to download.'}
            </p>
            <a 
              href={readyVideoInfo.url} 
              download={readyVideoInfo.filename}
              onClick={() => {
                setTimeout(() => setReadyVideoInfo(null), 500);
              }}
              className="block w-full py-3 bg-[#5934e8] hover:bg-[#4b2ac8] text-white rounded-xl font-medium transition-colors mb-3"
            >
              {state.language === 'bn' ? 'ডাউনলোড করুন' : 'Download Now'}
            </a>
            <button 
              onClick={() => setReadyVideoInfo(null)}
              className="mt-4 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
            >
              {state.language === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>
        </div>
      )}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      {state.image && !state.image.startsWith('data:video/') && <ColorExtractor imageUrl={state.image} onColorExtracted={state.handleColorExtracted} />}
      <Header 
        darkMode={state.darkMode}
        toggleTheme={state.toggleTheme}
        language={state.language}
        toggleLanguage={state.toggleLanguage}
        reloadApp={state.reloadApp}
        toggleFullscreen={state.toggleFullscreen}
        onOpenDesignSettings={() => state.setIsMobileDesignSettingsOpen(true)}
        loadDemoSetup={state.loadDemoSetup}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
        onOpenApiSettings={() => setIsApiSettingsModalOpen(true)}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
      />

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 lg:px-6 xl:gap-8 xl:px-8 lg:py-8 max-w-[1600px] mx-auto w-full relative">
        
        {/* Controls Section (Left Side - Scrollable) */}
        <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col h-[500px] lg:h-[calc(100vh-120px)] relative">
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 p-4 lg:p-0 pb-32 lg:pb-24 lg:pr-4">
              <SidebarControls />
            </div>

            <div className={`absolute bottom-0 left-0 right-0 p-4 pt-12 lg:p-0 lg:pt-12 lg:pr-4 lg:pb-2 bg-gradient-to-t ${state.darkMode ? 'from-slate-900 via-slate-900 to-transparent' : 'from-gray-50 via-gray-50 to-transparent'} z-10 pointer-events-none`}>
              <div className="pointer-events-auto">
                <button
                  onClick={downloadImage}
                  className={`w-full flex justify-center items-center gap-2 px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white shadow-xl transition-all hover:scale-[1.02] cursor-pointer ${state.darkMode ? 'bg-[#5934e8] hover:bg-[#5934e8]/90' : 'bg-gray-900 hover:bg-gray-800'}`}
                >
                  <Download className="h-5 w-5" />
                  {state.language === 'bn' ? 'ফটোকার্ড ডাউনলোড করুন' : 'Download Photocard'}
                </button>
              </div>
            </div>
        </div>

        {/* Right Content - Preview (Sticky on Desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-start lg:sticky lg:top-24 z-30 h-fit">
          {/* Mobile Preview (Visible only on small screens) */}
          <div className="lg:hidden w-full bg-gray-100 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 relative z-10 flex flex-col items-center justify-center p-4 mb-6">
            <div className={`w-full max-w-[400px] rounded-2xl shadow-lg overflow-hidden border flex flex-col ${state.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                {/* Preview Header */}
                <PreviewControls 
                  onDownload={downloadImage} 
                  onShare={shareImage} 
                  onFullscreen={() => setIsFullscreenPreviewOpen(true)} 
                  isMobile={true} 
                />

                {/* Preview Content */}
                <div className="relative bg-gray-200/50 p-4">
                  <div className="w-full mx-auto">
                    {!isDesktop && !isFullscreenPreviewOpen && <PreviewRenderer />}
                  </div>
                </div>
            </div>
          </div>

          {/* Desktop Preview (Sticky) */}
          <div className={`hidden lg:block w-full max-w-[600px] rounded-3xl shadow-2xl overflow-hidden border ${state.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <PreviewControls 
              onDownload={downloadImage} 
              onShare={shareImage} 
              onFullscreen={() => setIsFullscreenPreviewOpen(true)} 
              isMobile={false} 
            />

            {/* Preview Area */}
            <div className="w-full relative bg-gray-200/50 p-4">
              <div className="w-full mx-auto">
                {isDesktop && !isFullscreenPreviewOpen && <PreviewRenderer />}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Extra Controls (Sticky on Desktop) */}
        <div className="hidden lg:flex lg:order-3 lg:col-span-3 flex-col h-[calc(100vh-120px)] relative sticky top-24 z-30">
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pb-24 pr-2">
            <RightSidebarControls />
          </div>
        </div>
      </div>

      <FullscreenPreviewModal 
        isOpen={isFullscreenPreviewOpen} 
        onClose={() => setIsFullscreenPreviewOpen(false)} 
      />

      <MobileDesignSettingsModal />

      {isAdminPanelOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 overflow-y-auto">
          <div className="p-4 flex justify-end">
            <button
              onClick={() => setIsAdminPanelOpen(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <AdminPanel language={state.language} />
        </div>
      )}

      <ApiSettingsModal
        isOpen={isApiSettingsModalOpen}
        onClose={() => setIsApiSettingsModalOpen(false)}
        language={state.language}
        darkMode={state.darkMode}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        language={state.language}
      />

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        language={state.language}
      />
    </div>
  );
}
