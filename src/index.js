#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const dir = require('node-dir')
const jest = require('jest')
const DynamicTestRunner = require('./runner/dynamic.test.runner')

const config = require('./config')
config.process()

global.ARGUMENTS = config.getTestGlobalConfig()

let options = {
  onlyChanged: false,
  config: config.getJestConfig(),
  arguments: ARGUMENTS
  // globals: config.getTestGlobalConfig()
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

let dynamicTestsPath = path.resolve(__dirname, './runner/dynamicTests')
let testFiles = []

if (fs.existsSync(dynamicTestsPath)) {
  testFiles = dir.files(dynamicTestsPath, {sync: true})
}

if (testFiles && testFiles.length > 0) {
  let dynamicTestRunner = new DynamicTestRunner(testFiles, path.resolve('./src/tests/__crawler__/auto'))
  dynamicTestRunner.run()
    .then(results => {
      jest.runCLI(options, config.getTestFolders(), success => { console.log(success) })
    })
}
else {
  jest.runCLI(options, config.getTestFolders(), success => { console.log(success) })
}
