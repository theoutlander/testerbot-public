#!/usr/bin/env node

let jest = require('jest')
let config = require('./config')

config.process()

let options = {
  onlyChanged: false,
  config: config.getJestConfig(),
  // verbose: config.getVerbose(),
  // silent: config.getSilent(),
  globals: JSON.stringify({TESTERBOT: config.getConfig()})
}

jest.runCLI(options, config.getTestFolders(), success => { console.log(success) })
