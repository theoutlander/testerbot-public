module.exports = {
  silent: false,
  verbose: true,
  globalSetup: './src/setup.js',
  globalTeardown: './src/teardown.js',
  testEnvironment: './src/puppeteer_environment.js',
  testResultsProcessor: "jest-junit",
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  roots: ["src/runner"],
  haste: {
    providesModuleNodeModules: ["testerbot"]
  },
  testPathIgnorePatterns: []
  // globals: {
  //   TESTERBOT: {
  //     CONFIG: '../testerbot.config.js',
  //   }
  // }
}
