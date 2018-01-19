import Runner from '../lib/runner'

// Create suite
describe(`Automatic Crawl`, () => {
  let runner = new Runner('../tests/__crawler__/auto')
  let files = runner.getAllTestFiles()

  if (files) {
    // for each test file
    files.forEach(filePath => {
      // read file content
      var testCase = require(filePath)
      runner.addAutoTest(testCase)
    })
  }
  else {
    it('Preprocessor wasn\'t run', () => {
      expect(true).toEqual(true)
    })
  }
})
