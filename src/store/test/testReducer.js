import * as types from '../../contants/actionTypes'

export default function test(state = {}, action) {
  switch (action.type) {
    case types.TEST:
      return { ...state, test: action.test }
    default:
      return state
  }
}
