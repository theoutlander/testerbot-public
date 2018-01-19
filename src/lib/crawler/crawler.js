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

    // Load Page
    try {
      this.count++

      let res = await this.options.page.goto(crawlJob.url, {
        timeout: 5000,
        waitUntil: 'load'
      })

      let links = await Link.extractLinks(this.options.page)
      links.forEach(link => {
        let domain = URL.parse(link).host
        if (domain === this.options.domain) {
          this.cache.enqueue(link)
        }
      })
      crawlJob.passed = true
    }
    catch (e) {
      console.error(e)
      crawlJob.passed = false
    }
    return crawlJob
  }

  async run () {
    let allResults = []
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.processNext()
        allResults.push(result)

        while (this.cache.hasItems() && this.count < this.options.limit) {
          result = await this.processNext()
          allResults.push(result)
        }

        resolve(allResults)
      }
      catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }
}
