const { spawn } = require('child_process');
const ffmpegArgs = [
  '-f', 'lavfi', '-i', 'color=c=black:s=400x400:d=1',
  '-f', 'lavfi', '-i', 'color=c=red:s=400x400:d=1',
  '-filter_complex', '[1:v]scale=200:200[a];[1:v]scale=100:100[b];[0:v][a]overlay=0:0[tmp];[tmp][b]overlay=0:0[outv]',
  '-map', '[outv]',
  '-y', 'out.mp4'
];
const ffmpeg = spawn('ffmpeg', ffmpegArgs);
ffmpeg.stderr.on('data', d => process.stdout.write(d.toString()));
