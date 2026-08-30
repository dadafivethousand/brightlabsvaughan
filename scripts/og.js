// Draws public/assets/og.png — the 1200x630 card scrapers show.
//
//   mkdir -p /tmp/rec && cd /tmp/rec && npm i puppeteer
//   NODE_PATH=/tmp/rec/node_modules node scripts/og.js
//
// Puppeteer lives OUTSIDE this repo on purpose: it pulls its own Chromium, and
// none of that belongs in the install a deploy has to do. NODE_PATH is what
// lets this file reach it — require() resolves from the SCRIPT's directory, not
// the shell's, so cd-ing to /tmp/rec is not enough on its own.
//
// The card is rendered from scripts/og.html, which is a deliberate COPY of the
// hero rather than a screenshot of it: a screenshot at 1200x630 crops a page
// built for 9:16-ish reading, and the result is always a headline with its legs
// cut off. Regenerate whenever the wordmark, the tagline or the phone changes.
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "assets", "og.png");

(async () => {
  const logo = fs.readFileSync(path.join(ROOT, "public/assets/brightlabs-logo.png"));
  const html = fs
    .readFileSync(path.join(__dirname, "og.html"), "utf8")
    .replace("LOGO_SRC", `data:image/png;base64,${logo.toString("base64")}`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--force-color-profile=srgb"],
  });
  const page = await browser.newPage();
  // deviceScaleFactor 2 then a 1200x630 clip would double the file for nothing;
  // scrapers render this at postage-stamp sizes and 1x is already sharp.
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 60000 });
  // The Google faces arrive after networkidle in some runs, and a card exported
  // before they swap is the whole thing set in Helvetica.
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: OUT, type: "png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();
  console.log(`${OUT}  ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
})();
