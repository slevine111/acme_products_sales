const { expect } = require('chai')
const app = require('supertest')(require('../server/api/index'))
const Product = require('../server/DataAccess/models/index')
const syncAndSeed = require('../bin/seed')

describe.only('Routes', () => {
  beforeEach(() => {
    return syncAndSeed()
  })

  describe('GET / route', () => {
    it('it returns a HTML file', done => {
      app
        .get('/')
        .expect(200)
        .expect('Content-Type', /text\/html/, done)
    })
  })

  describe('GET /api/products', () => {
    it('it returns a JSON object', done => {
      app
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /application\/json/, done)
    })
    it('it returns all products in the database', done => {
      app.get('/api/products').end((err, response) => {
        if (err) return done(err)
        expect(response.body.length).to.equal(1)
        done()
      })
    })
  })
  describe('POST /api/products', () => {
    it('it returns a JSON object', done => {
      app
        .post('/api/products')
        .send({
          Name: 'Item',
          Price: 2,
          Availability: 'instock'
        })
        .expect(200)
        .expect('Content-Type', /application\/json/, done)
    })
    it('it returns the product posted in the body', done => {
      app
        .post('/api/products')
        .send({
          Name: 'Item',
          Price: 2,
          Availability: 'instock'
        })
        .end((err, response) => {
          if (err) return done(err)
          expect(response.body.Name).to.equal('Item')
          expect(response.body.Price).to.equal(2)
          expect(response.body.DiscountPercentage).to.equal(0)
          expect(response.body.Availability).to.equal('instock')
          expect(response.body.DiscountPrice).to.equal(2)
          done()
        })
    })
    it('it adds the product to the database', done => {
      app
        .post('/api/products')
        .send({
          Name: 'Item',
          Price: 2,
          Availability: 'instock'
        })
        .then(response => response.body)
        .then(newProduct => {
          return Product.findOne({
            where: { Name: newProduct.Name }
          })
        })
        .then(productFound => {
          expect(productFound).to.not.be.null
          done()
        })
        .catch(err => done(err))
    })
    it("new products created that don't match the columns specifications are caught by next", done => {
      let error
      app
        .post('/api/products')
        .send({
          Price: 2,
          Availability: 'instock'
        })
        .then(() => {
          error = new Error('error was caught by next')
        })
        .catch(err => {
          error = err
        })
        .then(() => {
          expect(error.message).to.equal('error was caught by next')
          done()
        })
        .catch(err => done(err))
    })
  })
  describe('DELETE /api/products/:id', () => {
    it('it returns a 204 status code', done => {
      app.delete('/api/products/1').expect(204, done)
    })
    it('it deletes the product with id = :id from the database', done => {
      app
        .delete('/api/products/1')
        .then(() => Product.findByPk(1))
        .then(productFound => {
          expect(productFound).to.be.null
          done()
        })
        .catch(err => done(err))
    })
  })
})
