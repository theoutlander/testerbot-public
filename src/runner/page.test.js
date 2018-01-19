import Runner from '../lib/runner'

let runner = new Runner('../tests/__testerbot__')

// For each url
runner.getUserConfig().forEach(item => {

  // Create suite
  describe(`Page: ${item.url}`, () => {
    let page = runner.getNewPage()

    beforeAll(async () => {
      await page.goto(item.url)
    }, runner.getTimeout())

    let files = runner.getAllTestFiles()

    // for each test file
    files.forEach(filePath => {
      // read file content
      var testFile = require(filePath)

      // Check if test file must be skipped
      // Check if there are tests and they're not marked as skip
      // If there is a filter defined, that takes priority
      if (!testFile.skip &&
        (!item.tests ||
          ((!item.tests.skip || !item.tests.skip.includes(testFile.name)) &&
            (!item.tests.filter ||
              item.tests.filter <= 0 ||
              item.tests.filter.includes(testFile.name))))) {

        // if tests are defined in an array
        if (Array.isArray(testFile.test)) {
          testFile.test.forEach(testcase => {
            // if(testcase.describe) {
            //   describe(`${testFile.suite}`, () => {
            //     console.log("Inside DESCRIBE-------------------")
            //     //it(`${testFile.name}:${testcase.desc}`, testcase.test(page))
            //     testcase.test(page)
            //   })
            // }

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
