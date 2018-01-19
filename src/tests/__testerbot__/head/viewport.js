module.exports = {
  name: 'Viewport',
  desc: 'The viewport is declared correctly',
  suite: 'Head',
  tags: ['META'],

  test: (page) => async () => {
    let viewport = await page.html.head.viewport()
    // let val = await viewport.getProperty('value')
    // let html = await viewport.getProperty('innerHTML')
    expect(viewport).not.toEqual(null)
    expect(viewport).not.toEqual(undefined)
    expect(viewport).not.toEqual("")
  }
}
