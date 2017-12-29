module.exports = class Doctype {
  constructor (page) {
    this.page = page
  }

  async markup () {
    return this.page.query('document.doctype')
  }
}
