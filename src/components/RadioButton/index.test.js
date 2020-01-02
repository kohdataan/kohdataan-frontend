import React from 'react'
import { create } from 'react-test-renderer'
import RadioButton from './index'

describe('Button container', () => {
  test('it matches the snapshot', () => {
    const component = create(
      <RadioButton label="test" name="test" onChange={() => {}} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
