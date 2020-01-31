import * as types from '../../contants/actionTypes'

const defaultState = {
  root: true,
  coordinates: {},
}

export default function loading(state = defaultState, action) {
  switch (action.type) {
    case types.ROOT_LOADING_READY:
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
    case types.SET_COORDINATES: {
      return {
        ...state,
        coordinates: {
          ...state.coordinates,
          [action.component]: action.coordinates,
        },
      }
    }
    default:
      return state
  }
}
