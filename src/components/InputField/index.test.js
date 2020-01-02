import React from 'react'
import { create } from 'react-test-renderer'
import InputField from './index'

describe('Input field', () => {
  test('it matches the snapshot', () => {
    const component = create(<InputField label="test" onChange={() => {}} />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
