const puppeteer = require('puppeteer');
// (async() => {
  // const browser = await puppeteer.launch({
  //   headless: true
  // })
//   const page = await browser.newPage()
//   await page.goto('http://www.jianshu.com')
//   await page.screenshot({
//     path: './headlessChrome/jianshu.png'
//   })

//   await browser.close()
// })();

(async() => {

  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage();
  await page.goto('https://google.com', {
    waitUntil: 'networkidle2'
  });

  await page.waitFor('input[name=q]');
  // Type our query into the search bar
  await page.type('input[name=q]', 'puppeteer');

  await page.click('input[type="submit"]');

  // Wait for the results to show up
  await page.waitForSelector('h3 a');

  // Extract the results from the page
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('h3 a'));
    return anchors.map(anchor => anchor.textContent);
  });
  console.log(links.join('\n'));
  await browser.close();

})();

// (async() => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://news.ycombinator.com', {
//     waitUntil: 'networkidle2'
//   })
//   await page.pdf({
//     path: './headlessChrome/hn.pdf',
//     format: 'A4'
//   })

//   await browser.close()
// })();
// (async() => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://example.com')

//   // Get the "viewport" of the page, as reported by the page.
//   const dimensions = await page.evaluate(() => {
//     return {
//       width: document.documentElement.clientWidth,
//       height: document.documentElement.clientHeight,
//       deviceScaleFactor: window.devicePixelRatio
//     }
//   })

//   console.log('Dimensions:', dimensions)

//   await browser.close()
// })()