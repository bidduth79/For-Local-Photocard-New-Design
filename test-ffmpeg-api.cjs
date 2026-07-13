const fs = require('fs');
const path = require('path');

async function run() {
  const FormData = require('form-data');
  const form = new FormData();
  
  // Create dummy files
  fs.writeFileSync('bg.png', 'dummy');
  fs.writeFileSync('fg.png', 'dummy');
  
  form.append('bgImage', fs.createReadStream('bg.png'));
  form.append('fgImage', fs.createReadStream('fg.png'));
  
  const config = {
    hasMainVideo: false,
    hasBgVideo: false,
    hasAnimatedBorder: false,
    themeColor: '#ff0000',
    targetWidth: 1080,
    targetHeight: 1920,
    videoDuration: 2
  };
  
  form.append('config', JSON.stringify(config));
  
  const http = require('http');
  const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/render-video',
    method: 'POST',
    headers: form.getHeaders()
  }, (res) => {
    console.log('Status Code:', res.statusCode);
    res.on('data', d => process.stdout.write(d));
  });
  
  req.on('error', e => console.error(e));
  form.pipe(req);
}

run();
