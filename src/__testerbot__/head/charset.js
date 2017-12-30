module.exports = {
  name: 'Charset',
  desc: 'The charset declared (UTF-8) is declared correctly',
  suite: 'Head',
  tags: ['META'],

  // https://stackoverflow.com/questions/4696499/meta-charset-utf-8-vs-meta-http-equiv-content-type
  test: (page) => async () => {
    expect(await page.html.head.charset()).not.toBeNull()
  }
}
