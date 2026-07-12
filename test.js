import fs from 'fs';
import { spawn } from 'child_process';

const tw = 400;
const th = 400;
const color = '#ff0000';
const P = 2 * tw + 2 * th;
const D = 5;

const filters = [];
filters.push(`color=c=black:s=${tw}x${th}:d=9999[base]`);
filters.push(`color=c=${color}:s=${tw}x10:d=9999[topbar]`);
filters.push(`color=c=${color}:s=10x${th}:d=9999[rightbar]`);
filters.push(`color=c=${color}:s=${tw}x10:d=9999[botbar]`);
filters.push(`color=c=${color}:s=10x${th}:d=9999[leftbar]`);

const d_expr = `((t/${D})*${P})`;
const top_x = `min(${d_expr},${tw})-${tw}`;
const right_y = `min(max(${d_expr}-${tw},0),${th})-${th}`;
const bot_x = `${tw}-min(max(${d_expr}-${tw}-${th},0),${tw})`;
const left_y = `${th}-min(max(${d_expr}-${tw}*2-${th},0),${th})`;

filters.push(`[base][topbar]overlay=x='${top_x}':y=0[b1]`);
filters.push(`[b1][rightbar]overlay=x=${tw}-10:y='${right_y}'[b2]`);
filters.push(`[b2][botbar]overlay=x='${bot_x}':y=${th}-10[b3]`);
filters.push(`[b3][leftbar]overlay=x=0:y='${left_y}'[outv]`);

const filterComplex = filters.join(';');

const ffmpegArgs = [
  '-f', 'lavfi', '-i', 'nullsrc=s=10x10:d=5', // dummy input to satisfy map? No, just use filter
  '-filter_complex', filterComplex,
  '-map', '[outv]',
  '-t', '5',
  '-y', 'out.mp4'
];

const ffmpeg = spawn('ffmpeg', ffmpegArgs);
ffmpeg.stderr.on('data', (d) => console.log(d.toString()));
ffmpeg.on('close', (c) => console.log('code', c));
