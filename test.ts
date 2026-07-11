import * as cheerio from "cheerio";
fetch("https://www.youtube.com/watch?v=dQw4w9WgXcQ", {
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
  }
}).then(r => r.text()).then(html => {
  const $ = cheerio.load(html);
  console.log("IMG:", $('meta[property="og:image"]').attr("content"));
  console.log("VID:", $('meta[property="og:video:url"]').attr("content"));
});
