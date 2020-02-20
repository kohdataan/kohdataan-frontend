import { getProfiles } from 'mattermost-redux/actions/users'
import {
  fetchMyChannelsAndMembers,
  getChannelMembers,
} from 'mattermost-redux/actions/channels'
import * as types from '../../contants/actionTypes'
import { initUser, initTeam } from '../root/index'

export const startFriendsPageFetching = () => {
  return async dispatch => {
    dispatch({ type: types.START_FRIENDS_FETCHING })
  }
}

export const friendsPageFetchingReady = () => {
  return async dispatch => {
    dispatch({ type: types.FRIENDS_FETCHING_READY })
  }
}

export const fetchDirectChannelMembers = () => {
  return async (dispatch, getState) => {
    const { channels } = getState().entities.channels
    const promises = []
    Object.values(channels).forEach(channel => {
      promises.push(dispatch(getChannelMembers(channel.id)))
    })
    await Promise.all(promises)
  }
}

export const fetchFriendsPageData = () => {
  // Fetch groups related channel data
  return async (dispatch, getState) => {
    await dispatch(startFriendsPageFetching())
    await dispatch(initUser())
    await dispatch(initTeam())
    const { teams } = getState().entities.teams
    const teamId = Object.keys(teams)[0]
    await dispatch(fetchMyChannelsAndMembers(teamId))
    await dispatch(fetchDirectChannelMembers())
    await dispatch(getProfiles())
    await dispatch(friendsPageFetchingReady())
  }
}
