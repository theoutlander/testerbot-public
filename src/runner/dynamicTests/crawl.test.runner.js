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
    }

    await puppeteer.launch(options)
      .then(async browser => {
        this.browser = browser
        const page = await browser.newPage()
        page.setRequestInterception(false)

        this.crawler = new Crawler(url, {
          page: page,
          domain: URL.parse(url).host,
          limit: 20
        })

        this.page = page
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
