//https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started
//https://blog.kissmetrics.com/open-graph-meta-tags/

module.exports = {
  name: 'Twitter',
  desc: 'Twitter Card',
  suite: 'Head',
  tags: ['HTML', 'SEO', 'SOCIAL'],

  test: [
    {
      desc: 'Card',
      test: (page) => async () => {
        expect(await page.html.head.twitter_card()).not.toBeNull()
      }
    },
    {
      desc: 'Site',
      required: false,
      test: (page) => async () => {
        expect(await page.html.head.twitter_site()).not.toBeNull()
      }
    },
    {
      desc: 'Creator',
      required: false,
      test: (page) => async () => {
        expect(await page.html.head.twitter_creator()).not.toBeNull()
      }
    }
    // TODO: URL Crawling and Caching

  ]
}
