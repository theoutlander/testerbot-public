import Runner from '../lib/runner'

let runner = new Runner('../tests/__crawler__/auto')

// Create suite
describe(`Automatic Crawl`, () => {
  let files = runner.getAllTestFiles()

  // for each test file
  files.forEach(filePath => {
    // read file content
    // console.log(filePath)
    var testCase = require(filePath)

    // console.log(testCase)
    runner.addAutoTest(testCase)
  })
})
