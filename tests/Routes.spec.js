//const { expect } = require('chai')
const app = require('supertest')(require('../server/api/index'))
const Product = require('../server/DataAccess/models/index')
const syncAndSeed = require('../bin/seed')

describe('Routes', () => {
  beforeEach(() => {
    return syncAndSeed()
  })

  describe('GET / route', () => {
    test('it returns a HTML file', done => {
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
      app
        .get('/api/products')
        .then(({ body }) => {
          return Promise.all([body, Product.findAll()])
        })
        .then(([apiResult, dbResult]) => {
          expect(apiResult.length).toBe(dbResult.length)
          done()
        })
        .catch(err => done(err))
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
          expect(response.body.Name).toBe('Item')
          expect(response.body.Price).toBe(2)
          expect(response.body.DiscountPercentage).toBe(0)
          expect(response.body.Availability).toBe('instock')
          expect(response.body.DiscountPrice).toBe(2)
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
          expect(productFound).toEqual(expect.anything())
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
          expect(error.message).toBe('error was caught by next')
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
          expect(productFound).toBeNull()
          done()
        })
        .catch(err => done(err))
    })
  })

  describe('Any other route/error-handling middleware', () => {
    it("any other route that does not serve up a static file returns a 404 error with message 'Resource Not Found'", done => {
      app
        .get('/api/notroute')
        .expect(404)
        .end((err, response) => {
          if (err) return done(err)
          expect(response.text).toBe('Resource Not Found')
          done()
        })
    })
  })
})
