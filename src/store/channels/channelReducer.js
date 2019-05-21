import * as types from '../../contants/actionTypes'

export default function channels(state = {}, action) {
  switch (action.type) {
    case types.GET_CHANNEL_INVITATIONS: {
      return { ...action.channelInvitations }
    }
    default:
      return state
  }
}
