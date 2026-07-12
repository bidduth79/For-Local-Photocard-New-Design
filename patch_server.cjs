const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const downloadApi = `
  app.post("/api/download-video", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      console.log(\`Downloading video for URL: \${url}\`);
      
      const tmpDir = path.join(process.cwd(), 'public', 'tmp');
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }

      const filename = \`video-\${Date.now()}.mp4\`;
      const outputPath = path.join(tmpDir, filename);

      // User's local path for yt-dlp
      const isWindows = process.platform === 'win32';
      const ytdlpPath = isWindows ? 'C:\\\\yt-dlp\\\\yt-dlp.exe' : './yt-dlp';

      const args = [
        '-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        '-o', outputPath,
        '--no-playlist',
        '--max-filesize', '50M',
        url
      ];

      const { spawn } = require('child_process');
      
      // If Linux and yt-dlp doesn't exist, try just 'yt-dlp'
      let finalPath = ytdlpPath;
      if (!isWindows && !fs.existsSync(finalPath)) {
         finalPath = 'yt-dlp';
      }

      const yt = spawn(finalPath, args);

      yt.stdout.on('data', (data) => console.log(data.toString()));
      yt.stderr.on('data', (data) => console.error(data.toString()));

      yt.on('close', (code) => {
        if (code === 0) {
          res.json({ success: true, videoUrl: \`/tmp/\${filename}\` });
        } else {
          res.status(500).json({ error: "Failed to download video" });
        }
      });

    } catch (error) {
      console.error("Video download error:", error);
      res.status(500).json({ error: "Failed to download video" });
    }
  });
`;

if (!code.includes('/api/download-video')) {
  code = code.replace('app.post("/api/fetch-link",', downloadApi + '\n  app.post("/api/fetch-link",');
  fs.writeFileSync('server.ts', code);
  console.log('Added download-video endpoint');
} else {
  console.log('Endpoint already exists');
}
