const CrawlerCache = require('./crawler.cache')
const URL = require('url')
const Link = require('../../browser/link')

module.exports = class Crawler {
  constructor (url, options) {
    this.cache = new CrawlerCache()
    this.options = options || {}
    this.cache.enqueue(url)
    this.count = 0
  }

  async processNext () {
    let crawlJob = this.cache.dequeue()

    if (!crawlJob || !crawlJob.url) {
      return null
    }

    const page = await this.options.browser.newPage()
    // page.setRequestInterception(false)

    // Load Page
    try {
      this.count++
      console.log('Loading: ' + crawlJob.url)

      let res = await page.goto(crawlJob.url, {
        // timeout: 5000,
        // waitUntil: 'load'
        //waitUntil: 'networkidle0'
      })

      // console.log(res)

      let links = await Link.extractLinks(page)
      links.forEach(link => {
        let domain = URL.parse(link).host
        if (domain === this.options.domain) {
          this.cache.enqueue(link)
        }
      })
      crawlJob.passed = true
    }
    catch (e) {
      this.cache.enqueueFailed(url)
      console.error(e)
      crawlJob.passed = false
    }
    finally {
      page.close()
    }
    return crawlJob
  }

  async run () {
    // TODO: Allow parellization

    let allResults = []
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.processNext()
        allResults.push(result)

        while (this.cache.hasItems() && this.count < this.options.limit) {
          result = await this.processNext()
          allResults.push(result)
        }

        console.log(`Crawled ${this.count} urls~`)

        resolve(allResults)
      }
      catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }
}
