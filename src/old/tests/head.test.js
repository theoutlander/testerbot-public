  it('Apple Web App Meta: Apple meta-tags are present.\n', async () => {
      // TODO: Implement
      // expect(await page.apple_meta_tags()).not.toBeNull()
  //
  //   <!-- Apple Touch Icon (at least 200x200px) -->
  // <link rel="apple-touch-icon" href="/custom-icon.png">
  //
  //     <!-- To run web application in full-screen -->
  //   <meta name="apple-mobile-web-app-capable" content="yes">
  //
  //     <!-- Status Bar Style (see Supported Meta Tags below for available values) -->
  //   <!-- Has no effect unless you have the previous meta tag -->
  //   <meta name="apple-mobile-web-app-status-bar-style" content="black">
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
