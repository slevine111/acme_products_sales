const dbInit = require('../server/DataAccess/index')
const Product = require('../server/DataAccess/models/index')

const syncAndSeed = () => {
  return dbInit(true)
    .then(() => {
      return Product.create({
        Name: 'Foo',
        Price: 100.056,
        Availability: 'instock'
      })
    })
    .then(() => console.log('data successfully seeded'))
    .catch(err => {
      console.log('data not seeded. error below:')
      console.log(err)
    })
}

module.exports = syncAndSeed
