module.exports = {
  name: 'Charset',
  desc: 'X-UA-Compatible: The X-UA-Compatible Meta tag is present',
  suite: 'Head',
  tags: ['HTML', 'SEO'],

  // https://stackoverflow.com/questions/4696499/meta-charset-utf-8-vs-meta-http-equiv-content-type
  test: (page) => async () => {
    expect(await page.html.head.charset()).not.toBeNull()
  }
}
