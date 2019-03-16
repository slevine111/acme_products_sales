const express = require('express')
const app = express()
const volleyball = require('volleyball')
const path = require('path')

module.exports = app

app.use(volleyball)

app.get('/', (req, res, next) => {
  res.send('wired up')
})
