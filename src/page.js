module.exports = class Page {
  async goto(url) {
    this.page = await global.__BROWSER__.newPage()
    await this.page.goto(url)
  }

  async title() {
    return await this.page.title()

    //
    // let text = await page.evaluate(() => {
    //   //   debugger
    //   //   return document.body.textContent
    //   // })
  }

  async body() {

  }

  async head() {

  }

  async getElementByTag(tag) {

  }
}