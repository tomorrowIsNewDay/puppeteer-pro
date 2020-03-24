const puppeteer = require('puppeteer')

let fn = async() => {
    const browser = await puppeteer.launch({
        headless: false, //是否运行浏览器的无头模式
        devtools: true, // 是否自动打开调式工具
        timeout: 2000, 
    })

    const page = await browser.newPage()
    await page.goto('https://www.baidu.com')

    await page.screenshot({
        path: './images/one.png', // 截图保存路径
        fullpage: true //是否保存完整页面
    })

    await browser.close()
}
fn()