import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../client/App'
import axios from 'axios'
jest.mock('axios')

describe.only('React testing', () => {
  let app

  beforeAll(() => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { Price: 53 } })
    )

    Enzyme.configure({ adapter: new Adapter() })
    app = new shallow(<App />)
  })

  it('we will see', () => {
    console.log(app.state())
  })
})
