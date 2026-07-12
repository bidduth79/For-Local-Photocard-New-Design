const { spawn } = require('child_process');
const filters = [];
filters.push(`color=c=black:s=400x400:d=5[0v]`); // bg
filters.push(`color=c=red:s=400x400:d=5[1v]`); // video
filters.push(`color=c=blue:s=400x400:d=5[2v]`); // fg
filters.push(`[1v]scale=400:400[bgv]`);
filters.push(`[0v][bgv]overlay=0:0[base1]`);
filters.push(`[1v]scale=200:200[vscaled]`); // reusing 1v!
filters.push(`[base1][vscaled]overlay=100:100[outv]`);
const filterComplex = filters.join(';');
const ffmpegArgs = [
  '-f', 'lavfi', '-i', 'nullsrc=s=10x10:d=5',
  '-filter_complex', filterComplex,
  '-map', '[outv]',
  '-y', 'out.mp4'
];
const ffmpeg = spawn('ffmpeg', ffmpegArgs);
ffmpeg.stderr.on('data', d => process.stdout.write(d.toString()));
