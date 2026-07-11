// using playwright to test DOM computed style
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(`
    <div style="width: 1080px; height: 1350px; transform: scale(0.3);">
      <div id="pDiv" style="background-size: 100px 100px;"></div>
    </div>
  `);
  const size = await page.evaluate(() => {
    return window.getComputedStyle(document.getElementById('pDiv')).backgroundSize;
  });
  console.log('Background size:', size);
  await browser.close();
})();
