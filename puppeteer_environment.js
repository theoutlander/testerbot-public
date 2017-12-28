const chalk = require('chalk')
const NodeEnvironment = require('jest-environment-node')
const puppeteer = require('puppeteer')
const fs = require('fs')
const os = require('os')
const path = require('path')
const DIR = path.join(os.tmpdir(), 'testerbot_global_setup')
const Page = require('./src/page')

class PuppeteerEnvironment extends NodeEnvironment {
  constructor (config) {
    super(config)
  }

  async setup () {
    if (process.env.NODE_ENV !== 'dashboard') {
      console.log(chalk.green('Setup Puppeteer Test Environment.'))
    }

    await super.setup()
    const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8')
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found')
    }

    this.global.__PAGE__ = this.global.Page = Page

    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    })
  }

  async teardown () {
    await super.teardown()
  }

  runScript (script) {
    return super.runScript(script)
  }
}

module.exports = PuppeteerEnvironment