const connection = require('./connection')

function dbInit(force = false) {
  return connection.authenticate().then(() => connection.sync({ force }))
}

module.exports = dbInit
