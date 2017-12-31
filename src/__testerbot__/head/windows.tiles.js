module.exports = {
  name: 'Windows Tiles',
  desc: 'Windows tiles are present and linked',
  suite: 'Head',
  tags: ['META'],

  test: (page) => async () => {
    expect(await page.html.head.windows_tiles()).not.toBeNull()
  }
}
