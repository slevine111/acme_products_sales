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

  updateStateFieldHasBeenClicked(productProperty) {
    this.setState(curState => {
      curState[`${productProperty}FieldHasBeenClicked`] = true
      return curState
    })
  }

  showFieldTextTip(field) {
    const textTips = {
      Name: {
        text: 'Field is required',
        keep: this.state.Name === ''
      },
      Price: {
        text: 'Field is required',
        keep: this.state.Price === ''
      },
      DiscountPercentage: {
        text:
          'Must be non-decimal number between 0 and 100. Value will be 0 if not put in.',
        keep: true
      }
    }

    const useRedFont = {
      Name: this.state.Name === '' && this.state.nameFieldHasBeenClicked,
      Price: this.state.Price === '' && this.state.priceFieldHasBeenClicked,
      DiscountPercentage: !this.state.discountPercentageAllowed
    }

    return (
      <div>
        <small
          className={`help-text-size ${useRedFont[field] ? 'red-font' : ''}`}
        >
          {textTips[field].keep ? textTips[field].text : ''}
        </small>
      </div>
    )
  }

  onChange({ target }) {
    if (target.name === 'DiscountPercentage') {
      this.setState({
        discountPercentageAllowed:
          /^([0-9]{1,2}|100)$/.test(target.value) || target.value === ''
      })
    }
    this.setState({ [target.name]: target.value })
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
  }

  render() {
    //pattern="[0-9.]+"
    const {
      Name,
      Price,
      DiscountPercentage,
      Availability,
      nameFieldHasBeenClicked,
      priceFieldHasBeenClicked,
      discountPercentageAllowed
    } = this.state
    const canNotSubmit =
      [Name, Price, Availability].includes('') ||
      !this.state.discountPercentageAllowed
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="Name"> Name</label>
          <input
            id="name-input"
            type="text"
            className={`form-control ${
              Name === '' && nameFieldHasBeenClicked ? 'red-border' : ''
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
              Price === '' && priceFieldHasBeenClicked ? 'red-border' : ''
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
