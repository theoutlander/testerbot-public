module.exports = class CrawlerCache {
  constructor () {
    this.reset()
  }

  enqueue (url, options) {
    if (!this.visited[url]) {
      this.visited[url] = 1
      this.queue.push({url, options})
      return true
    }
    else {
      this.visited[url]++
      return false
    }
  }

  dequeue () {
    return this.queue.shift()
    // return this.queue.pop()
  }

  hasItems() {
    return this.queue.length > 0
  }

  enqueueFailed(url) {
    this.failed.push(url)
  }

  reset () {
    this.visited = {}
    this.queue = []
    this.failed = []
  }
}
