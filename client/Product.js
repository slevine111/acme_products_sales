import React from 'react'

const Product = ({ product, deleteProduct }) => {
  const { id, Name, Price, DiscountPrice, Availability } = product
  return (
    <ul>
      <li>{Name}</li>
      <li className={`${DiscountPrice < Price ? 'on-sale' : ''}`}>{Price}</li>
      {DiscountPrice < Price && <li>{DiscountPrice}</li>}
      <li>{Availability}</li>
      <button type="submit" onClick={() => deleteProduct(id)}>
        Delete Product
      </button>
    </ul>
  )
}

export default Product
