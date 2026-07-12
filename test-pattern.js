import { spawn } from 'child_process';
const ffmpegArgs = [
  '-f', 'lavfi', '-i', 'color=c=black:s=400x400:d=5',
  '-f', 'lavfi', '-i', 'color=c=red:s=600x600:d=5',
  '-filter_complex', "[0:v][1:v]overlay=x='-mod(t*200/5,200)':y='-mod(t*200/5,200)'[outv]",
  '-map', '[outv]',
  '-t', '5',
  '-y', 'out.mp4'
];
const ffmpeg = spawn('ffmpeg', ffmpegArgs);
ffmpeg.stderr.on('data', (d) => process.stdout.write(d.toString()));
