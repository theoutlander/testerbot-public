module.exports = {
  name: 'Title',
  desc: 'A title is used on all pages',
  suite: 'Head',
  tags: ['HTML', 'SEO'],

  test: (page) => async () => {
    let title = await page.html.head.title()
    expect(title).not.toBeNull()
  }
}
