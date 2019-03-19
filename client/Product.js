import React from 'react'

const formatPriceToShow = price => {
  return !/\./.test(price)
    ? `${price}.00`
    : /\.[0-9]$/.test(price)
    ? `${price}0`
    : price
}

const Product = ({ product, deleteProduct }) => {
  const { id, Name, Price, DiscountPrice, Availability } = product
  return (
    <div className="list-group-item">
      <div className="product-detail">{Name}</div>
      <div
        className={`product-detail ${DiscountPrice < Price ? 'on-sale' : ''}`}
      >
        {formatPriceToShow(Price)}
      </div>
      {DiscountPrice < Price && (
        <div className="product-detail badge badge-success">
          {formatPriceToShow(DiscountPrice)}
        </div>
      )}
      <div className="product-detail">
        <div
          className={`badge badge-${
            Availability === 'instock'
              ? 'success'
              : Availability === 'backordered'
              ? 'warning'
              : 'danger'
          }`}
        >
          {Availability}
        </div>
      </div>
      <button
        className="btn btn-danger btn-sm"
        type="submit"
        onClick={() => deleteProduct(id)}
      >
        Delete
      </button>
    </div>
  )
}

export default Product
