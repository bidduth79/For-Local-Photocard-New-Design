const { spawn } = require('child_process');
const ffmpegArgs = [
  '-f', 'lavfi', '-i', 'color=c=red:s=100x100:d=1',
  '-filter_complex', 'color=c=black@0:size=100x100:d=1,format=yuva420p[vbox];[0:v][vbox]overlay=0:0[outv]',
  '-map', '[outv]',
  '-y', 'out.mp4'
];
const ffmpeg = spawn('ffmpeg', ffmpegArgs);
ffmpeg.stderr.on('data', d => process.stdout.write(d.toString()));
