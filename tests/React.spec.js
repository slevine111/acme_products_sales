import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../client/App'

describe('React testing', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() })
  })

  it('we will see', () => {})
})
