import * as types from '../../contants/actionTypes'
import * as API from '../../api/channels'

const getChannelInvitationsAction = () => {
  const token = localStorage.getItem('authToken')
  return async dispatch => {
    try {
      const data = await API.getChannelInvitations(token)
      dispatch({
        type: types.GET_CHANNEL_INVITATIONS,
        channelInvitations: data,
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

export default getChannelInvitationsAction
