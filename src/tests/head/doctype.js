module.exports = {
  name: 'Doctype',
  desc: 'The Doctype is HTML5 and is at the top of all your HTML pages',
  suite: 'Head',
  tags: ['META'],

  test: (page) => async () => {
    expect(await page.doctype.markup()).not.toBeNull()
  }
}
