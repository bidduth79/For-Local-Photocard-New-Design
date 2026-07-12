const fs = require('fs');
console.log("Creating dummy files...");
fs.writeFileSync('bg.png', 'dummy');
fs.writeFileSync('fg.png', 'dummy');
fs.writeFileSync('video.mp4', 'dummy');
fs.writeFileSync('pattern.png', 'dummy');

const config = {
  hasBgVideo: false,
  hasMainVideo: true,
  mainVideoRect: { width: 400, height: 400, left: 100, top: 100 },
  mainVideoStyles: {},
  targetWidth: 1080,
  targetHeight: 1920,
  hasAnimatedPattern: true,
  patternSize: 200,
  hasAnimatedBorder: true,
  themeColor: '#ff0000',
  videoDuration: 15
};

const FormData = require('form-data');
const form = new FormData();
form.append('bgImage', fs.createReadStream('bg.png'));
form.append('fgImage', fs.createReadStream('fg.png'));
form.append('video', fs.createReadStream('video.mp4'));
form.append('pattern', fs.createReadStream('pattern.png'));
form.append('config', JSON.stringify(config));

const http = require('http');
const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/render-video',
  method: 'POST',
  headers: form.getHeaders()
}, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
});
req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});
form.pipe(req);
