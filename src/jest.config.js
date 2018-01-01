module.exports = {
  silent: true,
  verbose: false,
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './puppeteer_environment.js',
  roots: ["runner"],
  globals: {
    TESTERBOT: {
      URL: 'http://localhost:8080'
    }
  }
}
