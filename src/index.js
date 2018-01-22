#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const dir = require('node-dir')
const jest = require('jest')
const shelljs = require('shelljs')

const DynamicTestRunner = require('./runner/dynamic.test.runner')

const config = require('./config')
config.process()

let options = {
  onlyChanged: false,
  config: config.getJestConfig()
}

if (config.program.dash) {
  options.reporters = ['jest-dashboard']
}

if (config.program.silent) {
  options.silent = true
}

// no-verbose
if (!config.program.verbose) {
  // console.log(config.program.verbose)
  options.verbose = false
}

global.ARGUMENTS = config.getTestGlobalConfig()

if (config.program.test) {
  console.log('-----------RUNNING A SELF-TEST-----------')
  shelljs.exec('npm run static', (code, stdout, err) => {
    console.log('---------TEST SERVER STOPPED-----------')
  })

  setTimeout(() => {
    jest.runCLI(options, config.getTestFolders(), success => { console.log(success) })
  }, 2000)

  return
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
