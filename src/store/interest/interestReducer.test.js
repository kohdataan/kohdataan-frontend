import interestReducer from './interestReducer'
import * as types from '../../contants/actionTypes'

describe('interest reducer', () => {
  it('should return the initial state', () => {
    expect(interestReducer(undefined, {})).toEqual({})
  })

  it('should handle GET_INTERESTS', () => {
    expect(
      interestReducer(
        {},
        {
          type: types.GET_INTERESTS,
          interests: { success: true, results: [1, 2, 3] },
        }
      )
    ).toEqual({ success: true, results: [1, 2, 3] })
  })
})
