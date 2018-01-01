let Html = require('./html')

module.exports = class Page {
  async goto (url) {
    this.browserPage = await global.__BROWSER__.newPage()
    this.html = new Html(this)

    await this.browserPage.goto(url)
  }

  async query (qs) {

    let handle = await this.browserPage.$(qs)
    if (!handle) {
      return null
    }

    let jsHandle = await handle.getProperty('outerHTML')
    if (!jsHandle) {
      return null
    }
    return await jsHandle.jsonValue()
  }

  async queryAll (qs) {

    let handles = await this.browserPage.$$(qs)
    if (!handles) {
      return null
    }

    let list = []

    for (let handle of handles) {
      let jsHandle = await handle.getProperty('outerHTML')

      if (jsHandle) {
        list.push(await jsHandle.jsonValue())
      }
    }

    return list
  }

  async content () {
    return await this.browserPage.content()
  }

  async getScripts () {
    return this.queryAll('script')
  }

  async getElementByTag (tag) {
    return this.browserPage.evaluateHandle((tag) => document.getElementsByTagName(tag), tag)
  }

  async getElementByClassName (name) {
    return this.browserPage.evaluateHandle((name) => document.getElementsByClassName(name), name)
  }

  async getElementsByName (tag) {
    return this.browserPage.evaluateHandle((tag) => document.getElementsByName(tag), tag)
  }

  async getElementById (tag) {
    return this.browserPage.evaluateHandle((tag) => document.getElementById(tag), tag)
  }
}
