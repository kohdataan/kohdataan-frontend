import React from 'react'
import { create } from 'react-test-renderer'
import Container from './index'

describe('Container', () => {
  test('it matches the snapshot', () => {
    const component = create(
      <Container className="test">
        <p>Test</p>
        <p>Test</p>
      </Container>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
