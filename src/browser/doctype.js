module.exports = class Doctype {
  constructor (page) {
    this.page = page
  }

  async markup() {
    return await this.page.query('document.doctype');
  }

}