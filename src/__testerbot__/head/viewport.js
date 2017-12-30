module.exports = {
  name: 'Viewport',
  desc: 'The viewport is declared correctly',
  suite: 'Head',
  tags: ['META'],

  test: (page) => async () => {
    expect(await page.html.head.viewport()).not.toBeNull()
  }
}
