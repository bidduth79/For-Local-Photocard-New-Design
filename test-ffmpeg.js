const { spawn } = require('child_process');
const filters = [];
const w = 1920; const h = 1080;
const targetW = 1920; const targetH = 1080;
const offsetX = 500; const offsetY = 0;
filters.push(`color=c=black@0:size=${w}x${h}[vbox]`);
filters.push(`[0:v]scale=${targetW}:${targetH}:force_original_aspect_ratio=increase[vscaled]`);
filters.push(`[vbox][vscaled]overlay=x=(W-w)/2+${offsetX}:y=(H-h)/2+${offsetY}:shortest=1[mainv]`);
filters.push(`[1:v][mainv]overlay=0:0[outv]`);

const args = [
  '-f', 'lavfi', '-i', 'testsrc=duration=5:size=1920x1080:rate=30',
  '-f', 'lavfi', '-i', 'color=c=red:duration=1:size=1920x1080:rate=30',
  '-filter_complex', filters.join(';'),
  '-map', '[outv]', '-y', 'out.mp4'
];
console.log(args.join(' '));
const p = spawn('ffmpeg', args);
p.stderr.on('data', d => console.log(d.toString()));
p.on('close', code => console.log('exited with code', code));
