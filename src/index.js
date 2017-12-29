#!/usr/bin/env node

let path = require('path')
let jest = require('jest')

console.log(__dirname)

jest.runCLI({ onlyChanged: false, config: 'jest2.config.js' }, [path.resolve(path.basename(__dirname), '../', 'tests')], function (success) {
  // console.log(success)
})
