import React, { Component } from 'react'
import axios from 'axios'
import { HashRouter, Route } from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
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

  render() {
    console.log(this.state.products)
    return (
      <div>
        <h1>Acme Products</h1>
        <HashRouter>
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
