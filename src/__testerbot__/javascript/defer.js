module.exports = {
  name: 'Defer',
  desc: 'Validate that it is used only when a src tag is specified',
  suite: 'Javascript',
  tags: ['JAVASCRIPT', 'PERF'],
  link: 'http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html',

  test: (page) => async () => {

    // let srcs = await page.getAttributeForSelector('script', 'src')

    let scripts = await page.getOuterHTML('script')

    scripts.forEach(script => {
      if (script.indexOf('defer') > 0) {
        expect(script.indexOf('src') > 0).toEqual(true)
      }
    })
  }
}
