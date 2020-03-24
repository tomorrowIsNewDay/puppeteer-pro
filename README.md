#### Puppeteer(傀儡师)
是一个node库，提供了一套api来控制chrome,
模拟大部分用户操作来进行ui测试或者作为爬虫访问页面来收集数据

##### API
- launch([options]) 启动浏览器实列
- browser.newPage() 创建一个page对象
- page.goto(url[, options]) 跳转至指定页面
- page.screenshot([options]) 进行页面截图
- browser.close() 关闭页面

爬虫
- page.title() 页面标题
- page.type(selector, text[, options]) 获取输入框焦点并输入内容
- page.click(selector[, options]) 点击要选择的元素
- page.waitForNavigation([options]) 等待页面跳转
- page.waitFor() 页面等待时间
- fs.createWriteStream 对文件流进行写入
- window.scrollBy(x, y) 页面向右，向上滑动的像素值

- browser.createIncognitoBrowserContext() 创建一个匿名浏览器上下文，这不会与其他游览器上下文分享cookies/cache
- page.waitForSelector(selector[, options]) 等待指定的选择器匹配的元素出现在页面中
- page.$eval(selector, pageFunction[, ...args]) 此方法在页面内执行document.querySelector, 然后将匹配到的元素作为第一个参数传给pageFunction

- page.evaluate(pageFunction, ...args) 向页面中注入函数
