const fs = require('fs');
let content = fs.readFileSync('src/hooks/useAppState.ts', 'utf8');

// replace the blocks with single instances
content = content.replace(/if \(data\.videoFit !== undefined\) useAppStore\.getState\(\)\.setVideoFit\(data\.videoFit\);\s*if \(data\.videoBgColor !== undefined\) useAppStore\.getState\(\)\.setVideoBgColor\(data\.videoBgColor\);\s*if \(data\.videoFit !== undefined\) useAppStore\.getState\(\)\.setVideoFit\(data\.videoFit\);\s*if \(data\.videoBgColor !== undefined\) useAppStore\.getState\(\)\.setVideoBgColor\(data\.videoBgColor\);/g, 'if (data.videoFit !== undefined) useAppStore.getState().setVideoFit(data.videoFit);\n      if (data.videoBgColor !== undefined) useAppStore.getState().setVideoBgColor(data.videoBgColor);');

content = content.replace(/if \(data\.videoFit !== undefined\) setVideoFit\(data\.videoFit\);\s*if \(data\.videoBgColor !== undefined\) setVideoBgColor\(data\.videoBgColor\);\s*if \(data\.videoFit !== undefined\) setVideoFit\(data\.videoFit\);\s*if \(data\.videoBgColor !== undefined\) setVideoBgColor\(data\.videoBgColor\);/g, 'if (data.videoFit !== undefined) setVideoFit(data.videoFit);\n        if (data.videoBgColor !== undefined) setVideoBgColor(data.videoBgColor);');

content = content.replace(/videoFit, setVideoFit,\s*videoBgColor, setVideoBgColor,\s*videoFit, setVideoFit,\s*videoBgColor, setVideoBgColor,/g, 'videoFit, setVideoFit,\n    videoBgColor, setVideoBgColor,');

fs.writeFileSync('src/hooks/useAppState.ts', content);
