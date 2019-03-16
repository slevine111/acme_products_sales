const dbInit = require('../server/DataAccess/index')
const Product = require('../server/DataAccess/models/index')

const syncAndSeed = () => {
  return dbInit(true)
    .then(() => {
      return Promise.all([
        Product.create({
          Name: 'Foo',
          Price: 100.056,
          Availability: 'instock'
        }),
        Product.create({
          Name: 'Baz',
          Price: 30,
          DiscountPercentage: 90,
          Availability: 'backordered'
        })
      ])
    })
    .then(() => console.log('data successfully seeded'))
    .catch(err => {
      console.log('data not seeded. error below:')
      console.log(err)
    })
}

module.exports = syncAndSeed
