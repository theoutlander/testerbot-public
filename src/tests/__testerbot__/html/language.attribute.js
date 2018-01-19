module.exports = {
  name: 'Language Attribute',
  desc: 'The <code>lang</code> attribute of your website is specified and related to the language of the current page',
  suite: 'Html',
  tags: ['HTML'],

  test: page => async () => {
    let lang = page.html.language_attribute()
    expect(await lang).not.toBeNull()
  }
}
