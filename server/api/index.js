const express = require('express')
const app = express()
const volleyball = require('volleyball')
const path = require('path')
const Product = require('../DataAccess/models/index')

module.exports = app

app.use(volleyball)
app.use(express.json())

app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'))
})

app.get('/api/products', (req, res, next) => {
  return Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

app.post('/api/products', (req, res, next) => {
  return Product.create(req.body)
    .then(newProduct => res.json(newProduct))
    .catch(next)
})

app.delete('/api/products/:id', (req, res, next) => {
  return Product.destroy({ where: { id: Number(req.params.id) } })
    .then(() => res.sendStatus(204))
    .catch(next)
})
