import Runner from '../lib/runner'

let runner = new Runner('../tests/__testerbot__')

let shouldExecuteTest = function (configItem, testFile) {
  // Check if test file must be skipped
  // Check if there are tests and they're not marked as skip
  // If there is a filter defined, that takes priority

  return (!testFile.skip &&
    (!configItem.tests ||
      ((!configItem.tests.skip || !configItem.tests.skip.includes(testFile.name)) &&
        (!configItem.tests.filter ||
          configItem.tests.filter <= 0 ||
          configItem.tests.filter.includes(testFile.name)))))
}

// For each url
runner.getUserConfig().forEach(configItem => {

  // Create suite
  describe(`Page: ${configItem.url}`, () => {
    let page = runner.getNewPage()

    beforeAll(async () => {
      await page.goto(configItem.url)
    }, runner.getTimeout())

    let testFiles = runner.getAllTestFiles()

    // for each test file
    testFiles.forEach(testFilePath => {
      // read file content
      var testFile = require(testFilePath)

      if (shouldExecuteTest(configItem, testFile)) {
        // if tests are defined in an array
        if (Array.isArray(testFile.test)) {
          testFile.test.forEach(testcase => {
            runner.addTest(testcase, testFile, page)
          })
        }
        else {
          runner.addTest(null, testFile, page)
        }
      }
    })
  })
})
