const fs = require('fs-extra')
const path = require('path')

const Runner = require('../lib/runner')

module.exports = class DynamicTestRunner {
  constructor (testFiles, output) {
    this.testFiles = testFiles
    this.runner = new Runner('../tests/__crawler__')
    this.configObj = this.runner.getUserConfig()
    this.output = output

    fs.ensureDirSync(output)
    fs.emptyDirSync(output)
  }

  async createWorkItems () {
    let workItems = []

    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.testFiles.length; i++) {

        for (let j = 0; j < this.configObj.length; j++) {
          let configItem = this.configObj[j]
          let file = this.testFiles[i]

          let Class = require(file)
          let obj = new Class()

          await obj.init(configItem.url)

          workItems.push(
            new Promise(async (resolve, reject) => {
              let results = await obj.run()
              resolve(results)
            })
          )
        }
      }
      resolve(workItems)
    })
  }

  __createTest (item) {
    return {
      name: item.url,
      desc: `Page Load: ${item.passed ? 'Passed' : 'Failed'}`,
      suite: 'Crawl',
      tags: ['Crawl'],
      actual: item.passed,
      expected: true
    }
  }

  async __createDynamicTests (result) {
    return new Promise(async (resolve, reject) => {
      let tests = []
      for (let i = 0; i < result.length; i++) {
        tests.push(this.__createTest(result[i]))
      }

      resolve(tests)
    })
  }

  async __serializeTests(tests, prefix) {
    for(let i=0; i<tests.length; i++)
    {
      fs.outputJsonSync(path.join(this.output, prefix + '_' + i.toString() + '.json'), tests[i])
    }
  }

  async run () {
    return new Promise((resolve, reject) => {
      this.userConfig = Object.assign([], this.configObj)

      this.createWorkItems()
        .then(workItems => {
          Promise.all(workItems)
            .then(async result => {
              for(let i=0; i<result.length; i++)
              {
                let tests = await this.__createDynamicTests(result[i])
                await this.__serializeTests(tests, i)
              }

              resolve(result)
            })
            .catch(err => {
              console.error(err)
              reject(err)
            })
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  }
}