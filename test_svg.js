let decodedSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="10" fill="none" stroke="#888" stroke-width="1" opacity="0.3"/></svg>';
const widthMatch = decodedSvg.match(/width="([0-9.]+)"/);
const heightMatch = decodedSvg.match(/height="([0-9.]+)"/);
if (widthMatch && heightMatch) {
  const w = parseFloat(widthMatch[1]);
  const h = parseFloat(heightMatch[1]);
  const newW = 100 * 2;
  const newH = h * (newW / w);
  let coloredSvg = decodedSvg;
  if (!coloredSvg.includes('viewBox')) {
     coloredSvg = coloredSvg.replace('<svg ', `<svg viewBox="0 0 ${w} ${h}" `);
  }
  coloredSvg = coloredSvg.replace(`width="${widthMatch[1]}"`, `width="${newW}"`);
  coloredSvg = coloredSvg.replace(`height="${heightMatch[1]}"`, `height="${newH}"`);
  console.log(coloredSvg);
}
