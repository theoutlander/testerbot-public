module.exports = {
  name: 'Open Graph',
  desc: 'Open Graph meta tags exist on all pages',
  suite: 'Social',
  tags: ['HTML', 'SEO', 'SOCIAL'],

  test: [
    {
      desc: 'Title',
      test: (page) => async () => {
        expect(await page.html.head.facebook_og_title()).not.toBeNull()
      }
    },
    {
      'Type': (page) => async () => {
        expect(await page.html.head.facebook_og_type()).not.toBeNull()
      }
    },
    {
      'Url;': (page) => async () => {
        expect(await page.html.head.facebook_og_url()).not.toBeNull()
      }
    },
    {
      'Image': (page) => async () => {
        expect(await page.html.head.facebook_og_image()).not.toBeNull()
      }
    },
    {
      'Site Name': (page) => async () => {
        expect(await page.html.head.facebook_og_site_name()).not.toBeNull()
      }
    },
    {
      'Description': (page) => async () => {
        expect(await page.html.head.facebook_og_description()).not.toBeNull()
      }
    }
    // {
    //   'Page Id': (page) => async () => {
    //     expect(await page.html.head.facebook_page_id()).not.toBeNull()
    //   }
    // }
  ]
}
