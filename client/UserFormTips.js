import React from 'react'

class UserFormTips {
  static generateFieldTextTip(field) {
    const {
      textTips,
      nameFieldHasBeenClicked,
      priceFieldHasBeenClicked,
      discountPercentageAllowed
    } = this.state

    const keep = field === 'DiscountPercentage' ? true : textTips[field] !== ''

    const useRedFont = {
      Name:
        (textTips.Name !== '' && nameFieldHasBeenClicked) ||
        textTips.Name ===
          'Product has already been added (name is NOT case sensitive). Add another product',
      Price:
        (textTips.Price !== '' && priceFieldHasBeenClicked) ||
        textTips.Price ===
          'Value does not match currency format (Only two decimal points at most allowed)',
      DiscountPercentage: !discountPercentageAllowed
    }

    return (
      <div>
        <small
          className={`help-text-size ${useRedFont[field] ? 'red-font' : ''}`}
        >
          {keep ? textTips[field] : ''}
        </small>
      </div>
    )
  }

  static updateNameTextTip(currentNameValue) {
    const textTip =
      currentNameValue === ''
        ? 'Field is required'
        : this.props.productNames.includes(currentNameValue.toLowerCase())
        ? 'Product has already been added (name is NOT case sensitive). Add another product'
        : ''
    return this.setState(curState => {
      curState.textTips.Name = textTip
      return curState
    })
  }

  static updatePriceTextTip(currentPriceValue) {
    const textTip =
      currentPriceValue === ''
        ? 'Field is required'
        : !/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(currentPriceValue)
        ? 'Value does not match currency format (Only two decimal points at most allowed)'
        : ''
    return this.setState(curState => {
      curState.textTips.Price = textTip
      return curState
    })
  }
}

export default UserFormTips
