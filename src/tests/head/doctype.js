module.exports = {
  name: 'Doctype',
  desc: 'The Doctype is HTML5 and is at the top of all your HTML pages',
  suite: 'Head',
  tags: ['META'],

  test: (page) => async () => {
    let d = await page.doctype.markup()
    debugger
    expect(d).not.toBeNull()
  }
}
