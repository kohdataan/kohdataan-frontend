import * as types from '../../contants/actionTypes'

export default function user(state = {}, action) {
  switch (action.type) {
    case types.ADD_USER_TO_STATE: {
      return { ...action.user }
    }
    case types.UPDATE_USER: {
      return { ...state, ...action.user }
    }
    case types.SIGNUP_SIGNIN_FAILURE: {
      return { ...state, errorMessage: action.payload.message }
    }
    case types.GET_USER_FAILURE: {
      return { ...state, errorMessage: action.payload.message }
    }
    case types.UPDATE_USER_FAILURE: {
      return { ...state, errorMessage: action.payload.message }
    }
    default:
      return state
  }
}
