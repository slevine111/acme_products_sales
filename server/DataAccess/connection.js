const Sequelize = require('sequelize')

const connection = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_products_sales',
  {
    logging: false
  }
)

module.exports = connection
