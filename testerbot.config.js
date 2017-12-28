module.exports = {
  urls: [
    'http://localhost:5000'
  ],

  dir: './src/tests'
}

//
// module.exports = {
//
//   root: "localhost:5000",
//
//   auth: {
//     url: "localhost.com/login",
//     username: {
//       "asdasd": "val"
//     },
//     password: {
//       "pass_id": "@#$@#$@#$"
//     }
//   },
//
//
//
//
//
//
//
//
//
//
//   workflow: [
//     "root.com",
//     "root.com/login",
//     "root.com/asd"
//   ],
//
//   auto_crawl: true,
//
//
//
//
//   url: [
//     {
//       root: {
//         "http://localhost:5000": {
//           disable_tests: [
//             "favicon"
//           ]
//         }
//       },
//
//       login: {
//         "http://localhost:5000/login": {
//           actions: {
//             form_fill: {
//               "first-name": "TEST_NAME",
//               password: "pass",
//               submit: 'buttonid'
//             }
//           }
//         }
//       }
//     }
//   ]
// }