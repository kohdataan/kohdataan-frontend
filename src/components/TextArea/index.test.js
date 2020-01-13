import React from 'react'
import { create } from 'react-test-renderer'
import TextArea from './index'

describe('TextArea', () => {
  test('it matches the snapshot', () => {
    const component = create(
      <TextArea label="test" onChange={() => {}}>
        <p>test</p>
      </TextArea>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
