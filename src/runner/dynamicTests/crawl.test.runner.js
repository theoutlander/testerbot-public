const Crawler = require('../../lib/crawler/crawler')
const puppeteer = require('puppeteer')
const URL = require('url')

module.exports = class CrawlTest {
  async init (url) {
    const args = [
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--ignore-certificate-errors'
    ]
    const options = {
      args,
      headless: false,
      ignoreHTTPSErrors: true,
      dumpio: false, // TODO: make configurable
      waitUntil: 'load' // networkidle0, networkidle1, ?
    }

    await puppeteer.launch(options)
      .then(async browser => {
        this.browser = browser
        this.crawler = new Crawler(url, {
          browser: this.browser,
          domain: URL.parse(url).host,
          limit: 50 // TODO: Make configurable
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  async run () {
    let result = await this.crawler.run()
    this.browser.close()
    return result
  }
}
