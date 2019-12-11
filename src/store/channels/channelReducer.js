import * as types from '../../contants/actionTypes'

const defaultState = {
  loading: false,
}

export default function channels(state = defaultState, action) {
  switch (action.type) {
    case types.GET_CHANNEL_INVITATIONS: {
      return { ...state, ...action.channelInvitations }
    }
    case types.GET_CHANNEL_INVITATION_MEMBERS: {
      return {
        ...state,
        members: { ...state.members, [action.channelId]: action.members },
      }
    }
    case types.START_INVITATION_FETCHING:
      return {
        ...state,
        loading: true,
      }
    case types.INVITATION_FETCHING_READY: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}
