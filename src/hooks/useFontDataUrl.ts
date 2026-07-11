import { useState, useEffect } from 'react';

export const useFontDataUrl = (url?: string) => {
  const [dataUrl, setDataUrl] = useState<string | undefined>(url);

  useEffect(() => {
    if (!url || url.startsWith('data:')) {
      setDataUrl(url);
      return;
    }

    const fetchFont = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Direct fetch failed');
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          let base64data = reader.result as string;
          // Force mime type to font/woff2 if it's generic octet-stream or missing
          if (base64data.startsWith('data:application/octet-stream') || base64data.startsWith('data:;')) {
            base64data = base64data.replace(/^data:[^;]*;/, 'data:font/woff2;');
          }
          setDataUrl(base64data);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.log('Direct fetch failed, trying CORS proxy...', error);
        try {
          const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
          const response = await fetch(proxyUrl);
          if (!response.ok) throw new Error('Proxy fetch failed');
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onloadend = () => {
            let base64data = reader.result as string;
            if (base64data.startsWith('data:application/octet-stream') || base64data.startsWith('data:;')) {
              base64data = base64data.replace(/^data:[^;]*;/, 'data:font/woff2;');
            }
            setDataUrl(base64data);
          };
          reader.readAsDataURL(blob);
        } catch (proxyError) {
          console.log('First proxy failed, trying second proxy...', proxyError);
          try {
            const proxyUrl2 = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
            const response2 = await fetch(proxyUrl2);
            if (!response2.ok) throw new Error('Second proxy fetch failed');
            const blob2 = await response2.blob();
            const reader2 = new FileReader();
            reader2.onloadend = () => {
              let base64data = reader2.result as string;
              if (base64data.startsWith('data:application/octet-stream') || base64data.startsWith('data:;')) {
                base64data = base64data.replace(/^data:[^;]*;/, 'data:font/woff2;');
              }
              setDataUrl(base64data);
            };
            reader2.readAsDataURL(blob2);
          } catch (proxyError2) {
            console.error('Error converting font to data URL via proxies:', proxyError2);
            setDataUrl(url); // Fallback to original URL
          }
        }
      }
    };

    fetchFont();
  }, [url]);

  return dataUrl;
};
