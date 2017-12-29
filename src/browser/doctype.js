module.exports = class Doctype {
  constructor (page) {
    this.page = page
  }

  markup () {
    return this.page.content().doctype
  }
}
