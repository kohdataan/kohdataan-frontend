import React from 'react'
import { create } from 'react-test-renderer'
import ShadowBox from './index'

describe('Shadowbox', () => {
  test('it matches the snapshot', () => {
    const component = create(
      <ShadowBox>
        <p>Test</p>
      </ShadowBox>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
