import { init } from 'mattermost-redux/actions/websocket'
import { Client4 } from 'mattermost-redux/client'
import { getMe, getProfiles } from 'mattermost-redux/actions/users'
import * as types from '../../contants/actionTypes'
import getInterestsAction from '../interest/interestAction'
import { addUserToState, getUserInterests } from '../user/userAction'
import getChannelInvitations from '../channels/channelAction'

export const rootLoading = () => {
  return async dispatch => {
    dispatch({ type: types.START_ROOT_LOADING })
  }
}

export const rootLoadingReady = () => {
  return async dispatch => {
    dispatch({
      type: types.ROOT_LOADING_READY,
    })
  }
}

export const rootStartUp = () => {
  return async dispatch => {
    const token = localStorage.getItem('authToken')
    if (token) {
      await init('web', `ws://${process.env.REACT_APP_MATTERMOST_URL}`)
      await Client4.setUrl(`http://${process.env.REACT_APP_MATTERMOST_URL}`)
      await dispatch(addUserToState())
      await dispatch(getMe())
      await dispatch(getProfiles())
      await dispatch(getUserInterests())
      await dispatch(getInterestsAction())
      await dispatch(getChannelInvitations())
      await dispatch(rootLoadingReady())
    }
  }
}
