const timeout = 5000

let dir = require('node-dir')
let path = require('path')
let fs = require('fs')

let Page = require('../src/browser/page')

let baseConfig = {

}

// Read Config
let userConfig = require(path.join(__dirname, '../', 'testerbot.config.js'))

let config = Object.assign({}, baseConfig, userConfig)

// For each url
config.urls.forEach(url => {
  // Create suite
  describe(`Page: ${url}`, () => {
      let page = new Page()

      beforeAll(async () => {
        await page.goto(url)
      }, timeout)

      // Get all test files
      let files = dir.files(config.dir, {sync: true})

      // for each test file
      files.forEach(f => {
        // let parent = path.basename(path.dirname(f))
        // read file content
        // let data = fs.readFileSync(f, 'utf8')
        let filePath = path.join(__dirname, '../', f)

        var testFile = require(filePath)

        it(testFile.name, testFile.test(page))
      })
  })
})
