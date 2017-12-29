module.exports = class Body {
  constructor (page) {
    this.page = page
  }

  async markup () {
    return this.page.query('document.body')
  }
}
