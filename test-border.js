import { spawn } from 'child_process';
const ffmpegArgs = [
  '-f', 'lavfi', '-i', 'color=c=black:s=400x400:d=5',
  '-filter_complex', "color=c=#ff0000:s=400x10:d=9999[topbar];[0:v][topbar]overlay=x='min(((t/5)*1600),400)-400':y=0[outv]",
  '-map', '[outv]',
  '-t', '5',
  '-y', 'out.mp4'
];
const ffmpeg = spawn('ffmpeg', ffmpegArgs);
ffmpeg.stderr.on('data', (d) => process.stdout.write(d.toString()));
