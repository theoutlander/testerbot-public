const fs = require('fs-extra')
const path = require('path')

module.exports = class DynamicTestRunner {
  constructor (testFiles, options, output) {
    this.testFiles = testFiles
    this.options = options
    this.configObj = require(this.options.globals.TESTERBOT.CONFIG)
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
              // console.log(configItem.url)
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
    // console.log(item)
    return {
      name: item.url,
      // desc: 'Use rel="canonical" to avoid duplicate content',
      suite: 'Crawl',
      tags: ['Crawl'],
      actual: item.passed,
      expected: true

      // test: (page) => async () => {
      //   expect(item.passed).toEqual(true)
      // }
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
    // console.log(tests.length)
    for(let i=0; i<tests.length; i++)
    {
      // console.log(tests[i])
      // console.log("Serializing " + path.join(this.output, i.toString()))
      // console.log(JSON.stringify(tests[i]))
      fs.outputJsonSync(path.join(this.output, prefix + '_' + i.toString() + '.json'), tests[i])
    }
  }

  async run () {
    return new Promise((resolve, reject) => {
      this.userConfig = Object.assign([], this.configObj)

      this.createWorkItems()
        .then(workItems => {
          // console.log(workItems.length)
          Promise.all(workItems)
            .then(async result => {
              // console.log('in resolve')
              // console.log(result)

              for(let i=0; i<result.length; i++)
              {
                let tests = await this.__createDynamicTests(result[i])
                await this.__serializeTests(tests, i)
              }

              resolve(result)
              // jest.runCLI(options, config.getTestFolders(), success => { console.log(success) })
              // Call jest CLI when dynamic tests are created
            })
            .catch(err => {
              console.error(err)
              reject(err)
            })
          // console.log('past promise')
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
}