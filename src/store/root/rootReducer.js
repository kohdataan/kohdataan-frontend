import * as types from '../../contants/actionTypes'

const defaultState = {
  root: true,
}

export default function loading(state = defaultState, action) {
  switch (action.type) {
    case types.ROOT_LOADING_COMPLETED:
      return {
        ...state,
        root: false,
      }
    case types.START_ROOT_LOADING: {
      return {
        ...state,
        root: true,
      }
    }
    default:
      return state
  }
}
