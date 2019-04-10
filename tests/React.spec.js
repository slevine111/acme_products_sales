import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { App } from '../client/App'
import axios from 'axios'
jest.mock('axios')

describe.only('App component', () => {
  let app

  beforeAll(() => {
    axios.get.mockResolvedValueOnce({
      data: {
        Name: 'chair',
        Price: 100.05,
        DiscountPercentage: 10,
        Availability: 'instock'
      }
    })

    Enzyme.configure({ adapter: new Adapter() })
    app = new shallow(<App />)
  })

  it("it has a product property on its' state", () => {
    expect(app.state().products).toBeDefined()
  })
})
