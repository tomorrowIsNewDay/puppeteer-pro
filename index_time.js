const puppeteer = require('puppeteer')

const url = 'http://a100.ctest.3cchain.com/#/dashboard/styleInfo/design'
const times = 5
const record = []

let fn = async () => {
    for(let i = 0;i<times; i++) {
        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()
        await page.goto(url)
        // 等待保证页面加载完
        await page.waitFor(5000)
        
        const timing = JSON.parse(await page.evaluate(
            () => JSON.stringify(window.performance.timing)
        ))
        record.push(calculate(timing))
        await browser.close()
    }

    let whiteScreenTime = 0, requestTime = 0;
    for(let item of record) {
        whiteScreenTime += item.whiteScreenTime;
        requestTime += item.requestTime
    }

    // 检测计算结果
    const result = []
    result.push(url)
    result.push(`页面平均白屏时间为:${whiteScreenTime / times} ms`)
    console.log('result::', result)

    function calculate(timing) {
        const result = {}
        //白屏时间
        result.whiteScreenTime = timing.responseStart - timing.navigationStart
        // 请求时间
        result.requestTime = timing.responseEnd - timing.responseStart
        return result
    }

}
fn()