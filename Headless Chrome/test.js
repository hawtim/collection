const puppeteer = require('puppeteer')
;(async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://github.com')
  // await page.screenshot({path: 'screenshots/github.png'});
  // await page.goto('https://github.com/login', {
  //   waitUntil: 'networkidle2'
  // })
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    }
  })
  console.log('视窗信息:', dimensions)

//   // 获取 html
//   // 获取上下文句柄
//   const htmlHandle = await page.$('html')

//   // 执行计算
//   const html = await page.evaluate(body => body.outerHTML, htmlHandle)

//   // 销毁句柄
//   await htmlHandle.dispose()

//   console.log('html:', html)
  // 地址栏输入网页地址
  await page.goto('https://google.com/', {
    waitUntil: 'networkidle2' // 等待网络状态为空闲的时候才继续执行
  })

  // 聚焦搜索框
  // await page.click('#lst-ib');
  await page.focus('#lst-ib')

  // 输入搜索关键字
  await page.keyboard.type('辣子鸡', {
    delay: 1000 // 控制 keypress 也就是每个字母输入的间隔
  })

  // 回车
  await page.keyboard.press('Enter')
})()
