import React from 'react'
import Product from './Product'

const ProductList = ({ products, deleteProduct }) => {
  return (
    <ul className="list-group">
      {products.map(product => (
        <Product
          key={product.id}
          product={product}
          deleteProduct={deleteProduct}
        />
      ))}
    </ul>
  )
}

export default ProductList
