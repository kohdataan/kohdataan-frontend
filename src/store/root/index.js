import { init } from 'mattermost-redux/actions/websocket'
import { Client4 } from 'mattermost-redux/client'
import { loadMe } from 'mattermost-redux/actions/users'
import { getTeamMembers, selectTeam } from 'mattermost-redux/actions/teams'
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

export const initMattermostReduxClient = () => {
  return async dispatch => {
    await Client4.setUrl(`${process.env.REACT_APP_MATTERMOST_URL}`)
    await dispatch(init('web', `${process.env.REACT_APP_WEBSOCKET_URL}`))
    await dispatch(setServerVersion('5.9.0'))
  }
}

export const initUser = () => {
  return async dispatch => {
    const token = localStorage.getItem('authToken')
    if (token) {
      await dispatch(addUserToState())
      await dispatch(getUserInterests())
      await dispatch(loadMe())
    }
  }
}

export const initTeam = () => {
  return async (dispatch, getState) => {
    const { teams } = getState().entities.teams
    const teamId = Object.keys(teams)[0]
    const team = Object.values(teams)[0]
    if (teamId && team) {
      await dispatch(selectTeam(team))
      await dispatch(getTeamMembers(teamId))
    }
  }
}

export const rootStartUp = () => {
  return async dispatch => {
    await dispatch(rootLoading())
    await dispatch(initMattermostReduxClient())
    await dispatch(getInterestsAction())
    await dispatch(initUser())
    await dispatch(initTeam())
    await dispatch(rootLoadingReady())
  }
}
