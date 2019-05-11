import * as types from '../../contants/actionTypes'

export default function user(state = {}, action) {
  switch (action.type) {
    case types.ADD_USER_TO_STATE: {
      return { ...action.user }
    }
    case types.UPDATE_USER: {
      return { ...state, ...action.user }
    }
    default:
      return state
  }
}
