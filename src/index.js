let jest = require("jest");

jest.runCLI({ onlyChanged: true }, __dirname, function(success) {});
