module.exports = {
  name: 'Title',
  desc: 'A title is used on all pages',
  suite: 'Head',
  tags: ['HTML', 'SEO'],

  test: (page) => async () => {
    expect(await page.doctype.markup()).not.toBeNull()
  }
}
