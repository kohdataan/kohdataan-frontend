import * as types from '../../contants/actionTypes'
import * as API from '../../api/channels'

export const getMembersByChannelIdAction = channelId => {
  return async dispatch => {
    try {
      const res = await API.getChannelInvitationMembers(
        localStorage.getItem('authToken'),
        channelId
      )
      await dispatch({
        type: types.GET_CHANNEL_INVITATION_MEMBERS,
        members: res.userDetails,
        channelId,
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

export const getChannelInvitationsAction = () => {
  const token = localStorage.getItem('authToken')
  return async dispatch => {
    dispatch({ type: types.START_INVITATION_FETCHING })
    try {
      const data = await API.getChannelInvitations(token)
      dispatch({
        type: types.GET_CHANNEL_INVITATIONS,
        channelInvitations: data,
      })
      const promises = []
      if (data && data.found) {
        data.found.forEach(channel => {
          promises.push(dispatch(getMembersByChannelIdAction(channel.id)))
        })
      }
      await Promise.all(promises)
      dispatch({ type: types.INVITATION_FETCHING_READY })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}
