# testerbot

Automatic Front-End Testing

[![Maintainability](https://api.codeclimate.com/v1/badges/ca6cd785255660569248/maintainability)](https://codeclimate.com/github/theoutlander/testerbot/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ca6cd785255660569248/test_coverage)](https://codeclimate.com/github/theoutlander/testerbot/test_coverage)
[![CircleCI](https://img.shields.io/circleci/project/github/theoutlander/testerbot.svg)](https://circleci.com/gh/theoutlander/testerbot)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![npm version](https://badge.fury.io/js/testerbot.svg)](https://badge.fury.io/js/testerbot)
[![npm](https://img.shields.io/npm/dt/testerbot.svg)](https://github.com/theoutlander/testerbot)
[![NSP Status](https://nodesecurity.io/orgs/theoutlander/projects/7e583a80-3e24-4a83-b280-9c81550f9048/badge)](https://nodesecurity.io/orgs/theoutlander/projects/7e583a80-3e24-4a83-b280-9c81550f9048)
[![license](https://img.shields.io/github/license/theoutlander/testerbot.svg)](https://github.com/theoutlander/testerbot/blob/master/LICENSE)
[![Join the chat at https://gitter.im/theoutlander/testerbot](https://badges.gitter.im/theoutlander/testerbot.svg)](https://gitter.im/theoutlander/testerbot?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## Purpose

During development, there isn't enough time to write tests, so our only option is manual testing. We don't need a reminder of how inefficient, time-consuming, error-prone and boring that can get. When we get around to writing test-automations, we spend a lot of time writing tests from scratch. However, most of the test-cases for testing web-applications can be automated and reused.

We created *Testerbot* to automatically test web-applications during the development process via [Puppeteer](https://github.com/GoogleChrome/puppeteer/) which talks to [Headless Google Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome).

The basic framework is ready and we have implemented a few test-cases, but we need help in adding more reusable test-cases.

Note: I started this project several months ago and built a SaaS product, but realized that an open-source test automation package will help catch issues quickly during development. I recently stumbled upon https://frontendchecklist.io/ and created github issues to automate as many of those tests as possible into *Testerbot*.

## Install

```
npm i testerbot -g
```


[![NPM](https://nodei.co/npm/testerbot.png)](https://npmjs.org/package/testerbot)

## Quick Start

```
# Without any arguments the url defaults to http://localhost:3000
testerbot 
```

```
# Specify a url via the *--url* argument
testerbot --url http://localhost:5000
```

```
# Specify multiple comma seoparated urls via the *--urls* argument
testerbot --urls http://localhost:5000,http://localhost:5000/toc.html
```

Here is what the output looks like:

<img width="1005" alt="screenshot 2018-01-01 16 18 21" src="https://user-images.githubusercontent.com/749084/34472122-6e273c1e-ef0f-11e7-9d83-c2361199ad4a.png">



## Command Line Options

```
  Usage: testerbot [options]


  Options:

    -c, --config <path>  Specify Testerbot Config file
    -d, --dash           Display results in dashboard
    -n, --no-verbose     Hide verbose output (default: true)
    -s, --silent         Hide console output from tests
    -u, --url <url>      Url to run tests against
    -U, --urls <urls>    Url to run tests against
    -v, --version        Output the version number
    -h, --help           output usage information
```


### Configuration File

For better configuration control, you can run *Testerbot* by providing a config file which allows you to skip or run specific tests.

1. By default, Testerbot looks for *testerbot.config.js* in your project root:

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

2. You can also specify a path to the config file via:

```
testerbot --config ./config/testerbot.config.js
```


# Basic Features

- A comprehensive set of pre-defined test cases
- Support for multiple URL's in a test run
- Ability to skip tests or run only specific tests
- Integrated dashboard
- Platform and language agnostic
- Ability to run in CI build process


# Todo

- [ ] Authentication

- [ ] Custom Scenarios (workflows)

- [ ] Support for filtering and skipping tests by Tags

- [ ] Custom Reporter

- [X] Automatic Crawling

- [ ] Filling Forms


# Contribution

This is a work-in-progress and we would like your help. Please consider contributing to this project on one of the following:

- Framework Improvements

- Dashboard Improvements

- [Test Cases](https://github.com/theoutlander/testerbot/issues?q=is%3Aissue+is%3Aopen+label%3A%22Test+Case%22)

- [Provide User Feedack / Bug Reports](https://github.com/theoutlander/testerbot/issues/new)


# License

MIT License

# FAQ

Why does puppeteer installation fail sometimes with an EACCES error?

This is an npm permissions related issue. 
Try installing the package with:
 ```
 npm i -g testerbot@latest --unsafe-perm
 ```
