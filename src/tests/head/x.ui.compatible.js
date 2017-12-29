module.exports = {
  name: 'X-UA-Compatible',
  desc: 'The X-UA-Compatible Meta tag is present',
  suite: 'Head',
  tags: ['META'],

  // https://stackoverflow.com/questions/6771258/what-does-meta-http-equiv-x-ua-compatible-content-ie-edge-do
  test: (page) => async () => {
    expect(await page.html.head.x_ua_compatible()).not.toBeNull()
  }
}
