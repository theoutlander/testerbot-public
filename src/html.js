let Body = require('./body')
let Head = require('./head')

module.exports = class Html {
  constructor (page) {
    this.page = page
    this.head = new Head(page)
    this.body = new Body(page)
  }

  async language_attribute () {
    //Language attribute: The <code>lang</code> attribute of your website is specified and related to the language of the current page.
    return await this.page.query('meta[name="viewport"]').lang
  }

  async alternate_language () {
    //return await this.page.evaluateHandle(() => document.head.querySelector('html'))
    throw new Error('Not Implemented')
  }

  async direction_attribute () {
    return await this.page.query('html').dir
  }

}
