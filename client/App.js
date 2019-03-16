import React, { Component } from 'react'
import axios from 'axios'
import { HashRouter, Route } from 'react-router-dom'
import Navbar from './Navbar'

class App extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
    this.deleteProduct = this.deleteProduct.bind(this)
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
    return axios
      .post('/api/products', newProduct)
      .then(() => this.loadProducts())
  }

  render() {
    console.log(this.state.products)
    return (
      <div>
        <h1>Acme Products</h1>
        <HashRouter>
          <Route render={({ location }) => <Navbar location={location} />} />
          <Route exact path="/" render={() => <h2>Welcome!!</h2>} />
          <Route exact path="/products" />
          <Route path="/products/sales" />
          <Route path="/products/create" />
        </HashRouter>
      </div>
    )
  }
}

export default App
