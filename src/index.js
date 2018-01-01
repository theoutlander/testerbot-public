#!/usr/bin/env node

let jest = require('jest')
let config = require('./config')

config.process()

jest.runCLI({
    onlyChanged: false,
    config: config.getJestConfig(),
    globals: JSON.stringify({TESTERBOT: config.getConfig()})
  },
  config.getTestFolders()
  ,
  function (success) {
    console.log(success)
  })
