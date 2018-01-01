const timeout = 5000

let dir = require('node-dir')
let path = require('path')

let Page = require('../browser/page')

let userConfig

if (global.TESTERBOT.CONFIG) {
  const config = require(global.TESTERBOT.CONFIG)
  userConfig = Object.assign([], config)
}
else if (global.TESTERBOT.URL) {
  userConfig = Object.assign([], [{url: global.TESTERBOT.URL}])
}
else if (global.TESTERBOT.URLS) {
  let urlConfigs = {}
  for (let url of global.TESTERBOT.URLS) {
    urlConfigs['url'] = url
  }

  userConfig = Object.assign([], urlConfigs)
}

let testerbotDir = path.resolve(__dirname, '../__testerbot__')

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
    files.forEach(filePath => {
      // let parent = path.basename(path.dirname(f))
      // read file content
      // let data = fs.readFileSync(f, 'utf8')

      //let filePath = f //path.join(__dirname, '../../', f)

      var testFile = require(filePath)

      if (!testFile.skip &&
        (!item.tests ||
          ((!item.tests.skip || !item.tests.skip.includes(testFile.name)) &&
            (!item.tests.filter ||
              item.tests.filter <= 0 ||
              item.tests.filter.includes(testFile.name))))) {

        if (Array.isArray(testFile.test)) {
          testFile.test.forEach(testcase => {
            // Assuming it's an object if the desc property is defined
            if (testcase.desc) {
              describe(`${testFile.suite}`, () => {
                it(`${testFile.name}:${testcase.desc}`, testcase.test(page))
              })
            }
            else {
              let testDesc = Object.keys(testcase)[0]
              let test = testcase[testDesc]

              describe(`${testFile.suite}`, () => {
                it(`${testFile.name}:${testDesc}`, test(page))
              })
            }
          })
        }
        else {
          describe(`${testFile.suite}`, () => {
            it(`${testFile.name}:${testFile.desc}`, testFile.test(page))
          })
        }
      }
    })
  })
})
