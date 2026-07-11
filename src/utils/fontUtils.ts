let cachedFontCSS: string | null = null;

export const getGoogleFontsCSS = async () => {
  if (cachedFontCSS) return cachedFontCSS;

  const urls = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
    'https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@400;500;600;700;800&family=Galada&family=Hind+Siliguri:wght@300;400;500;600;700&family=Mina:wght@400;700&family=Noto+Sans+Bengali:wght@100..900&family=Tiro+Bangla:ital@0;1&display=swap',
    'https://fonts.maateen.me/kalpurush/font.css',
    'https://fonts.maateen.me/solaiman-lipi/font.css'
  ];

  let combinedCSS = '';
  
  try {
    const cssResponses = await Promise.all(
      urls.map(url => fetch(url, { mode: 'cors' }).then(res => res.text()).then(text => ({ url, text })).catch(e => {
        console.warn('Failed to fetch font CSS, font embedding might not work correctly for downloads:', url, e);
        return null;
      }))
    );

    for (const res of cssResponses) {
      if (!res) continue;
      let css = res.text;
      const url = res.url;
      
      // Find all url() references
      const urlRegex = /url\((['"]?)(.*?)\1\)/g;
      let match;
      const fetchPromises: Promise<{ original: string, replacement: string } | null>[] = [];
      
      while ((match = urlRegex.exec(css)) !== null) {
        let fontUrl = match[2];
        const original = match[0];
        
        // Resolve relative URLs
        if (!fontUrl.startsWith('data:')) {
          if (!fontUrl.startsWith('http')) {
            try {
              fontUrl = new URL(fontUrl, url).href;
            } catch (e) {
              console.warn('Failed to resolve URL', fontUrl, url);
              continue;
            }
          }
          
          fetchPromises.push(
            fetch(fontUrl)
              .then(res => res.blob())
              .then(blob => new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
              }))
              .then(base64 => ({ original, replacement: `url(${base64})` }))
              .catch(e => {
                console.warn('Failed to fetch font file', fontUrl, e);
                return null;
              })
          );
        }
      }
      
      const replacements = await Promise.all(fetchPromises);
      
      for (const rep of replacements) {
        if (rep) {
          css = css.replace(rep.original, rep.replacement);
        }
      }
      
      combinedCSS += css + '\n';
    }
  } catch (e) {
    console.warn('Failed to process fonts', e);
  }
  
  cachedFontCSS = combinedCSS;
  return combinedCSS;
};
