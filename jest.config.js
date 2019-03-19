const path = require('path')

module.exports = {
  collectCoverage: true,
  coverageDirectory: path.join(__dirname, 'TestCoverageReport'),
  coverageReporters: ['text', 'html'],
  verbose: true
}

/*
,
    "test": {
      "presets": [
        "react",
        [
          "env",
          {
            "targets": {
              "browsers": ["last 2 versions"],
              "node": "current"
            }
          }
        ]
      ],
      "test": ["jest"]
    }
  }*/
