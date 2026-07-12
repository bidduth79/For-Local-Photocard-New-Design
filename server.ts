import express from "express";
import { createServer as createViteServer } from "vite";
import * as cheerio from "cheerio";
import path from "path";
import fsNative from "fs";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";
import rateLimit from "express-rate-limit";
import multer from "multer";
import { spawn } from "child_process";

// Safe __dirname for both ESM and CJS
const getDirname = () => {
  if (typeof __dirname !== 'undefined') {
    return __dirname;
  }
  // Try/catch around import.meta to avoid esbuild warning breaking the build
  try {
    return path.dirname(fileURLToPath(import.meta.url));
  } catch (e) {
    return process.cwd(); // Fallback for CJS
  }
};

const _dirname = getDirname();

async function startServer() {
  const app = express();
  app.set("trust proxy", 1);
  const PORT = 3000;

  app.use(cors());

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    message: { error: "Too many requests from this IP, please try again after 15 minutes" },
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false, default: true },
  });

  app.use(express.json({ limit: '50mb' }));

  const upload = multer({ dest: path.join(_dirname, 'temp_uploads') });

  app.post("/api/render-video", upload.fields([
    { name: 'bgImage', maxCount: 1 },
    { name: 'fgImage', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'pattern', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const configStr = req.body.config;
      
      if (!files.bgImage || !files.fgImage || !files.video || !configStr) {
        return res.status(400).json({ error: "Missing required files or config" });
      }

      const config = JSON.parse(configStr);
      
      const bgPath = files.bgImage[0].path;
      const fgPath = files.fgImage[0].path;
      const videoPath = files.video[0].path;
      const outputPath = path.join(_dirname, 'temp_uploads', `output_${Date.now()}.mp4`);

      const ffmpegInputs = [
        '-loop', '1', '-i', bgPath,
        '-i', videoPath,
        '-loop', '1', '-i', fgPath
      ];

      let patternIdx = -1;
      if (config.hasAnimatedPattern && files.pattern) {
        ffmpegInputs.push('-loop', '1', '-i', files.pattern[0].path);
        patternIdx = 3;
      }

      // We need to construct a filter_complex string
      const filters = [];
      let lastBase = '0:v'; // start with bgImage

      if (patternIdx !== -1) {
        const P = config.patternSize || 200;
        filters.push(`[${lastBase}][${patternIdx}:v]overlay=x='-mod(t*${P}/20,${P})':y='-mod(t*${P}/20,${P})'[withpat]`);
        lastBase = 'withpat';
      }

      // 1. Background video (blurred)
      if (config.hasBgVideo) {
        const { width, height, left, top } = config.bgVideoRect;
        // W/H must be even for x264
        const w = Math.round(width / 2) * 2;
        const h = Math.round(height / 2) * 2;
        const x = Math.round(left);
        const y = Math.round(top);
        
        filters.push(`[1:v]scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},boxblur=20,format=yuva420p,colorchannelmixer=aa=0.6[bgv]`);
        filters.push(`[${lastBase}][bgv]overlay=${x}:${y}[base1]`);
        lastBase = 'base1';
      }

      // 2. Main video
      if (config.hasMainVideo) {
        const { width, height, left, top } = config.mainVideoRect;
        const w = Math.round(width / 2) * 2;
        const h = Math.round(height / 2) * 2;
        const x = Math.round(left);
        const y = Math.round(top);
        const isContain = config.mainVideoStyles?.objectFit === 'contain';
        const scalePct = config.mainVideoStyles?.scale || 100;
        const offsetX = config.mainVideoStyles?.offsetX || 0;
        const offsetY = config.mainVideoStyles?.offsetY || 0;
        const flipH = config.mainVideoStyles?.flipH ? -1 : 1;
        const scaleFactor = scalePct / 100;
        
        const targetW = Math.round((w * scaleFactor) / 2) * 2;
        const targetH = Math.round((h * scaleFactor) / 2) * 2;
        const hflipFilter = flipH === -1 ? ',hflip' : '';
        filters.push(`color=c=black@0:size=${w}x${h}:d=9999[vbox]`);
        filters.push(`[1:v]scale=${targetW}:${targetH}:force_original_aspect_ratio=${isContain ? 'decrease' : 'increase'}${hflipFilter}[vscaled]`);
        filters.push(`[vbox][vscaled]overlay=x=(W-w)/2+${offsetX}:y=(H-h)/2+${offsetY}:shortest=1[mainv]`);
        filters.push(`[${lastBase}][mainv]overlay=${x}:${y}[base2]`);
        
        lastBase = 'base2';
      }

      // 3. Foreground image
      filters.push(`[${lastBase}][2:v]overlay=0:0[withfg]`);
      lastBase = 'withfg';

      // 4. Animated border
      if (config.hasAnimatedBorder && config.themeColor) {
        const tw = config.targetWidth;
        const th = config.targetHeight;
        const color = config.themeColor;
        const P = 2 * tw + 2 * th;
        const D = config.videoDuration || 15;

        filters.push(`color=c=${color}:s=${tw}x10:d=9999[topbar]`);
        filters.push(`color=c=${color}:s=10x${th}:d=9999[rightbar]`);
        filters.push(`color=c=${color}:s=${tw}x10:d=9999[botbar]`);
        filters.push(`color=c=${color}:s=10x${th}:d=9999[leftbar]`);

        const d_expr = `((t/${D})*${P})`;
        const top_x = `min(${d_expr},${tw})-${tw}`;
        const right_y = `min(max(${d_expr}-${tw},0),${th})-${th}`;
        const bot_x = `${tw}-min(max(${d_expr}-${tw}-${th},0),${tw})`;
        const left_y = `${th}-min(max(${d_expr}-${tw}*2-${th},0),${th})`;

        filters.push(`[${lastBase}][topbar]overlay=x='${top_x}':y=0[b1]`);
        filters.push(`[b1][rightbar]overlay=x=${tw}-10:y='${right_y}'[b2]`);
        filters.push(`[b2][botbar]overlay=x='${bot_x}':y=${th}-10[b3]`);
        filters.push(`[b3][leftbar]overlay=x=0:y='${left_y}'[outv]`);
      } else {
        filters.push(`[${lastBase}]copy[outv]`);
      }

      const filterComplex = filters.join(';');

      const ffmpegArgs = [
        ...ffmpegInputs,
        '-filter_complex', filterComplex,
        '-map', '[outv]',
        '-map', '1:a?', // include audio from video if present
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-shortest', // end when the shortest input ends (the video)
        outputPath
      ];

      console.log('Running FFmpeg with args:', ffmpegArgs.join(' '));

      const ffmpeg = spawn('ffmpeg', ffmpegArgs);

      ffmpeg.stderr.on("data", (data) => {
        fs.appendFileSync("ffmpeg-err.log", data.toString()); console.log(`ffmpeg: ${data}`);
      });

      ffmpeg.on('close', (code) => {
        console.log(`ffmpeg process exited with code ${code}`);
        if (code === 0) {
          res.download(outputPath, 'video.mp4', () => {
            // cleanup
            fs.unlink(bgPath, () => {});
            fs.unlink(fgPath, () => {});
            fs.unlink(videoPath, () => {});
            fs.unlink(outputPath, () => {});
          });
        } else {
          res.status(500).json({ error: "FFmpeg failed" });
        }
      });

    } catch (error) {
      console.error("Error rendering video:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // API routes

  
  app.post("/api/download-video", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      console.log(`Downloading video for URL: ${url}`);
      
      const tmpDir = path.join(process.cwd(), 'public', 'tmp');
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }

      const filename = `video-${Date.now()}.mp4`;
      const outputPath = path.join(tmpDir, filename);

      // User's local path for yt-dlp
      const isWindows = process.platform === 'win32';
      const ytdlpPath = isWindows ? 'C:\\yt-dlp\\yt-dlp.exe' : './yt-dlp';

      const args = [
        '-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        '-o', outputPath,
        '--no-playlist',
        '--max-filesize', '50M',
        url
      ];

      
      
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
          res.json({ success: true, videoUrl: `/tmp/${filename}` });
        } else {
          res.status(500).json({ error: "Failed to download video" });
        }
      });

    } catch (error) {
      console.error("Video download error:", error);
      res.status(500).json({ error: "Failed to download video" });
    }
  });

  app.post("/api/fetch-link", apiLimiter, async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      console.log(`Fetching URL: ${url}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error(`Failed to fetch URL: ${url}, Status: ${response.status}`);
        // Return a successful response with empty data instead of an error so the UI can still show the card
        return res.json({
          title: new URL(url).hostname,
          image: "",
          description: "",
          url,
        });
      }

      const contentType = response.headers.get("content-type") || "";
      if (contentType.startsWith("image/") || contentType.startsWith("video/")) {
        return res.json({
          title: new URL(url).hostname,
          image: url,
          description: "",
          url,
        });
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      const title =
        $('meta[property="og:title"]').attr("content") ||
        $("title").text() ||
        $('meta[name="twitter:title"]').attr("content") ||
        $("h1").first().text();

      const ogVideoUrl = $('meta[property="og:video:url"]').attr("content") || $('meta[property="og:video:secure_url"]').attr("content") || $('meta[property="og:video"]').attr("content");
      const ogImageUrl = $('meta[property="og:image"]').attr("content") || $('meta[name="twitter:image"]').attr("content") || $('link[rel="image_src"]').attr("href") || $("img").first().attr("src");

      let image = ogImageUrl;
      if (ogVideoUrl && ogVideoUrl.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i)) {
        image = ogVideoUrl;
      }

      const description =
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content");

      // Handle relative image URLs
      let finalImage = image?.trim() || "";
      if (finalImage && !finalImage.startsWith("http")) {
        try {
          finalImage = new URL(finalImage, url).toString();
        } catch (e) {
          console.error("Error resolving relative image URL:", e);
        }
      }

      console.log(`Fetched data for ${url}:`, { title, image: finalImage });

      const proxyImage = finalImage ? `/api/proxy-image?url=${encodeURIComponent(finalImage)}` : "";

      res.json({
        title: title?.trim() || "",
        image: proxyImage,
        description: description?.trim() || "",
        url,
      });
    } catch (error) {
      console.error("Error fetching link:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/proxy-image", apiLimiter, async (req, res) => {
    try {
      const imageUrl = req.query.url as string;
      if (!imageUrl) {
        return res.status(400).send("URL is required");
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(imageUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Referer": new URL(imageUrl).origin,
          "Sec-Fetch-Dest": "image",
          "Sec-Fetch-Mode": "no-cors",
          "Sec-Fetch-Site": "cross-site",
        },
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        return res.status(response.status).send("Failed to fetch image");
      }

      res.set(
        "Content-Type",
        response.headers.get("content-type") || "image/jpeg",
      );
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Cache-Control", "public, max-age=31536000");

      const arrayBuffer = await response.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (error) {
      console.error("Error proxying image:", error);
      res.status(500).send("Internal server error");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Manual SPA fallback for dev
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(_dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(_dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
