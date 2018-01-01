# testerbot

Automatic Front-End Testing
<p>
<img src="https://img.shields.io/circleci/project/github/theoutlander/testerbot.svg">
<img src="https://badge.fury.io/js/testerbot.svg">
<img src="https://img.shields.io/npm/dt/testerbot.svg">
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
<img src="https://img.shields.io/badge/License-MIT-blue.svg">
</p>

## Purpose

During development, there isn't enough time to write tests, so our only option is manual testing! We don't need a reminder of how inefficient, time-consuming, error-prone and boring that can get! When we get around to writing test-automations, we spend a lot of time writing tests from scratch. However, most of the test-cases for testing web-applications can be automated and reused.

We created *Testerbot* to automatically test web-applications during the development process via [Puppeteer](https://github.com/GoogleChrome/puppeteer/) which talks to [Google Chrome Headless Browser](https://developers.google.com/web/updates/2017/04/headless-chrome). 

The basic framework is ready and we have implemented a few test-cases, but we need help in adding more reusable test-cases.

Note: I started this project several months ago and built a SaaS product, but realized that an open-source test automation package will help catch issues quickly during development. I recently stumbled upon https://frontendchecklist.io/ and created github issues to automate as many of those tests as possible into *Testerbot*.

## Install

```
npm i testerbot -D
```

[![NPM](https://nodei.co/npm/testerbot.png)](https://npmjs.org/package/testerbot)

## Usage

### Quick-Start

```
# Without any arguments, we default to http://localhost:3000
testerbot 
```

```
# Specify a url via --url
testerbot --url http://localhost:5000
```

```
# Specify multiple comma seoparated urls via --url
testerbot --urls http://localhost:5000,http://localhost:5000/toc.html
```

### Testerbot Configuration

```
// Testerbot Run Configuration

module.exports = [{
  url:
    'http://localhost:5000',

  tests: {
  
    // Test name(s) go here
    // These tests will be skipped
    skip: [
      'Open Graph'
    ],

    // Test name(s) go here
    // These are the only tests to be run
    filter: [
      'Viewport' 
    ]
  }
}]
```

# Basic Features

- A comprehensive set of pre-defined test cases
- Support for multiple URL's in a test run
- Ability to skip tests or run only specific tests
- Integrated dashboard
- Platform and language agnostic
- Ability to run in CI build process


# Todo: Advanced Features

[ ] Authentication

[ ] Custom Scenarios (workflows)

[ ] Tags

[ ] Custom Reporter

[ ] Automatic Crawling

[ ] Filling Forms


# Contribution

This is a work-in-progress and we would like your help. Please consider contributing to this project on one of the following:

- Framework Improvements

- Dashboard Improvements

- [Test Cases](https://github.com/theoutlander/testerbot/issues?q=is%3Aissue+is%3Aopen+label%3A%22Test+Case%22)

- [Provide User Feedack / Bug Reports](https://github.com/theoutlander/testerbot/issues/new)


# License

MIT License
