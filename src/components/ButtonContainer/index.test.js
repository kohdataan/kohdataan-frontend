import React from 'react'
import { create } from 'react-test-renderer'
import ButtonContainer from './index'

describe('Button container', () => {
  test('it matches the snapshot', () => {
    const component = create(
      <ButtonContainer onClick={() => {}} className="test">
        Test
      </ButtonContainer>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
