#!/usr/bin/env node

let jest = require('jest')
let config = require('./config')

config.process()

let options = {
  onlyChanged: false,
  config: config.getJestConfig(),
  globals: JSON.stringify(config.getTestGlobalConfig())
}

if (config.program.dash) {
  options.reporters = ['jest-dashboard']
}

if (config.program.silent) {
  options.silent = true
}

// no-verbose
if (!config.program.verbose) {
  console.log(config.program.verbose)
  options.verbose = false
}

jest.runCLI(options, config.getTestFolders(), success => { console.log(success) })
