import React, { Component } from 'react'

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
    this.updateStateFieldHasBeenClicked = this.updateStateFieldHasBeenClicked.bind(
      this
    )
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

  showFieldTextTip(field) {
    const {
      textTips,
      nameFieldHasBeenClicked,
      priceFieldHasBeenClicked,
      discountPercentageAllowed
    } = this.state

    const keep = field === 'DiscountPercentage' ? true : textTips[field] !== ''

    const useRedFont = {
      Name: textTips.Name !== '' && nameFieldHasBeenClicked,
      Price: textTips.Name !== '' && priceFieldHasBeenClicked,
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

  // eslint-disable-next-line complexity
  onChange({ target }) {
    this.setState({ [target.name]: target.value })
    if (target.name === 'DiscountPercentage') {
      this.setState({
        discountPercentageAllowed:
          /^([0-9]{1,2}|100)$/.test(target.value) || target.value === ''
      })
    } else if (target.name === 'Name') {
      const textTip =
        target.value === ''
          ? 'Field is required'
          : this.props.productNames.includes(target.value)
          ? 'Product has already been added. Add another product'
          : ''
      this.setState(curState => {
        curState.textTips.Name = textTip
        return curState
      })
    } else if (target.name === 'Price') {
      const textTip =
        target.value === ''
          ? 'Field is required'
          : !/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(target.value)
          ? 'Value does not match currency format (Only two decimal points at most allowed)'
          : ''
      this.setState(curState => {
        curState.textTips.Price = textTip
        return curState
      })
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

  // eslint-disable-next-line complexity
  render() {
    const {
      Name,
      Price,
      DiscountPercentage,
      Availability,
      nameFieldHasBeenClicked,
      priceFieldHasBeenClicked,
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
        <div className="form-group">
          <label htmlFor="Name"> Name</label>
          <input
            id="name-input"
            type="text"
            className={`form-control ${
              textTips.Name !== '' && nameFieldHasBeenClicked
                ? 'red-border'
                : ''
            }`}
            name="Name"
            value={Name}
            onChange={event => this.onChange(event)}
          />
          {this.showFieldTextTip('Name')}
        </div>
        <div className="form-group">
          <label htmlFor="Price">Price</label>
          <input
            id="price-input"
            type="text"
            className={`form-control ${
              textTips.Price !== '' && priceFieldHasBeenClicked
                ? 'red-border'
                : ''
            }`}
            name="Price"
            value={Price}
            onChange={event => this.onChange(event)}
          />
          {this.showFieldTextTip('Price')}
        </div>
        <div className="form-group">
          <label htmlFor="DiscountPercentage">Discount Percentage</label>
          <input
            type="text"
            className={`form-control ${
              !discountPercentageAllowed ? 'red-border' : ''
            }`}
            name="DiscountPercentage"
            value={DiscountPercentage}
            onChange={event => this.onChange(event)}
          />
          {this.showFieldTextTip('DiscountPercentage')}
        </div>
        <div className="form-group">
          <label htmlFor="Availability">Availability</label>
          <select
            className="form-control"
            name="Availability"
            value={Availability}
            onChange={event => this.onChange(event)}
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
