const { expect } = require('chai')
const syncAndSeed = require('../bin/seed')
const Product = require('../server/DataAccess/models/index')

describe('Product Model', () => {
  beforeEach(() => {
    return syncAndSeed()
  })

  it('it has Name, Price, DiscountPercentage, and Availability fields', () => {
    return Product.findByPk(1).then(product => {
      expect(product.Name).to.not.be.undefined
      expect(product.Price).to.not.be.undefined
      expect(product.DiscountPercentage).to.not.be.undefined
      expect(product.Availability).to.not.be.undefined
    })
  })

  describe('Name field', () => {
    it('it is required', () => {
      let error
      return Product.create({
        Price: 2,
        Availability: 'instock'
      })
        .then(() => {
          error = new Error('error has not occured')
        })
        .catch(err => {
          error = err
        })
        .then(() =>
          expect(error.message).to.equal(
            'notNull Violation: product.Name cannot be null'
          )
        )
    })
    it('the values must be unique', () => {
      let error
      return Product.create({
        Name: 'Foo',
        Price: 2,
        Availability: 'instock'
      })
        .then(() => {
          error = new Error('error has not occured')
        })
        .catch(err => {
          error = err
        })
        .then(() => expect(error.message).to.equal('Validation error'))
    })
  })
  describe('Price field', () => {
    it('it is required', () => {
      let error
      return Product.create({
        Name: 'Bar',
        Availability: 'instock'
      })
        .then(() => {
          error = new Error('error has not occured')
        })
        .catch(err => {
          error = err
        })
        .then(() =>
          expect(error.message).to.equal(
            'notNull Violation: product.Price cannot be null'
          )
        )
    })
    it('it has a custom get field that rounds any price to two decimal points', () => {
      return Promise.all([
        Product.create({
          Name: 'Bar',
          Price: 120.567,
          Availability: 'instock'
        }),
        Product.create({
          Name: 'Bazz',
          Price: 120.562,
          Availability: 'instock'
        })
      ]).then(([bar, bazz]) => {
        expect(bar.Price).to.equal(120.57)
        expect(bazz.Price).to.equal(120.56)
      })
    })
  })
  describe('Percentage field', () => {
    it('it has a default value of 0 if no value is given', () => {
      return Product.create({
        Name: 'Bar',
        Price: 100,
        Availability: 'instock'
      }).then(product => expect(product.DiscountPercentage).to.equal(0))
    })
    it('it has a maximum value of 100', () => {
      let error
      return Product.create({
        Name: 'Bar',
        Price: 100,
        DiscountPercentage: 120,
        Availability: 'instock'
      })
        .then(() => {
          error = new Error('error has not occured')
        })
        .catch(err => {
          error = err
        })
        .then(() =>
          expect(error.message).to.equal(
            'Validation error: Validation max on DiscountPercentage failed'
          )
        )
    })
  })
  describe('Availability field', () => {
    it('it is required', () => {
      let error
      return Product.create({
        Name: 'Bar',
        Price: 120
      })
        .then(() => {
          error = new Error('error has not occured')
        })
        .catch(err => {
          error = err
        })
        .then(() =>
          expect(error.message).to.equal(
            'notNull Violation: product.Availability cannot be null'
          )
        )
    })
    it('it can only be a value in ["instock","backordered","discontinued"]', () => {
      let error
      return Product.create({
        Name: 'Bar',
        Price: 120,
        Availability: 'not allowed'
      })
        .then(() => {
          error = new Error('error has not occured')
        })
        .catch(err => {
          error = err
        })
        .then(() =>
          expect(error.message).to.equal(
            'invalid input value for enum "enum_products_Availability": "not allowed"'
          )
        )
    })
  })
  describe('DiscountPrice field', () => {
    it("it has a value of the rounded Price * (1-DiscountPercentage*.01), with its' values also rounded to 2 decimal places", () => {
      return Product.create({
        Name: 'Bar',
        Price: 10.289,
        DiscountPercentage: 60,
        Availability: 'instock'
      }).then(product => expect(product.DiscountPrice).to.equal(4.12))
    })
  })
})
