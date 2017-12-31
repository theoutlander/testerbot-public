module.exports = {
  name: 'Canonical',
  desc: 'Use rel="canonical" to avoid duplicate content',
  suite: 'Head',
  tags: ['META'],

  test: (page) => async () => {
    expect(await page.html.head.canonical()).not.toBeNull()
  }
}
