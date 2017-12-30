module.exports = {
  name: 'Open Graph',
  desc: 'Open Graph meta tags exist on all pages',
  suite: 'Head',
  tags: ['HTML', 'SEO', 'SOCIAL'],

  test: [
    {
      desc: 'Open Graph Title',
      test: (page) => async () => {
        expect(await page.html.head.facebook_og_title()).not.toBeNull()
      }
    },
    {
      'Open Graph Type': (page) => async () => {
        expect(await page.html.head.facebook_og_type()).not.toBeNull()
      }
    },
    {
      'Open Graph Url;': (page) => async () => {
        expect(await page.html.head.facebook_og_url()).not.toBeNull()
      }
    },
    {
      'Open Graph Image': (page) => async () => {
        expect(await page.html.head.facebook_og_image()).not.toBeNull()
      }
    },
    {
      'Open Graph Site Name': (page) => async () => {
        expect(await page.html.head.facebook_og_site_name()).not.toBeNull()
      }
    },
    {
      'Open Graph Description': (page) => async () => {
        expect(await page.html.head.facebook_og_description()).not.toBeNull()
      }
    },
    {
      'Open Graph Page Id': (page) => async () => {
        expect(await page.html.head.facebook_page_id()).not.toBeNull()
      }
    }
  ]
}
