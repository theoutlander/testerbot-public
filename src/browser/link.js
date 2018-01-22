module.exports = class Link {
  static async extractLinks (page) {
    try {
      console.log('Extracting Links')
      let links = await page.evaluate(() => {
        // TODO: Figure out how to exclude mailto links via query selector
        const anchors = Array.from(document.querySelectorAll('a'))

        let hrefs = anchors.map(anchor => anchor.href)

        hrefs = hrefs.filter(href => href !== '')
        hrefs = hrefs.filter(href => href.toLowerCase().indexOf('mailto:') < 0)
        hrefs = hrefs.filter(href => href.toLowerCase().indexOf('javascript:') < 0)
        // hrefs = hrefs.filter(href => href.toLowerCase().indexOf('#') != href.length - 1)
        // hrefs = hrefs.filter(href => href.toLowerCase().indexOf('#') != href.length-1)

        return hrefs
      })
        .catch(e => {
          console.error('In evaluate error: ')
          console.error(e)
        })

      return links
    }
    catch (e) {
      console.error('Error extracting links...')
      console.error(e)
    }
  }
}

/*

  async __extractLinks () {
    console.log('Extracting Links')

    try {
      let links = await this.browserPage.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a'))
        return anchors.map(anchor => anchor.href)
      })
        .catch(e => {
          console.error('In evaluate error: ')
          console.error(e)
        })

      // if (false) { //global.config.processor.scraper.domainOnly) {
      //   console.log("Filtering links");
      //
      //   if(!links) {
      //     console.log("links is null: " + (links == null));
      //   }
      //
      //   this.context.links = links.filter(l => {
      //     // return l.startsWith("https://" + this.context.domain) || l.startsWith("http://" + this.context.domain);
      //     return l.indexOf(this.context.domain) >= 0;
      //   });
      // }
      // else {
      //   //TODO: Handle blank links or those with javascript (Via mouse clicks?)
      //   this.context.links = links.filter(l => l.trim() != ''
      //     && l.trim() != 'javascript:void(0);'
      //     && l.trim() != 'javascript:void(0)');
      // }
      return links
    }
    catch (e) {
      console.error('Error extracting links...')
      console.error(e)
    }
    finally {
      console.log('Done extracting links...')
    }
  }
 */