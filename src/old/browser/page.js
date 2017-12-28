import cheerio from "cheerio";

export default class Page22 {
  constructor(browser) {
    this._browser = browser;
  }

  async goto(url) {
    try {
      this._page = await this._browser.newPage();
      await this._page.goto(url, {
        waitUntil: "networkidle0"
        // networkIdleTimeout: 1000
      });
    } catch (error) {
      console.error(error);
      throw error;
    }

    return this;
  }

  html() {
    this.html;
  }

  async close() {
    await this._page.close();
    return this;
  }

  async screenshot(name = "example.png") {
    // console.log("Taking a screenshot..");
    await this._page.screenshot({ path: name });
    return this;
  }

  async __getHTML() {
    // console.log("Retrieving HTML");
    this.html = await this._page.evaluate(
      () => document.documentElement.outerHTML
    );
    return this.html;
  }
}
