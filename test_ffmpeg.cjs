const { execSync } = require('child_process');
const fs = require('fs');

// create a dummy 16:9 video
execSync('ffmpeg -y -f lavfi -i testsrc=size=1920x1080:rate=1:duration=1 dummy.mp4 2>/dev/null');

// scale it with increase to 1080x1920
execSync('ffmpeg -y -i dummy.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase" test_increase.mp4 2>/dev/null');

// probe the output size
const out = execSync('ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 test_increase.mp4');
console.log(out.toString());
