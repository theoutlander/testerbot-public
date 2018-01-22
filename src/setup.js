const chalk = require('chalk')
const puppeteer = require('puppeteer')
const fs = require('fs')
const mkdirp = require('mkdirp')
const os = require('os')
const path = require('path')

const DIR = path.join(os.tmpdir(), 'testerbot_global_setup')

module.exports = async function () {
  if (process.env.NODE_ENV !== 'dashboard') {
    console.log(chalk.green('Setup Puppeteer Environment.'))
  }

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
    headless: false,
    waitUntil: 'load', // default
    ignoreHTTPSErrors: true
  })

  global.__BROWSER__ = browser
  mkdirp.sync(DIR)
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint())
}
