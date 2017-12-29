module.exports = {
    name: 'Open Graph',
    desc: 'Open Graph meta tags exist on all pages',
    suite: 'Head',
    tags: ['HTML', 'SEO', 'SOCIAL'],

    test: (page) => async () => {
        expect(await page.html.head.facebook_og_title()).not.toBeNull()
        expect(await page.html.head.facebook_og_type()).not.toBeNull()
        expect(await page.html.head.facebook_og_url()).not.toBeNull()
        expect(await page.html.head.facebook_og_image()).not.toBeNull()
        expect(await page.html.head.facebook_og_site_name()).not.toBeNull()
        expect(await page.html.head.facebook_og_description()).not.toBeNull()
        expect(await page.html.head.facebook_page_id()).not.toBeNull()
    }
}
