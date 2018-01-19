let dir = require('node-dir')
let path = require('path')
let fs = require('fs-extra')
let Page = require('../browser/page')

module.exports = class Runner {
  constructor (dir) {
    this.dir = dir //? dir : '../tests/__testerbot__'
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
    fs.ensureDirSync(this.runnerDir)
  }

  // TODO: Should page be passed in?
  addTest (testCase, testFileObject, page) {
    if (!testCase) {
      this.addDescribeTest(page,
        `${testFileObject.suite}`,
        `${testFileObject.name}:${testFileObject.desc}`,
        testFileObject.test)
    }
    else {
      // Assuming it's an object if the desc property is defined
      if (testCase.desc) {
        this.addDescribeTest(page,
          `${testFileObject.suite}`,
          `${testFileObject.name}:${testCase.desc}`,
          testCase.test)
      }
      else {
        let testDesc = Object.keys(testCase)[0]
        let test = testCase[testDesc]

        this.addDescribeTest(page,
          `${testFileObject.suite}`,
          `${testFileObject.name}:${testDesc}`,
          test)
      }
    }
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
