let dir = require('node-dir')
let path = require('path')
let fs = require('fs-extra')
let Page = require('../browser/page')

module.exports = class Runner {
  constructor (dir) {
    this.dir = dir
    this.timeout = 5000
    this.userConfig = null

    this.__createUserConfig()

    this.runnerDir = path.resolve(__dirname, this.dir)
    fs.ensureDirSync(this.runnerDir)
  }

  __createUserConfig () {
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
  }

  // TODO: Should page be passed in?
  addTest (testCase, testFileObject, page) {

    let suite = testFileObject.suite
    let callback
    let desc
    let testName

    if (!testCase) {
      desc = testFileObject.desc
      callback = testFileObject.test
    }
    // Assuming it's an object if the desc property is defined
    else if (testCase.desc) {
      desc = testCase.desc
      callback = testCase.test
    }
    else {
      desc = Object.keys(testCase)[0]
      callback = testCase[desc]
    }

    testName = `${testFileObject.name}:${desc}`

    this.addDescribeTest(page, suite, testName, callback)
  }

  addDescribeTest (page, suite, testName, callback) {
    describe(suite, () => {
      it(testName, callback(page))
    })
  }

  addAutoTest (testCase) {
    it(`${testCase.name}: ${testCase.desc}`, () => {
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
