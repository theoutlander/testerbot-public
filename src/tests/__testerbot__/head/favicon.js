module.exports = {
  name: 'Favicons',
  desc: 'Each favicon has been created and displays correctly',
  suite: 'Head',
  tags: ['META'],

  test: (page) => async () => {
    let favicon = await page.html.head.favicon()
    expect(favicon).not.toBeNull()
    expect(favicon).not.toBeNull()
    expect(favicon.href).not.toBeNull()

    // if (favicon.href.indexOf('.ico')>0) {
    //   console.warn('If you have only a favicon.ico, put it at the root of your site. Normally you won\'t need to use any markup. ' +
    //     'However, it\'s still good practice to link to it using the example below. Today, PNG format is recommended over .ico ' +
    //     'format (dimensions: 32x32px).')
    // }
  }
}
