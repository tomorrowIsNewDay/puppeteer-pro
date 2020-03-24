const fs = require('fs')
const puppeteer = require('puppeteer')

let fn = async() => {
    const browser = await (puppeteer.launch({headless: false}))
    const page = await browser.newPage()

    await page.goto('https://www.suning.com')

    let title = await page.title()
    console.log('title:', title)

    // 点击搜索框模拟输入 笔记本电脑
    await page.type('#searchKeywords', '笔记本电脑', {delay: 500})
    // 点击搜索按钮
    await page.click('.search-btn')
    console.log(11)
    await page.waitFor(1000) //等待页面跳转
    console.log(12)
    const maxPage = 5
    console.log(1)
    let allInfo = []
    for(let i=0; i< maxPage; i++) {
        // await autoScroll(page)
        await page.waitFor(3000)

        const SHOP_LIST_SELECTOR = 'ul.geneeral.clearfix'
        console.log(2)
        const shopList = await page.evaluate((sel) => {
            console.log(3)
            const shopBoxs = Array.from($(sel).find('li div.res-info'))
            console.log(shopBoxs)
            const item = shopBoxs.map(v => {
                //获取每个商品的名称， 品牌， 价格
                const title = $(v).find('div.title-selling-point').text().trim();
                const brand = $(v).find('b.highlight').text().trim();
                const price = $(v).find('span.def-price').text().trim();
                return {
                    title,
                    brand,
                    price,
                };
            })
            return item
        }, SHOP_LIST_SELECTOR)
        allInfo = [...allInfo, ...shopList]

        // 当前页面并非最大页时，跳转到下一页
        if(i < maxPage -1) {
            const nextPageUrl = await page.evaluate(() => {
                const url = $('#nextPage').get(0).href()
                return url;
            })
            await page.goto(nextPageUrl, {waitUntil: 'networkidle0'})
        }
    }
    console.log(`共获取到${allInfo.length}台笔记本电脑信息`);

    //  将笔记本电脑信息写入文件
    writerStream = fs.createWriteStream('notebook.json')
    writerStream.write(JSON.stringify(allInfo, undefined, 2), 'UTF8')
    writerStream.end()

    browser.close()

    //滑动屏幕，滚动页面底部
    function autoScroll(page) {
        return page.evaluate(() => {
            return new Promise(resolve => {
                var totalHeight = 0
                var distance = 100
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight
                    window.scrollBy(0, distance)
                    totalHeight += distance
                    if(totalHeight >= scrollHeight) {
                        clearInterval(timer)
                        resolve()
                    }
                }, 200)
            })
        })
    }
}

fn()