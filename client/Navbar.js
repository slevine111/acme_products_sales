import React from 'react'
import { HashRouter, Link } from 'react-router-dom'

const Navbar = ({ location, products }) => {
  const path = location.pathname
  return (
    <HashRouter>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link to="/" className={`nav-link ${path === '/' ? 'active' : ''}`}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/products"
            className={`nav-link ${path === '/products' ? 'active' : ''}`}
          >
            Products{' '}
            <span className="badge badge-primary">{products.length}</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/products/sales"
            className={`nav-link ${path === '/products/sales' ? 'active' : ''}`}
          >
            Sale Products{' '}
            <span className="badge badge-primary">
              {
                products.filter(product => product.DiscountPercentage > 0)
                  .length
              }
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/products/create"
            className={`nav-link ${
              path === '/products/create' ? 'active' : ''
            }`}
          >
            Add Product
          </Link>
        </li>
      </ul>
    </HashRouter>
  )
}

export default Navbar
