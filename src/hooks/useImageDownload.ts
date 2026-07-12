import { toPng, toBlob } from "html-to-image";
import { RefObject } from "react";
import { showToast } from "../utils/toast";
import { checkDownloadLimit, recordDownload } from "../services/authService";
import { getGoogleFontsCSS } from "../utils/fontUtils";
import { useAppStore } from "../store/appStore";

export const useImageDownload = () => {
  const generateImage = async (
    activeTab: "news" | "quote",
    photocardRef: RefObject<HTMLDivElement>,
    quoteCardRef: RefObject<HTMLDivElement>,
    format: 'dataUrl' | 'blob' = 'dataUrl',
    isVideoExport: boolean = false,
    layerMode: 'all' | 'foreground' | 'background' = 'all',
    overrideWidth?: number,
    overrideHeight?: number
  ): Promise<string | Blob | null> => {
    let container: HTMLDivElement | null = null;
    try {
      const ref = activeTab === "news" ? photocardRef : quoteCardRef;
      if (!ref.current) {
        console.error("Reference is null");
        return null;
      }

      // Pre-fetch Google Fonts CSS to avoid CORS errors in html-to-image
      let fontEmbedCSS = await getGoogleFontsCSS();

      // Append any custom fonts that were injected into the document head
      const customFontStyles = document.querySelectorAll('style[id^="custom-font-"]');
      customFontStyles.forEach(style => {
        if (style.textContent) {
          fontEmbedCSS += '\n' + style.textContent;
        }
      });

      // Wait for fonts to be fully loaded
      await document.fonts.ready;
      await new Promise(resolve => setTimeout(resolve, 1000));

      let targetWidth = overrideWidth || 1080;
      let targetHeight = overrideHeight || 1350;

      if (!overrideWidth && !overrideHeight) {
        if (activeTab === 'quote') {
          targetWidth = 1080;
          targetHeight = 1080;
        } else if (ref.current.classList.contains('aspect-square')) {
          targetWidth = 1080;
          targetHeight = 1080;
        } else {
          const rect = ref.current.getBoundingClientRect();
          if (rect.width > 0 && Math.abs(rect.height / rect.width - 1920 / 1080) < 0.05) {
            targetHeight = 1920;
          }
        }
      }

      // Create a temporary container to render the card at full size
      container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.width = `${targetWidth}px`;
      container.style.height = `${targetHeight}px`;
      document.body.appendChild(container);

      // Clone the node
      const clone = ref.current.cloneNode(true) as HTMLElement;
      
      // Mute and pause any videos in the clone so they don't play sound in the background
      const allVideos = clone.querySelectorAll('video');
      allVideos.forEach(v => {
        v.muted = true;
        v.pause();
      });
      
      // Reset any transforms on the clone container
      clone.style.transform = 'none';
      clone.style.width = '100%';
      clone.style.height = '100%';
      
      if (isVideoExport) {
        // Force transparent background on the root element
        clone.style.setProperty('background-color', 'transparent', 'important');
        // Hide video layers and make all ancestors transparent
        const logoVideoLayers = clone.querySelectorAll('video.video-logo-layer');
        logoVideoLayers.forEach(el => el.remove());

        const videoLayers = clone.querySelectorAll('.video-layer');
        videoLayers.forEach(el => {
          let parent = el.parentElement;
          while (parent && parent !== clone) {
            parent.style.setProperty('background-color', 'transparent', 'important');
            parent = parent.parentElement;
          }
          // Remove the video element completely so html-to-image doesn't process it
          el.remove();
        });
      }
      
      // Hide elements that shouldn't be exported
      const hideElements = clone.querySelectorAll('.hide-on-export');
      hideElements.forEach(el => {
        el.remove(); // Remove instead of hiding
      });
      
      container.appendChild(clone);
      if (layerMode === 'foreground') {
        clone.classList.add('export-foreground');
        // also hide images in foreground layer so they don't block the video
        if (isVideoExport) {
            container.classList.add('export-video');
        clone.classList.add('export-video');
        }
      }

      // Wait for images to load
      const images = Array.from(clone.getElementsByTagName('img'));
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = () => {
            console.warn('Image failed to load', img.src);
            resolve(null);
          };
        });
      }));

      // Generate image
      const filter = (node: HTMLElement) => {
        if (node.tagName === 'VIDEO') return false;
        if (layerMode === 'foreground' && node.classList) {
          if (node.classList.contains('video-bg-layer') || node.classList.contains('pattern-bg-layer') || node.classList.contains('blurred-bg-layer')) return false;
        }
        if (layerMode === 'background' && node.classList) {
          if (node.classList.contains('fg-layer')) return false;
          if (isVideoExport && node.classList.contains('animate-bg-pattern')) return false;
        }
        return true;
      };

      const options = {
        quality: 1.0,
        pixelRatio: isVideoExport ? 1 : 2, // High resolution for sharp text
        width: targetWidth,
        height: targetHeight,
        cacheBust: true,
        style: isVideoExport ? { backgroundColor: 'transparent' } : undefined,
        fontEmbedCSS, // Prevents html-to-image from parsing document.styleSheets
        filter,
      };

      const dataUrl = await toPng(clone, options).catch(e => { console.error("toPng failed:", e); throw e; });
      if (format === "blob") {
        const res = await fetch(dataUrl);
        return await res.blob();
      }
      return dataUrl;
    } catch (err) {
      console.error("Failed to generate image at final catch block:", err);
      throw err;
    } finally {
      // Cleanup
      if (container && document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }
  };

  const downloadImage = async (
    activeTab: "news" | "quote",
    photocardRef: RefObject<HTMLDivElement>,
    quoteCardRef: RefObject<HTMLDivElement>,
    selectedDesign: number,
    language: 'bn' | 'en',
    imageUrl?: string,
    videoResolution?: '1080p' | '720p'
  ): Promise<{ success: boolean; requiresLicense?: boolean }> => {
    // Check download limit
    const limitStatus = await checkDownloadLimit();
    if (!limitStatus.allowed) {
      return { success: false, requiresLicense: true };
    }

    try {
      const isVideoFile = imageUrl?.startsWith('data:video/') || imageUrl?.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i);
      const isVideo = isVideoFile || selectedDesign === 20;
      
      if (isVideo) {
        showToast.success(language === 'bn' ? 'ভিডিও তৈরি হচ্ছে, দয়া করে অপেক্ষা করুন...' : 'Generating video, please wait...');
        const videoSrc = imageUrl ? (imageUrl.startsWith('data:video/blob;') 
          ? imageUrl.replace('data:video/blob;', '') 
          : imageUrl) : '';
          
        const ref = activeTab === "news" ? photocardRef : quoteCardRef;
        if (!ref.current) return { success: false };
        
        let targetWidth = 1080;
        let targetHeight = 1350;
        
        if (activeTab === 'quote') {
          targetWidth = 1080;
          targetHeight = 1080;
        } else if (ref.current.classList.contains('aspect-square')) {
          targetWidth = 1080;
          targetHeight = 1080;
        } else {
          const rect = ref.current.getBoundingClientRect();
          if (rect.width > 0 && Math.abs(rect.height / rect.width - 1920 / 1080) < 0.05) {
            targetHeight = 1920;
          }
        }
        
        if (videoResolution === '720p') {
           targetWidth = Math.round(targetWidth * (720 / 1080));
           targetHeight = Math.round(targetHeight * (720 / 1080));
        }
        
        // Extract video styles and bounding box from the original DOM
        const bgVideoEl = ref.current.querySelector('.video-layer:not(.main-video-layer)') as HTMLVideoElement;
        const mainVideoEl = ref.current.querySelector('.main-video-layer') as HTMLVideoElement;
        const logoVideoEl = ref.current.querySelector('.video-logo-layer') as HTMLVideoElement;
        
        let bgVideoRect = { left: 0, top: 0, width: targetWidth, height: targetHeight };
        let bgVideoStyles = { objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.1)', filter: 'blur(20px)', opacity: '0.6' };
        
        let mainVideoRect = { left: 0, top: 0, width: targetWidth, height: targetHeight };
        let mainVideoStyles: any = { objectFit: 'cover', objectPosition: 'center', transform: 'none' };
        let logoVideoRect = { left: 0, top: 0, width: targetWidth, height: targetHeight };
        let logoVideoStyles = { objectFit: 'contain', objectPosition: 'center', transform: 'none' };
        
        const containerRect = ref.current.getBoundingClientRect();
        const scaleX = targetWidth / containerRect.width;
        const scaleY = targetHeight / containerRect.height;
        
        if (bgVideoEl) {
          const elRect = bgVideoEl.parentElement!.getBoundingClientRect();
          bgVideoRect = {
            left: (elRect.left - containerRect.left) * scaleX,
            top: (elRect.top - containerRect.top) * scaleY,
            width: elRect.width * scaleX,
            height: elRect.height * scaleY
          };
          const computedStyle = window.getComputedStyle(bgVideoEl);
          bgVideoStyles = {
            objectFit: computedStyle.objectFit || 'cover',
            objectPosition: computedStyle.objectPosition || '50% 50%',
            transform: computedStyle.transform || 'scale(1.1)',
            filter: computedStyle.filter || 'blur(20px)',
            opacity: computedStyle.opacity || '0.6'
          };
        }
        
        if (logoVideoEl) {
          const elRect = logoVideoEl.getBoundingClientRect();
          logoVideoRect = {
            left: (elRect.left - containerRect.left) * scaleX,
            top: (elRect.top - containerRect.top) * scaleY,
            width: elRect.width * scaleX,
            height: elRect.height * scaleY
          };
          const computedStyle = window.getComputedStyle(logoVideoEl);
          logoVideoStyles = {
            objectFit: computedStyle.objectFit || 'contain',
            objectPosition: computedStyle.objectPosition || '50% 50%',
            transform: computedStyle.transform || 'none'
          };
        }
        
        if (logoVideoEl) {
          const elRect = logoVideoEl.parentElement!.getBoundingClientRect();
          logoVideoRect = {
            left: (elRect.left - containerRect.left) * scaleX,
            top: (elRect.top - containerRect.top) * scaleY,
            width: elRect.width * scaleX,
            height: elRect.height * scaleY
          };
          const computedStyle = window.getComputedStyle(logoVideoEl);
          logoVideoStyles = {
            objectFit: computedStyle.objectFit || 'contain',
            objectPosition: computedStyle.objectPosition || '50% 50%',
            transform: computedStyle.transform || 'none'
          };
        }
        
        if (mainVideoEl) {
          const elRect = mainVideoEl.parentElement!.getBoundingClientRect();
          mainVideoRect = {
            left: (elRect.left - containerRect.left) * scaleX,
            top: (elRect.top - containerRect.top) * scaleY,
            width: elRect.width * scaleX,
            height: elRect.height * scaleY
          };
          const computedStyle = window.getComputedStyle(mainVideoEl);
          mainVideoStyles = {
            objectFit: computedStyle.objectFit || 'cover',
            objectPosition: computedStyle.objectPosition || '50% 50%',
            transform: computedStyle.transform || 'none',
            scale: useAppStore.getState().imageScale,
            offsetX: useAppStore.getState().imageOffsetX,
            offsetY: useAppStore.getState().imageOffsetY,
            flipH: useAppStore.getState().imageFlipH
          };
        }
        
        // Capture overlay
        const fgBlob = await generateImage(activeTab, photocardRef, quoteCardRef, 'blob', true, 'foreground', targetWidth, targetHeight) as Blob;
        const bgBlob = await generateImage(activeTab, photocardRef, quoteCardRef, 'blob', true, 'background', targetWidth, targetHeight) as Blob;
        
        if (!fgBlob || !bgBlob) return { success: false };
        
        try {
          const formData = new FormData();
          formData.append('fgImage', fgBlob, 'fg.png');
          formData.append('bgImage', bgBlob, 'bg.png');

          if (videoSrc) {
            try {
              const videoResp = await fetch(videoSrc);
              if (videoResp.ok) {
                const videoBlob = await videoResp.blob();
                formData.append('video', videoBlob, 'video.mp4');
              }
            } catch (err) {
              console.warn("Could not fetch video, proceeding without it", err);
            }
          }
          
          const state = useAppStore.getState();
          const patternEl = ref.current.querySelector('.animate-bg-pattern') as HTMLElement;
          let hasAnimatedPattern = false;
          let patternSize = 200;
          if (patternEl && patternEl.style.backgroundImage) {
            const match = patternEl.style.backgroundImage.match(/^url\(['"]?(.*?)['"]?\)$/i);
            if (match && match[1].startsWith('data:image/svg+xml')) {
              const svgDataUrl = match[1];
              const patSize = state.patternScale ? state.patternScale * 2 : 200;
              const canvas = document.createElement('canvas');
              canvas.width = targetWidth + patSize;
              canvas.height = targetHeight + patSize;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                const img = new Image();
                img.src = svgDataUrl;
                await new Promise(resolve => {
                  img.onload = resolve;
                  img.onerror = resolve;
                });
                const pat = ctx.createPattern(img, 'repeat');
                if (pat) {
                  ctx.fillStyle = pat;
                  ctx.fillRect(0, 0, canvas.width, canvas.height);
                  const patBlob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
                  if (patBlob) {
                    formData.append('pattern', patBlob, 'pattern.png');
                    hasAnimatedPattern = true;
                    patternSize = patSize;
                  }
                }
              }
            }
          }

          const config = {
            hasBgVideo: !!bgVideoEl,
            bgVideoRect,
            bgVideoStyles,
            hasMainVideo: !!mainVideoEl,
            mainVideoRect,
            mainVideoStyles,
            targetWidth,
            targetHeight,
            hasAnimatedPattern,
            patternSize,
            hasAnimatedBorder: state.selectedDesign === 20,
            themeColor: state.themeColor,
            videoDuration: mainVideoEl ? mainVideoEl.duration : 15
          };
          formData.append('config', JSON.stringify(config));

          const response = await fetch('/api/render-video', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error('Video rendering failed on server');
          }

          const renderedBlob = await response.blob();
          const url = URL.createObjectURL(renderedBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `mediacell-${activeTab}-${Date.now()}.mp4`;
          link.click();
          URL.revokeObjectURL(url);
          showToast.success(language === 'bn' ? 'ভিডিও ডাউনলোড সম্পূর্ণ হয়েছে!' : 'Video download complete!');
        } catch (err) {
          console.error('Server rendering failed:', err);
          showToast.error(language === 'bn' ? 'ভিডিও তৈরি করতে সমস্যা হয়েছে। আপনার লোকাল FFmpeg সেটআপ চেক করুন।' : 'Failed to render video. Check local FFmpeg setup.');
          return { success: false };
        }
        
      } else {
        const dataUrl = await generateImage(activeTab, photocardRef, quoteCardRef, 'dataUrl');
        if (!dataUrl) return { success: false };

        const link = document.createElement("a");
        link.download = `mediacell-${activeTab}-${Date.now()}.png`;
        link.href = dataUrl as string;
        link.click();
      }

      // Record the download
      await recordDownload();
      
      if (!limitStatus.isPremium) {
        showToast.success(
          language === 'bn' 
            ? `ডাউনলোড সফল! আপনার আর ${limitStatus.remaining - 1}টি ডাউনলোড বাকি আছে।` 
            : `Download successful! You have ${limitStatus.remaining - 1} downloads remaining.`
        );
      }
      
      return { success: true };
    } catch (err) {
      console.error(err);
      showToast.error("Failed to download. Please try again.");
      return { success: false };
    }
  };

  const shareImage = async (
    activeTab: "news" | "quote",
    photocardRef: RefObject<HTMLDivElement>,
    quoteCardRef: RefObject<HTMLDivElement>,
    language: 'bn' | 'en',
    imageUrl?: string,
    videoResolution?: '1080p' | '720p'
  ) => {
    try {
      if (imageUrl?.startsWith('data:video/')) {
        showToast.warning(language === 'bn' ? 'ভিডিও শেয়ার করা সাপোর্ট করে না। দয়া করে ডাউনলোড করুন।' : 'Video sharing is not supported. Please download instead.');
        return;
      }
      
      const blob = await generateImage(activeTab, photocardRef, quoteCardRef, 'blob');
      if (!blob) return;

      const file = new File([blob as Blob], `mediacell-${activeTab}-${Date.now()}.png`, { type: 'image/png' });
      
      if (navigator.share) {
        await navigator.share({
          title: language === 'bn' ? 'ফটোকার্ড শেয়ার' : 'Share Photocard',
          files: [file]
        });
      } else {
        showToast.warning(language === 'bn' ? 'আপনার ব্রাউজার শেয়ারিং সাপোর্ট করে না' : 'Your browser does not support sharing');
      }
    } catch (err) {
      showToast.error(language === 'bn' ? 'শেয়ার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' : 'Failed to share image. Please try again.');
    }
  };

  return { downloadImage, shareImage };
};
