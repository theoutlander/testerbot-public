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
