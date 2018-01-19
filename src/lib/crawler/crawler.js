const CrawlerCache = require('./crawler.cache')
const URL = require('url')

module.exports = class Crawler {
  constructor (url, options) {
    this.cache = new CrawlerCache()
    this.options = options || {}
    this.cache.enqueue(url)
    this.count = 0
  }

  async __extractLinks () {
    // console.log('Extracting Links')

    try {
      let links = await this.options.page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a'))
        return anchors.map(anchor => anchor.href)
      })
        .catch(e => {
          console.error('In evaluate error: ')
          console.error(e)
        })

      return links
    }
    catch (e) {
      console.error('Error extracting links...')
      console.error(e)
    }
    finally {
      // console.log('Done extracting links...')
    }
  }

  async processNext () {
    let crawlJob = this.cache.dequeue()

    // console.log(crawlJob)
    if (!crawlJob || !crawlJob.url) {
      // console.log('empty job')
      return null
    }

    // Load Page
    // console.log(crawlJob.url)
    try {
      this.count++

      let res = await this.options.page.goto(crawlJob.url, {
        timeout: 5000,
        waitUntil: 'load'
      })

      let links = await this.__extractLinks()
      links.forEach(link => {
        let domain = URL.parse(link).host
        // console.log("domain for link: " + domain)
        // console.log("filter domain in options: " + this.options.domain)
        if (domain === this.options.domain) {
          this.cache.enqueue(link)
        }
      })
      crawlJob.passed = true
      // console.log('RETURNING FROM PROCESS NEXT ++++++++++')
    }
    catch (e) {
      console.error(e)
      crawlJob.passed = false
    }
    // console.log(crawlJob)
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
