let dir = require('node-dir')
let path = require('path')

let Page = require('../browser/page')

export default class Runner {
  constructor (dir) {
    this.dir = dir ? dir : '../tests/__testerbot__'
    this.timeout = 5000
    this.userConfig = null

    if (global.TESTERBOT.CONFIG) {
      const config = require(global.TESTERBOT.CONFIG)
      this.userConfig = Object.assign([], config)
    }
    else if (global.TESTERBOT.URL) {
      this.userConfig = Object.assign([], [{url: global.TESTERBOT.URL}])
    }
    else if (global.TESTERBOT.URLS) {
      let urlConfigs = []
      for (let url of global.TESTERBOT.URLS) {
        urlConfigs.push({url: url})
      }

      this.userConfig = Object.assign([], urlConfigs)
    }

    if (!this.userConfig) {
      throw new Error('User Configuration Not Found')
    }

    this.runnerDir = path.resolve(__dirname, this.dir)
  }

  // TODO: Should page be passed in?
  addTest (testCase, testFileObject, page) {
    if (!testCase) {
      describe(`${testFileObject.suite}`, () => {
        it(`${testFileObject.name}:${testFileObject.desc}`, testFileObject.test(page))
      })
    }
    else {
      // Assuming it's an object if the desc property is defined
      if (testCase.desc) {
        describe(`${testFileObject.suite}`, () => {
          it(`${testFileObject.name}:${testCase.desc}`, testCase.test(page))
        })
      }
      else {
        let testDesc = Object.keys(testCase)[0]
        let test = testCase[testDesc]

        describe(`${testFileObject.suite}`, () => {
          it(`${testFileObject.name}:${testDesc}`, test(page))
        })
      }
    }
  }

  addAutoTest (testCase) {
    it(testCase.name, () => {
      expect(testCase.actual).toEqual(testCase.expected)
    })
  }

  getUserConfig () {
    return this.userConfig
  }

  getRunnerDir () {
    return this.runnerDir
  }

  getTimeout () {
    return this.timeout
  }

  getAllTestFiles () {
    this.testFiles = dir.files(this.runnerDir, {sync: true})
    return this.testFiles
  }

  getNewPage () {
    return new Page()
  }
}
