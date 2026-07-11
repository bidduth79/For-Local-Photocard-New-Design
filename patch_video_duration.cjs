const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

// Replace the 30-second duration cap with a more generous cap like 5 minutes, or just the video duration.
// The user said "আমি যে ভিডিও আপলোড করব সেটাই আসবে" (Whatever video I upload, it should be that).
// So let's remove the cap entirely, or set a very high cap like 60 minutes just in case.

content = content.replace(
  'if (durationMs > 30000) durationMs = 30000;',
  '// No duration cap as per user request\n        // if (durationMs > 30000) durationMs = 30000;'
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
