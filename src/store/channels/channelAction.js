import { fetchMyChannelsAndMembers } from 'mattermost-redux/actions/channels'
import { getProfiles } from 'mattermost-redux/actions/users'
import dayjs from 'dayjs'
import * as types from '../../contants/actionTypes'
import * as API from '../../api/channels/channels'
import { updateUser } from '../user/userAction'
import { initUser, initTeam } from '../root/index'

export const startGroupPageFetching = () => {
  return async (dispatch) => {
    dispatch({ type: types.START_INVITATION_FETCHING })
  }
}

export const groupPageFetchingReady = () => {
  return async (dispatch) => {
    dispatch({ type: types.INVITATION_FETCHING_READY })
  }
}

export const getMembersByChannelIdAction = (channelId) => {
  return async (dispatch) => {
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

export const updateChannelInvitationsTimestamp = () => {
  return async (dispatch) => {
    await dispatch(updateUser({ channelInvitationsAt: Date.now() }))
  }
}

export const getChannelInvitationsAction = () => {
  // Fetch channel invitations and related channel members
  const token = localStorage.getItem('authToken')
  return async (dispatch) => {
    try {
      const data = await API.getChannelInvitations(token)
      dispatch({
        type: types.GET_CHANNEL_INVITATIONS,
        channelInvitations: data,
      })
      const promises = []
      if (data && data.found) {
        data.found.forEach((channel) => {
          promises.push(dispatch(getMembersByChannelIdAction(channel.id)))
        })
      }
      await Promise.all(promises)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

export const resetChannelInvitations = () => {
  return async (dispatch) => {
    dispatch({
      type: types.RESET_CHANNEL_INVITATIONS,
    })
  }
}

export const timedGetChannelInvitationsAction = () => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState()
      const lastInvitationsTimestamp = user && user.channelInvitationsAt
      const hoursSince = dayjs().diff(lastInvitationsTimestamp, 'hours')
      if (hoursSince >= 24 || !lastInvitationsTimestamp) {
        await dispatch(getChannelInvitationsAction())
        await dispatch(updateChannelInvitationsTimestamp())
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

export const fetchChannelsAndInvitations = () => {
  // Fetch groups related channel data
  return async (dispatch, getState) => {
    await dispatch(startGroupPageFetching())
    await dispatch(initUser())
    await dispatch(initTeam())
    const { teams } = getState().entities.teams
    const teamId = Object.keys(teams)[0]
    await dispatch(fetchMyChannelsAndMembers(teamId))
    await dispatch(timedGetChannelInvitationsAction())
    await dispatch(getProfiles())
    await dispatch(groupPageFetchingReady())
  }
}
