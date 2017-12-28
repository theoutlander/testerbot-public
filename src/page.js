module.exports = class Page {
  async goto(url) {
    this.page = await global.__BROWSER__.newPage()
    await this.page.goto(url)
  }

  async title() {
    return await this.page.title()

    //
    // let text = await page.evaluate(() => {
    //   //   debugger
    //   //   return document.body.textContent
    //   // })
  }

  async doctype() {
    return await this.page.evaluateHandle(() => document.doctype);
  }

  async doctype() {
    return await this.page.evaluateHandle(() => document.doctype);
  }

  async charset() {
    return await this.page.evaluateHandle(() => document.head.querySelector('meta[charset="utf-8"]'));
  }

  async x_ua_compatible() {
    return await this.page.evaluateHandle(() => document.head.querySelector('meta[http-equiv="X-UA-Compatible"][content="ie=edge"]'))
  }

  async viewport() {
    return await this.page.evaluateHandle(() => document.head.querySelector('meta[name="viewport"]'))
  }

  async favicon() {
    return await this.page.evaluateHandle(() => document.head.querySelector('link[rel*="icon"]'))
  }

  async meta_description() {
    return await this.page.evaluateHandle(() => document.head.querySelector('meta[name="description"]'))
  }

  async apple_meta_tags() {
  //   <!-- Apple Touch Icon (at least 200x200px) -->
  // <link rel="apple-touch-icon" href="/custom-icon.png">
  //
  //     <!-- To run web application in full-screen -->
  //   <meta name="apple-mobile-web-app-capable" content="yes">
  //
  //     <!-- Status Bar Style (see Supported Meta Tags below for available values) -->
  //   <!-- Has no effect unless you have the previous meta tag -->
  //   <meta name="apple-mobile-web-app-status-bar-style" content="black">

    //return await this.page.evaluateHandle(() => document.head.querySelector('meta[name="viewport"]'))
  }

  async windows_tiles() {
  // <meta name="msapplication-config" content="browserconfig.xml">
    return await this.query('meta[name="msapplication-config"][content="browserconfig.xml"]')
  }

  async query(qs) {
    return await this.page.evaluateHandle(() => document.querySelector(qs))
  }

  async canonical() {
    return await this.query('link[rel="canonical"]')
  }

  async language_attribute() {
    //Language attribute: The <code>lang</code> attribute of your website is specified and related to the language of the current page.
    return await this.page.evaluateHandle(() => document.head.querySelector('meta[name="viewport"]'))
  }

  async direction_attribute() {
    return await this.page.evaluateHandle(() => document.head.querySelector('meta[name="viewport"]'))
  }

  async alternate_language() {
    return await this.page.evaluateHandle(() => document.head.querySelector('meta[name="viewport"]'))
  }

  async conditional_comments() {
    return await this.page.evaluateHandle(() => document.head.querySelector('meta[name="viewport"]'))
  }

  async rss_feed() {
    return await this.page.evaluateHandle(() => document.head.querySelector('meta[name="viewport"]'))
  }

  async inline_critical_css() {
    return await this.page.evaluateHandle(() => document.head.querySelector('meta[name="viewport"]'))
  }

  async facebook_og() {
    return await this.page.evaluateHandle(() => document.head.querySelector('meta[name="viewport"]'))
  }

  async twitter_og() {
    return await this.page.evaluateHandle(() => document.head.querySelector('meta[name="viewport"]'))
  }

  async body() {
    return await this.page.evaluateHandle(() => document.body)
  }

  async head() {
    return await this.page.evaluateHandle(() => document.head)
  }

  async getElementByTag(tag) {
    return await this.page.evaluateHandle(() => document.getElementsByTagName(tag))
  }

  async getElementByClassName(name) {
    return await this.page.evaluateHandle(() => document.getElementsByClassName(name))
  }

  async getElementsByName(tag) {
    return await this.page.evaluateHandle(() => document.getElementsByName(tag))
  }

  async getElementById(tag) {
    return await this.page.evaluateHandle(() => document.getElementById(tag))
  }
}