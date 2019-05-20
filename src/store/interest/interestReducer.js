import * as types from '../../contants/actionTypes'

export default function interests(state = {}, action) {
  switch (action.type) {
    case types.GET_INTERESTS: {
      return { ...action.interests }
    }
    default:
      return state
  }
}
