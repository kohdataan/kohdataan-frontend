import * as types from '../../contants/actionTypes'
import userReducer from './userReducer'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual({})
  })

  it('should handle ADD_USER_TO_STATE', () => {
    expect(
      userReducer(undefined, { type: types.ADD_USER_TO_STATE, user: { id: 1 } })
    ).toEqual({ id: 1 })
  })

  it('should handle UPDATE_USER', () => {
    expect(
      userReducer(
        { id: 1, nickname: 'prii' },
        { type: types.UPDATE_USER, user: { id: 1, nickname: 'pröö' } }
      )
    ).toEqual({ id: 1, nickname: 'pröö' })
  })

  it('should handle SIGNUP_SIGNIN_FAILURE', () => {
    expect(
      userReducer(
        {},
        {
          type: types.SIGNUP_SIGNIN_FAILURE,
          payload: { message: 'something wrong' },
        }
      )
    ).toEqual({ errorMessage: 'something wrong' })
  })

  it('should handle GET_USER_FAILURE', () => {
    expect(
      userReducer(
        {},
        {
          type: types.GET_USER_FAILURE,
          payload: { message: 'something wrong' },
        }
      )
    ).toEqual({ errorMessage: 'something wrong' })
  })

  it('should handle UPDATE_USER_FAILURE', () => {
    expect(
      userReducer(
        {},
        {
          type: types.UPDATE_USER_FAILURE,
          payload: { message: 'something wrong' },
        }
      )
    ).toEqual({ errorMessage: 'something wrong' })
  })

  it('should handle USER_LOGIN_FAILURE', () => {
    expect(
      userReducer(
        {},
        {
          type: types.USER_LOGIN_FAILURE,
          payload: { message: 'something wrong' },
        }
      )
    ).toEqual({ errorMessage: 'something wrong' })
  })

  it('should handle GET_USER_INTERESTS', () => {
    expect(
      userReducer(
        { id: 1 },
        {
          type: types.GET_USER_INTERESTS,
          userInterests: { id: 1, interests: [1, 2, 3] },
        }
      )
    ).toEqual({ id: 1, interests: [1, 2, 3] })
  })
})
