import React from 'react'
import { create } from 'react-test-renderer'
import BottomNavigation from './index'

describe('Bottom navigation', () => {
  test('it matches the snapshot', () => {
    const component = create(
      <BottomNavigation>
        <p>Navigation</p>
      </BottomNavigation>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
