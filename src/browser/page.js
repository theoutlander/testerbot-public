let Html = require('./html')

module.exports = class Page {
  constructor (browser) {
    this.browser = browser || global.__BROWSER__
  }

  async goto (url) {
    if (!url) {
      throw new Error('no url')
    }
    // console.log('getting a page ref: ' + url)

    this.browserPage = await this.browser.newPage()
    // this.browserPage.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1");

    // console.log('got a new page ref')
    this.html = new Html(this)
    // console.log('going to url')
    await this.browserPage.goto(url)
    // console.log('DONE GOTO............................: ' + url)
// this.browserPage.close()
    return this.browserPage
  }

  getBrowserPage () {
    return this.browserPage
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

  async getOuterHTML (qs) {
    let handles = await this.getElementHandles(qs)

    let list = []
    for (let handle of handles) {
      let jsHandle = await handle.getProperty('outerHTML')
      if (jsHandle) {
        list.push(await jsHandle.jsonValue())
      }
    }

    return list

    // let handles = await this.browserPage.$$(qs)
    // if (!handles) {
    //   return null
    // }
    //
    // let list = []
    //
    // for (let handle of handles) {
    //   let jsHandle = await handle.getProperty('outerHTML')
    //
    //   if (jsHandle) {
    //     list.push(await jsHandle.jsonValue())
    //   }
    // }
    //
    // return list
  }

  async getAttributeForSelector (selector, attribute) {
    const results = await this.browserPage.evaluate((selector, attribute) => {
      const scripts = document.querySelectorAll(selector)
      if (!attribute) {
        return scripts
      }

      return [].map.call(scripts, script => script[attribute])
    }, selector, attribute)

    return results
  }

  async getElementHandles (qs) {
    return await this.browserPage.$$(qs)
    // if (!handles) {
    //   return null
    // }
    //
    // let list = []
    //
    // for (let handle of handles) {
    //   let jsHandle = await handle.getProperty('outerHTML')
    //
    //   if (jsHandle) {
    //     //list.push(await jsHandle.jsonValue())
    //     list.push(jsHandle)
    //   }
    // }
    //
    // return list
  }

  async content () {
    return await this.browserPage.content()
  }

  // async getScripts () {
  //   return this.getOuterHTML('script')
  // }

  async getScriptsHandles () {
    return this.queryAllHandles('script')
  }

  async getAttributes (qs, attrib) {
    let attributes = await this.browserPage.$$eval('do', script => script())
    return attributes

    // let attributes = await this.browserPage.$$eval(qs, (item, attrib) => item[attrib], attrib)
    // return attributes
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
