const str = 'url("data:image/svg+xml,foo\'bar")';
const match = str.match(/^url\(['"]?(.*?)['"]?\)$/);
console.log(match);
