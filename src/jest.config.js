module.exports = {
  silent: false,
  verbose: true,
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './puppeteer_environment.js',
  roots: ["runner"],
  haste: {
    providesModuleNodeModules: ["testerbot"]
  },
  testPathIgnorePatterns: []
  // globals: {
  //   TESTERBOT: {
  //     CONFIG: '../testerbot.config.js'
  //   }
  // }
}
