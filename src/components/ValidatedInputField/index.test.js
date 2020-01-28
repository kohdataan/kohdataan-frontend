import React from 'react'
import { create } from 'react-test-renderer'
import ValidatedInputField from './index'

describe('Button container', () => {
  test('it matches the snapshot', () => {
    const component = create(
      <ValidatedInputField label="test" name="test" showPlaceholder />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
