let puppeteer = require("puppeteer");
import Page from "./page";

export default class Browser {
  constructor() {
    this.browser = null;
  }

  async launch(options) {
    console.info("-----------------");
    console.info("Launching browser");
    console.info("-----------------");

    try {
      let opt = Object.assign(
        {},
        {
          headless: false,
          args: ["--no-sandbox"]
        },
        options
      );

      this.browser = await puppeteer.launch(opt);

      return this.browser;
    } catch (e) {
      console.error("Error launching browser: ");
      console.error(e);
    }
  }

  async loadPage(url) {
    let page = new Page(this.browser);
    await page.goto(url);
    return page;
  }
}
