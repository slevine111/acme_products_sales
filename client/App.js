import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { HashRouter, Route } from 'react-router-dom'
import Navbar from './Navbar'
import ProductList from './ProductList'
import CreateProductForm from './CreateProductForm'

class App extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
    this.deleteProduct = this.deleteProduct.bind(this)
    this.loadProducts = this.loadProducts.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    return this.loadProducts()
  }

  loadProducts() {
    return axios
      .get('/api/products')
      .then(({ data }) => this.setState({ products: data }))
      .catch(err => console.error(err))
  }

  deleteProduct(id) {
    return axios.delete(`/api/products/${id}`).then(() => this.loadProducts())
  }

  onSubmit(newProduct) {
    newProduct.DiscountPercentage = newProduct.DiscountPercentage || 0
    newProduct.Name = newProduct.Name.toLowerCase()
      .split(' ')
      .map(word => word.replace(word[0], word[0].toUpperCase()))
      .join(' ')
    return axios
      .post('/api/products', newProduct)
      .then(() => this.loadProducts())
  }

  render() {
    const products = this.state.products
    return (
      <div className="container">
        <h1>Acme Products</h1>
        <HashRouter>
          <Fragment>
            <Route
              render={({ location }) => (
                <Navbar location={location} products={products} />
              )}
            />
            <Route exact path="/" render={() => <h2>Welcome!!</h2>} />
            <Route
              exact
              path="/products"
              render={() => (
                <ProductList
                  products={products}
                  deleteProduct={this.deleteProduct}
                />
              )}
            />
            <Route
              path="/products/sales"
              render={() => (
                <ProductList
                  products={products.filter(
                    product => product.DiscountPrice < product.Price
                  )}
                  deleteProduct={this.deleteProduct}
                />
              )}
            />
            <Route
              path="/products/create"
              render={({ history }) => (
                <CreateProductForm
                  onSubmit={this.onSubmit}
                  history={history}
                  productNames={products.map(product =>
                    product.Name.toLowerCase()
                  )}
                />
              )}
            />
          </Fragment>
        </HashRouter>
      </div>
    )
  }
}

export default App
