#!/usr/bin/env node

let jest = require('jest')
let config = require('./config')

config.process()

let options = {
  onlyChanged: false,
  config: config.getJestConfig(),
  globals: JSON.stringify(config.getTestGlobalConfig())
}
console.log(options.globals)

if (config.program.dash) {
  options.reporters = ['jest-dashboard']
}

if (config.program.silent) {
  options.silent = true
}

if (config.program.verbose) {
  options.verbose = true
}

jest.runCLI(options, config.getTestFolders(), success => { console.log(success) })
