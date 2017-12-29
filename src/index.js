#!/usr/bin/env node

let path = require('path')
let jest = require('jest')

console.log(__dirname)

jest.runCLI({ onlyChanged: false, config: './src/jest.config.js' }, [path.resolve(__dirname, 'runner')], function (success) {
  // console.log(success)
})
