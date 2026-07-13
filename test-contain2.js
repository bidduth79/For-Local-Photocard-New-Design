import http from 'http';
import FormData from 'form-data';
import fs from 'fs';

async function run() {
  const form = new FormData();
  fs.writeFileSync('bg.png', 'dummy');
  fs.writeFileSync('fg.png', 'dummy');
  form.append('bgImage', fs.createReadStream('bg.png'));
  form.append('fgImage', fs.createReadStream('fg.png'));
  form.append('video', fs.createReadStream('test_video.mp4')); 

  const config = {
    hasMainVideo: true,
    mainVideoRect: { width: 1080, height: 1920, left: 0, top: 0 },
    mainVideoStyles: { objectFit: 'contain', scale: 100, offsetX: 0, offsetY: 0, flipH: false },
    hasBgVideo: false,
    hasAnimatedBorder: false,
    themeColor: '#ff0000',
    targetWidth: 1080,
    targetHeight: 1920,
    videoDuration: 1
  };
  form.append('config', JSON.stringify(config));

  const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/render-video',
    method: 'POST',
    headers: form.getHeaders()
  }, (res) => {
    res.on('data', () => {});
    res.on('end', () => console.log('Done'));
  });
  form.pipe(req);
}
run();
