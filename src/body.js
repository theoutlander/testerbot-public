module.exports = class Body {
  constructor (page) {
    this.page = page
  }

  async markup() {
    return await this.page.query('document.body')
  }



}