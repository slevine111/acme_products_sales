const connection = require('../connection')
const Sequelize = require('sequelize')

const Product = connection.define('product', {
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  Price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    get() {
      return Math.round(this.getDataValue('Price'), 2)
    }
  },
  DiscountPercentage: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      max: 100
    }
  },
  Availability: {
    type: Sequelize.ENUM('instock', 'backordered', 'discontinued')
  },
  DiscountPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      return Math.round(
        this.get('Price') * this.getDataValue('DiscountPercentage'),
        2
      )
    }
  }
})

module.exports = Product
