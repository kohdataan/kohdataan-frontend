import React from 'react'
import { create } from 'react-test-renderer'
import Checkbox from './index'

describe('Checkbox', () => {
  test('it matches the snapshot', () => {
    const component = create(
      <Checkbox label="test" name="test" onChange={() => {}} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
