import React, { Component } from 'react'
import UserFormTips from './UserFormTips'

class CreateProductForm extends Component {
  constructor() {
    super()
    this.state = {
      Name: '',
      Price: '',
      DiscountPercentage: '',
      Availability: 'instock',
      error: '',
      textTips: {
        Name: 'Field is required',
        Price: 'Field is required',
        DiscountPercentage:
          'Must be non-decimal number between 0 and 100. Value will be 0 if not put in.'
      },
      nameFieldHasBeenClicked: false,
      priceFieldHasBeenClicked: false,
      discountPercentageAllowed: true
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.generateFieldTextTip = UserFormTips.generateFieldTextTip.bind(this)
    this.updateNameTextTip = UserFormTips.updateNameTextTip.bind(this)
    this.updatePriceTextTip = UserFormTips.updatePriceTextTip.bind(this)
  }

  componentDidMount() {
    document.querySelector('#name-input').addEventListener('focusout', () => {
      this.updateStateFieldHasBeenClicked('name')
    })

    document.querySelector('#price-input').addEventListener('focusout', () => {
      this.updateStateFieldHasBeenClicked('price')
    })
  }

  componentWillUnmount() {
    document
      .querySelector('#name-input')
      .removeEventListener('focusout', () => {
        this.updateStateFieldHasBeenClicked('name')
      })

    document
      .querySelector('#price-input')
      .removeEventListener('focusout', () => {
        this.updateStateFieldHasBeenClicked('price')
      })
  }

  updateStateFieldHasBeenClicked(productProperty) {
    this.setState(curState => {
      curState[`${productProperty}FieldHasBeenClicked`] = true
      return curState
    })
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value })
    if (target.name === 'DiscountPercentage') {
      this.setState({
        discountPercentageAllowed:
          /^([0-9]{1,2}|100)$/.test(target.value) || target.value === ''
      })
    } else if (target.name === 'Name') {
      this.updateNameTextTip(target.value)
    } else if (target.name === 'Price') {
      this.updatePriceTextTip(target.value)
    }
  }

  onSubmit(event) {
    const { history } = this.props
    event.preventDefault()
    return this.props
      .onSubmit(this.state)
      .then(() =>
        history.push(
          `/products${this.state.DiscountPercentage > 0 ? '/sales' : ''}`
        )
      )
      .catch(error => {
        this.setState({ error: error.message })
      })
  }

  createNameOrPriceField(fieldAsText, fieldValue) {
    const fieldHasBeenClickedState = this.state[
      `${fieldAsText.toLowerCase()}FieldHasBeenClicked`
    ]
    const makeBorderRed =
      (this.state.textTips[fieldAsText] !== '' && fieldHasBeenClickedState) ||
      !['', 'Field is required'].includes(this.state.textTips[fieldAsText])
    return (
      <div className="form-group">
        <label htmlFor={fieldAsText}>{fieldAsText}</label>
        <input
          id={`${fieldAsText.toLowerCase()}-input`}
          type="text"
          className={`form-control ${makeBorderRed ? 'red-border' : ''}`}
          name={fieldAsText}
          value={fieldValue}
          onChange={this.onChange}
        />
        {this.generateFieldTextTip(fieldAsText)}
      </div>
    )
  }

  render() {
    const {
      Name,
      Price,
      DiscountPercentage,
      Availability,
      discountPercentageAllowed,
      textTips,
      error
    } = this.state
    const canNotSubmit =
      textTips.Name !== '' ||
      textTips.Price !== '' ||
      !this.state.discountPercentageAllowed
    return (
      <form onSubmit={this.onSubmit}>
        {this.createNameOrPriceField('Name', Name)}
        {this.createNameOrPriceField('Price', Price)}
        <div className="form-group">
          <label htmlFor="DiscountPercentage">Discount Percentage</label>
          <input
            type="text"
            className={`form-control ${
              !discountPercentageAllowed ? 'red-border' : ''
            }`}
            name="DiscountPercentage"
            value={DiscountPercentage}
            onChange={this.onChange}
          />
          {this.generateFieldTextTip('DiscountPercentage')}
        </div>
        <div className="form-group">
          <label htmlFor="Availability">Availability</label>
          <select
            className="form-control"
            name="Availability"
            value={Availability}
            onChange={this.onChange}
          >
            <option>instock</option>
            <option>backordered</option>
            <option>discontinued</option>
          </select>
        </div>

        {error !== '' && (
          <div className="alert alert-danger" role="alert">
            A network error has occured
          </div>
        )}

        <button
          type="submit"
          className={`btn btn-primary ${canNotSubmit ? 'disabled' : ''}`}
          disabled={canNotSubmit}
        >
          Submit
        </button>
      </form>
    )
  }
}

export default CreateProductForm
