module.exports = [{
  url:
    'http://localhost:8080',

  tests: {
    // Test name(s) go here
    skip: [
      'Junk Test Name',
      'Open Graph2',
      'X-UA-Compatible12'
    ],

    // Test name(s) go here
    filter: [

    ]
  }
}]


//
// module.exports = {
//   urls: [
//     'http://localhost:5000'
//   ],
//
//   // Test name(s) go here
//   skipTests: [
//     'Junk Test Name',
//     'Open Graph',
//     'X-UA-Compatible'
//   ],
//
//   // Test name(s) go here
//   onlyTest: [
//   ],
//
//   dir: './src/tests'
// }
