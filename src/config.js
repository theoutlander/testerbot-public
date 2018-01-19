let program = require('commander')
let fs = require('fs')
let chalk = require('chalk')
let path = require('path')
let validator = require('validator')

class Config {
  constructor () {
    this.program = program

    program
      .version('0.1.0')
      .option('-c, --config <path>', 'Specify Testerbot Config file')
      .option('-d, --dash', 'Display results in dashboard')
      .option('-s, --silent', 'Hide console output from tests')
      .option('-u, --url <url>', 'Url to run tests against')
      .option('-U, --urls <urls>', 'Url to run tests against', val => val.split(','))
      .option('-n, --no-verbose', 'Hide verbose output')
    // .option('-t, --test', 'run tests against mock server')

    program.options = program.options.filter(o => o.short !== '-V')

    program.option('-v, --version', 'Output the version number')
    // .option('-h, --help', 'Output usage information')

    program.options.sort((a, b) => a.short.localeCompare(b.short))
  }

  process () {
    program.parse(process.argv)
    this.__validate()
  }

  __validate () {
    this.__hasJestConfig()
    this.__hasTestFolders()

    if (!this.__hasRequiredArguments()) {
      program.url = 'http://localhost:3000'
    }
  }

  __hasJestConfig () {
    if (!fs.existsSync(this.getJestConfig())) {
      this.__printHelpMessageAndExit('Cannot find internal configuration file for jest')
    }

    return true
  }

  __hasTestFolders () {
    let folders = this.getTestFolders()

    for (let folder of folders) {
      if (!fs.existsSync(folder)) {
        this.__printHelpMessageAndExit('Cannot find internal test folders')
      }
    }

    return true
  }

  __hasRequiredArguments () {
    return (program.config || program.url || program.urls)

    // if (!(program.config || program.url || program.urls)) {
    //   //this.__printHelpMessageAndExit('Config file or URL(s) must be specified')
    // }

    // return true
  }

  __hasTesterbotConfig () {
    if (!fs.existsSync(this.getTesterbotConfig())) {
      this.__printHelpMessageAndExit(`Cannot find config file: ${this.getTesterbotConfig()}`)
    }

    return true
  }

  __isValidUrl (url) {
    if (url && !validator.isURL(url, {
        require_host: false,
        require_protocol: true,
        require_tld: false
      })) {
      this.__printHelpMessageAndExit(`Invalid URL: ${url}`)
    }

    return true
  }

  __areValidUrls (urls) {
    if (!urls) {
      this.__printHelpMessageAndExit(`Invalid URL(s): ${urls}`)
    }

    for (let url of urls) {
      this.__isValidUrl(url)
    }

    return true
  }

  __printHelpMessageAndExit (msg) {
    console.error(chalk.red(msg))

    program.outputHelp()
    console.log()
    console.log()
    process.exit(1)
  }

  getTesterbotConfig () {
    if(program.config) {
      return path.resolve(process.cwd(), program.config)
    }
    return path.resolve(process.cwd(), 'testerbot.config.js')
  }

  getJestConfig () {
    return path.join(__dirname, 'jest.config.js')
  }

  getTestFolders () {
    return [path.resolve(__dirname, 'runner')]
  }

  getTestGlobalConfig () {
    let val = {}
    if (program.config && this.__hasTesterbotConfig()) {
      val.CONFIG = this.getTesterbotConfig()
    }
    else if (program.url && this.__isValidUrl(program.url)) {
      val.URL = program.url
    }
    else if (program.urls && this.__areValidUrls(program.urls)) {
      val.URLS = program.urls
    }

    return {
      TESTERBOT: val
    }
  }
}

module.exports = new Config()