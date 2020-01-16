import * as types from '../../contants/actionTypes'

const defaultState = {
  loading: false,
}

export default function friends(state = defaultState, action) {
  switch (action.type) {
    case types.START_FRIENDS_FETCHING:
      return {
        ...state,
        loading: true,
      }
    case types.FRIENDS_FETCHING_READY: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}
