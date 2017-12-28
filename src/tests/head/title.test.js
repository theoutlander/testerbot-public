module.exports = {
  name: 'Test Name',
  desc: 'This is a test blah blah',
  suite: 'Head',
  tags: ['HTML', 'SEO'],

  test: (page) => async () => {
    expect(await page.doctype.markup()).not.toBeNull()
  }
}
