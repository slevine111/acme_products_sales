const connection = require('../connection')
const Sequelize = require('sequelize')

const Product = connection.define('product', {
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  Price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    get() {
      return Number(Number(this.getDataValue('Price')).toFixed(2))
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
    type: Sequelize.ENUM('instock', 'backordered', 'discontinued'),
    allowNull: false
  },
  DiscountPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      return Number(
        Number(
          this.get('Price') *
            (1 - this.getDataValue('DiscountPercentage') * 0.01)
        ).toFixed(2)
      )
    }
  }
})

module.exports = Product
