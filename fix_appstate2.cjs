const fs = require('fs');
let content = fs.readFileSync('src/hooks/useAppState.ts', 'utf8');

content = content.replace(
  'if (data.image !== undefined) { if (typeof data.image === "string" && data.image.startsWith("blob:")) setImage(""); else setImage(data.image); }',
  'if (data.image !== undefined) { if (typeof data.image === "string" && (data.image.startsWith("blob:") || data.image.startsWith("data:video/blob;"))) setImage(""); else setImage(data.image); }'
);

content = content.replace(
  'if (data.image2 !== undefined) { if (typeof data.image2 === "string" && data.image2.startsWith("blob:")) setImage2(""); else setImage2(data.image2); }',
  'if (data.image2 !== undefined) { if (typeof data.image2 === "string" && (data.image2.startsWith("blob:") || data.image2.startsWith("data:video/blob;"))) setImage2(""); else setImage2(data.image2); }'
);

content = content.replace(
  'if (data.quoteImage !== undefined) { if (typeof data.quoteImage === "string" && data.quoteImage.startsWith("blob:")) setQuoteImage(""); else setQuoteImage(data.quoteImage); }',
  'if (data.quoteImage !== undefined) { if (typeof data.quoteImage === "string" && (data.quoteImage.startsWith("blob:") || data.quoteImage.startsWith("data:video/blob;"))) setQuoteImage(""); else setQuoteImage(data.quoteImage); }'
);

fs.writeFileSync('src/hooks/useAppState.ts', content);
