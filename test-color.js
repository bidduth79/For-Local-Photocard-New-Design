import { spawn } from 'child_process';
const ffmpegArgs = [
  '-f', 'lavfi', '-i', 'nullsrc=s=10x10:d=1',
  '-filter_complex', 'color=c=#ff0000:s=10x10:d=1[topbar];[0:v][topbar]overlay=x=0:y=0[outv]',
  '-map', '[outv]',
  '-t', '1',
  '-y', 'out.mp4'
];
const ffmpeg = spawn('ffmpeg', ffmpegArgs);
ffmpeg.stderr.on('data', (d) => console.log(d.toString()));
