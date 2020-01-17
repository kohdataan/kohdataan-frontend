import friendsReducer from './friendsReducer'
import * as types from '../../contants/actionTypes'

describe('friends reducer', () => {
  it('should return the initial state', () => {
    expect(friendsReducer(undefined, {})).toEqual({ loading: false })
  })

  it('should handle START_FRIENDS_FETCHING', () => {
    expect(
      friendsReducer(undefined, { type: types.START_FRIENDS_FETCHING })
    ).toEqual({ loading: true })
  })

  it('should handle FRIENDS_FETCHING_READY', () => {
    expect(
      friendsReducer({ loading: true }, { type: types.FRIENDS_FETCHING_READY })
    ).toEqual({ loading: false })
  })
})
