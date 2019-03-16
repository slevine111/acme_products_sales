import React, { Component } from 'react'
import axios from 'axios'

class CreateProductForm extends Component {
  constructor() {
    super()
    this.state = {
      Name: '',
      Price: 0.0,
      DiscountPercentage: 0,
      Availability: 'instock'
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange({ target }) {
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
    const { Name, Price, DiscountPercentage, Availability } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            className="form-control"
            name="Name"
            value={Name}
            onChange={event => this.onChange(event)}
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Price">Price</label>
          <input
            type="text"
            className="form-control"
            name="Price"
            value={Price}
            onChange={event => this.onChange(event)}
            placeholder="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="DiscountPercentage">Discount Percentage</label>
          <input
            type="text"
            className="form-control"
            name="DiscountPercentage"
            value={DiscountPercentage}
            onChange={event => this.onChange(event)}
            placeholder="0"
          />
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    )
  }
}

export default CreateProductForm
