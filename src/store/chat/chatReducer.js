import * as types from '../../contants/actionTypes'

const initialState = {
  unreadCount: 0,
}

export default function channels(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_UNREAD_COUNT: {
      const newState = { ...state, unreadCount: action.data }
      return newState
    }
    case types.GET_UNREAD_COUNT: {
      return state.unreadCount
    }
    default:
      return state
  }
}

export function updateUnreadCount(unreadCount) {
  return {
    type: types.UPDATE_UNREAD_COUNT,
    data: unreadCount,
  }
}
