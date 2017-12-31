  it('Favicons: Each favicon has been created and displays correctly.', async () => {
    let favicon = await page.html.head.favicon()
    expect(favicon).not.toBeNull()
    expect(favicon).not.toBeNull()
    expect(favicon.href).not.toBeNull()

      // if (favicon.href.indexOf('.ico')>0) {
      //   console.warn('If you have only a favicon.ico, put it at the root of your site. Normally you won\'t need to use any markup. ' +
      //     'However, it\'s still good practice to link to it using the example below. Today, PNG format is recommended over .ico ' +
      //     'format (dimensions: 32x32px).')
      // }
  })

  it('Apple Web App Meta: Apple meta-tags are present.\n', async () => {
      // TODO: Implement
      // expect(await page.apple_meta_tags()).not.toBeNull()
  })



  it('Canonical: Use rel="canonical" to avoid duplicate content.', async () => {
    expect(await page.html.head.canonical()).not.toBeNull()
  })

  it('Language attribute: The <code>lang</code> attribute of your website is specified and related to the language of the current page.', async () => {
    let lang = page.html.language_attribute()
    expect(await lang).not.toBeNull()
      // check lang is one of accepted values
  })

  it('Direction attribute: The direction of lecture is specified on the html tag (It can be used on another HTML tag).', async () => {
    expect(await page.html.direction_attribute()).not.toBeNull()
  })

    // TODO: Enable
    //   it('Alternate language: The language tag of your website is specified and related to the language of the current page.', async () => {
    //     expect(await page.html.alternate_language()).not.toBeNull()
    //   })

    // TODO: Enable
    //   it('Conditional comments: Conditional comments are present for IE if needed.', async () => {
    //     expect(await page.conditional_comments()).not.toBeNull()
    //   })

    // TODO: Fix
  it('RSS feed: If your project is a blog or has articles, an RSS link was provided.', async () => {
    expect(await page.html.head.rss_feed()).not.toBeNull()
  })

    // TODO: Fix
  it('Inline critical CSS: The inline critical CSS is correctly injected in the HEAD.', async () => {
    expect(await page.html.head.inline_critical_css()).not.toBeNull()
  })

    // TODO: Fix
    // it('CSS order: All CSS files are loaded before any JavaScript files in the HEAD', async () => {
    //   expect(await page.html.head.markup() css_order()).not.toBeNull()
    // })

    // TODO: Implement
  it('Twitter Card:', async () => {
    expect(await page.html.head.twitter_og()).not.toBeNull()
  })
