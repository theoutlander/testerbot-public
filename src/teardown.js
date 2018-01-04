const chalk = require('chalk')
// const puppeteer = require('puppeteer')
const rimraf = require('rimraf')
const os = require('os')
const path = require('path')
const pkill = require('pkill')

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

module.exports = async function () {
  if (process.env.NODE_ENV !== 'dashboard') {
    console.log(chalk.green('Teardown Puppeteer Environment.'))
  }

  await global.__BROWSER__.close()
  rimraf.sync(DIR)

  pkill.full('.bin/static -p 8080 ./tests')
}
