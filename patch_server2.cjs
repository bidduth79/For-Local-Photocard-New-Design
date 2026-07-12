const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

// replace the ffmpegArgs array in server.ts
code = code.replace(
  /'-shortest', \/\/ end when the shortest input ends \(the video\)/g,
  "'-t', `${config.videoDuration || 15}`"
);

// make video optional
code = code.replace(
  /if \(!files\.bgImage \|\| !files\.fgImage \|\| !files\.video \|\| !configStr\) \{/,
  "if (!files.bgImage || !files.fgImage || !configStr) {"
);

code = code.replace(
  /const videoPath = files\.video\[0\]\.path;/,
  "const videoPath = files.video ? files.video[0].path : '';"
);

code = code.replace(
  /const ffmpegInputs = \[\n\s*'-loop', '1', '-i', bgPath,\n\s*'-i', videoPath,\n\s*'-loop', '1', '-i', fgPath\n\s*\];/,
  `const ffmpegInputs = [
        '-loop', '1', '-i', bgPath
      ];
      if (videoPath) {
        ffmpegInputs.push('-i', videoPath);
      } else {
        // dummy input 1 to satisfy mapping if needed, though we should avoid using it if not hasMainVideo
        ffmpegInputs.push('-f', 'lavfi', '-i', 'color=c=black:s=10x10:d=1');
      }
      ffmpegInputs.push('-loop', '1', '-i', fgPath);`
);

code = code.replace(
  /fs\.unlink\(videoPath, \(\) => \{\}\);/,
  "if (videoPath) fs.unlink(videoPath, () => {});"
);

fs.writeFileSync('server.ts', code);
console.log('patched server.ts');
