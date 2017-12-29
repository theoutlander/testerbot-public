let Doctype = require('./doctype')
let Html = require('./html')

module.exports = class Page {
  async goto (url) {
    this.browserPage = await global.__BROWSER__.newPage()
    this.html = new Html(this)
    this.doctype = new Doctype(this)

    await this.browserPage.goto(url)
  }

  async query (qs) {

    return this.browserPage.$(qs)

    // return this.browserPage.evaluateHandle((query) => {
    //   document.querySelector(query)
    // }, qs)
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
