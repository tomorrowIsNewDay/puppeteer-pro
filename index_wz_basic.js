const puppeteer = require('puppeteer')
// const $ = require('cheerio')

let fn = async () => {
    const browser = await (puppeteer.launch({headless: false}))
    const page = await browser.newPage()
  
    await page.goto('http://a100.ctest.3cchain.com/#/login')
    let title = await page.title()
    console.log('title:', title)
    // 等待dom渲染完成
    await page.waitFor('.form_1DlUS_pI');
  
    // 输入用户名
    await page.type('input[type=text]', "12888888887");
    
    // 输入密码
    await page.type('input[type=password]', "12888888887");
    const url1 = await page.url()
    console.log(url1)
    await page.click('.submit_2hOv93SD')
    
    // 跳转
    await page.waitForNavigation()
    const url = await page.url()
    console.log(url)
    let log = await page.evaluate(() => {
        // const h = $('#app')
        console.log(12)
        let app = document.querySelector('#app')
        console.log(app)
    })
    console.log(log)
    const html = await page.content()
    // const b = $('#app', html)
    // const $ = cheerio.load(html)
    // console.log(b)
    
}


fn()