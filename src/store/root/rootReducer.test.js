import rootReducer from './rootReducer'
import * as types from '../../contants/actionTypes'

describe('root reducer', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual({ root: true, coordinates: {} })
  })

  it('should handle ROOT_LOADING_READY', () => {
    expect(
      rootReducer(
        { root: true },
        {
          type: types.ROOT_LOADING_READY,
        }
      )
    ).toEqual({ root: false })
  })

  it('should handle START_ROOT_LOADING', () => {
    expect(
      rootReducer(
        { root: false },
        {
          type: types.START_ROOT_LOADING,
        }
      )
    ).toEqual({ root: true })
  })
})
