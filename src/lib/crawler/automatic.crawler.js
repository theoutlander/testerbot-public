//https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started
//https://blog.kissmetrics.com/open-graph-meta-tags/

import Crawler from './crawler'

module.exports = {
  name: 'Automatic Crawler',
  desc: 'Automatic Crawler',
  suite: 'Crawl',
  tags: ['HTML'],

  test: [
    {
      describe: true,
      desc: 'Spider',

      test: (page) => async () => {

        // TODO: Override the time this test will run for
        // console.log("Inside Automatic Crawler Test-------------------")

        let crawler = new Crawler('http://localhost:3000')

        let gen = crawler.getUrl()

        let val = gen.next().value

        while (val) {
          try {
            expect(val).toBeNull() // what if we throw an exception instead??
          }
          catch (e) {
            console.error(e)
          }

          val = gen.next().value
          console.log(val)
        }
      }
    }
  ]
}
