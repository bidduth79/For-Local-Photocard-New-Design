const bg = 'url("data:image/svg+xml,%3Csvg...")';
const match = bg.match(/^url\(['"]?(.*?)['"]?\)$/i);
console.log(match[1]);
