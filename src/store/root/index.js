import { init } from 'mattermost-redux/actions/websocket'
import { Client4 } from 'mattermost-redux/client'
import { loadMe, getProfiles } from 'mattermost-redux/actions/users'
import { setServerVersion } from 'mattermost-redux/actions/general'
import * as types from '../../contants/actionTypes'
import getInterestsAction from '../interest/interestAction'
import { addUserToState, getUserInterests } from '../user/userAction'

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
      await Client4.setUrl(`http://${process.env.REACT_APP_MATTERMOST_URL}`)
      await dispatch(
        init('web', `ws://${process.env.REACT_APP_MATTERMOST_URL}`)
      )
      await dispatch(setServerVersion('5.9.0'))
      await dispatch(addUserToState())
      await dispatch(loadMe())
      await dispatch(getProfiles())
      await dispatch(getUserInterests())
      await dispatch(getInterestsAction())
      await dispatch(rootLoadingReady())
    }
  }
}
