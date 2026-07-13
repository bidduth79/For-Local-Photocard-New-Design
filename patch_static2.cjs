const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const staticCode = `
  // Serve tmp directory for downloaded videos
  const tmpDir = path.join(process.cwd(), 'public', 'tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  app.use('/tmp', express.static(tmpDir));
`;

if (!code.includes("app.use('/tmp'")) {
  code = code.replace("app.use(express.json({ limit: '50mb' }));", "app.use(express.json({ limit: '50mb' }));\n" + staticCode);
  fs.writeFileSync('server.ts', code);
  console.log('Added static tmp route');
} else {
  console.log('Static route already exists');
}
