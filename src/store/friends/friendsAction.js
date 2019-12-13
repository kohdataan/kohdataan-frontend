import { getProfiles } from 'mattermost-redux/actions/users'
import { fetchMyChannelsAndMembers } from 'mattermost-redux/actions/channels'
import * as types from '../../contants/actionTypes'

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

export const fetchFriendsPageData = () => {
  // Fetch groups related channel data
  return async (dispatch, getState) => {
    await dispatch(startFriendsPageFetching())
    const { teams } = getState().entities.teams
    const teamId = Object.keys(teams)[0]
    await dispatch(fetchMyChannelsAndMembers(teamId))
    await dispatch(getProfiles())
    await dispatch(friendsPageFetchingReady())
  }
}
