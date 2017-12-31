const timeout = 5000

let dir = require('node-dir')
let path = require('path')
// let fs = require('fs')

let Page = require('../browser/page')

// let baseConfig = {}

// Read Config
let userConfig = require(path.join(__dirname, '../../', 'testerbot.config.js'))

// let config = Object.assign({}, baseConfig, userConfig)

let testerbotDir = './src/__testerbot__'

// For each url
userConfig.forEach(item => {

  // Create suite
  describe(`Page: ${item.url}`, () => {
    let page = new Page()

    beforeAll(async () => {
      await page.goto(item.url)
    }, timeout)

    // Get all test files
    let files = dir.files(testerbotDir, {sync: true})

    // for each test file
    files.forEach(f => {
      // let parent = path.basename(path.dirname(f))
      // read file content
      // let data = fs.readFileSync(f, 'utf8')

      let filePath = path.join(__dirname, '../../', f)

      var testFile = require(filePath)

      if ((!item.tests.skip || !item.tests.skip.includes(testFile.name)) &&
        (!item.tests.filter ||
          item.tests.filter <= 0 ||
          item.tests.filter.includes(testFile.name))) {

        if (Array.isArray(testFile.test))
        {
          testFile.test.forEach(testcase => {
            // Assuming it's an object if the desc property is defined
            if (testcase.desc)
            {
              it(`${testFile.name}:${testcase.desc}`, testcase.test(page))
            }
            else {
              let testDesc = Object.keys(testcase)[0]
              let test = testcase[testDesc]
              it(`${testFile.name}:${testDesc}`, test(page))
            }
          })
        }
        else{
          it(`${testFile.name}:${testFile.desc}`, testFile.test(page))
        }
      }
    })
  })
})
