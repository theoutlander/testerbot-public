module.exports = class Head {
  constructor (page) {
    this.page = page
  }

  async markup () {
    return this.page.query('document.head')
  }

  async title () {
    return this.page.browserPage.title()
  }

  async charset () {
    return this.page.query('meta[charset="utf-8"]')
  }

  async x_ua_compatible () {
    return this.page.query('meta[http-equiv="X-UA-Compatible"][content="ie=edge"]')
  }

  async viewport () {
    return await this.page.query('meta[name="viewport"]')
    // let handle = await this.page.query('meta[name="viewport"]')
    // const html = await this.page.browserPage.evaluate(viewport => viewport.innerHTML, handle);
    // return html
  }

  async favicon () {
    return this.page.query('link[rel*="icon"]')
  }

  async meta_description () {
    return this.page.query('meta[name="description"]')
  }

  async apple_meta_tags () {
    //   <!-- Apple Touch Icon (at least 200x200px) -->
    // <link rel="apple-touch-icon" href="/custom-icon.png">
    //
    //     <!-- To run web application in full-screen -->
    //   <meta name="apple-mobile-web-app-capable" content="yes">
    //
    //     <!-- Status Bar Style (see Supported Meta Tags below for available values) -->
    //   <!-- Has no effect unless you have the previous meta tag -->
    //   <meta name="apple-mobile-web-app-status-bar-style" content="black">

    // return await this.page.query('meta[name="viewport"]'))
  }

  async windows_tiles () {
    return this.page.query('meta[name="msapplication-config"][content="browserconfig.xml"]')
  }

  async canonical () {
    return this.page.query('link[rel="canonical"]')
  }

  // async conditional_comments () {
  //   return this.page.query('meta[name="viewport"]')
  // }
  //
  // async rss_feed () {
  //   return this.page.query('meta[name="viewport"]')
  // }
  //
  // async inline_critical_css () {
  //   return this.page.query('meta[name="viewport"]')
  // }

  //FB Open Graph
  async facebook_og_title () {
    return this.page.query('meta[property="og:title"]')
  }

  async facebook_og_type () {
    return this.page.query('meta[property="og:type"]')
  }

  async facebook_og_url () {
    return this.page.query('meta[property="og:url"]')
  }

  async facebook_og_image () {
    return this.page.query('meta[property="og:image"]')
  }

  async facebook_og_site_name () {
    return this.page.query('meta[property="og:site_name"]')
  }

  async facebook_og_description () {
    return this.page.query('meta[property="og:description"]')
  }

  // This appears to not exist on FB docs. Deprecated?
  // async facebook_page_id () {
  //   return this.page.query('meta[property="fb:page_id"]')
  // }

  // async twitter_og () {
  //   return this.page.query('meta[name="viewport"]')
  // }
}
