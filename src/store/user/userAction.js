import { login as matterMostLogin } from 'mattermost-redux/actions/users'
import * as types from '../../contants/actionTypes'
import * as channelAPI from '../../api/channels/channels'
import * as API from '../../api/user/user'

export const userLogin = (user) => {
  return async (dispatch) => {
    try {
      const res = await API.userLogin(user)
      if (res && res.user && res.token) {
        localStorage.setItem('userId', res.user.id)
        localStorage.setItem('authToken', res.token)
        const { email, password } = user
        const mmRes = await dispatch(matterMostLogin(email, password))
        if (mmRes && mmRes.error) {
          await dispatch({
            type: types.USER_LOGIN_FAILURE,
            payload: mmRes.error,
            error: true,
          })
        }
      } else {
        // This is so that state is updated and effects related to user are ran even if the error message does not change.
        await dispatch({
          type: types.USER_LOGIN_FAILURE,
          payload: '',
        })
        await dispatch({
          type: types.USER_LOGIN_FAILURE,
          payload: res,
          error: true,
        })
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      await dispatch({
        type: types.USER_LOGIN_FAILURE,
        payload: e,
        error: true,
      })
    }
  }
}

export const addUserToState = () => {
  return async (dispatch) => {
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('authToken')
    try {
      if (token) {
        const user = await API.getMe(id, token)
        await dispatch({
          type: types.ADD_USER_TO_STATE,
          user,
        })
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('e')
      dispatch({ type: types.GET_USER_FAILURE, payload: e, error: true })
    }
  }
}

export const updateUser = (data) => {
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async (dispatch) => {
    try {
      await API.updateUser(data, id, token)
      await dispatch({
        type: types.UPDATE_USER,
        user: data,
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      dispatch({ type: types.UPDATE_USER_FAILURE, payload: e, error: true })
    }
  }
}

export const updateUserPassword = (data) => {
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async (dispatch) => {
    try {
      const res = await API.updatePassword(data, id, token)
      if (res && res.ok) {
        await dispatch({
          type: types.UPDATE_USER_PASSWORD,
        })
      } else if (res) {
        await dispatch({
          type: types.UPDATE_USER_PASSWORD_FAILURE,
          payload: res.message,
          error: true,
        })
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

export const restoreUserAccount = (data) => {
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async (dispatch) => {
    try {
      const resp = await API.restoreUser(data, id, token)
      if (resp && resp.success && resp.restored) {
        await dispatch({
          type: types.RESTORE_USER,
        })
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      dispatch({ type: types.UPDATE_USER_FAILURE, payload: e, error: true })
    }
  }
}

export const getUserInterests = () => {
  const token = localStorage.getItem('authToken')
  return async (dispatch) => {
    try {
      const data = await API.getUserInterest(token)
      await dispatch({
        type: types.GET_USER_INTERESTS,
        userInterests: data.result[0],
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

export const addUserInterests = (interests) => {
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async (dispatch) => {
    try {
      const data = { userId: id, ...interests }
      await API.addUserInterests(data, token)
      await channelAPI.handleUserChangingInterestToChannelsPurposes(token)
      await dispatch(getUserInterests())
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export function clearUserCookie() {
  document.cookie = 'MMUSERID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/'
  document.cookie = `MMUSERID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${window.location.hostname};path=/`
  document.cookie = 'MMCSRF=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/'
  document.cookie = `MMCSRF=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${window.location.hostname};path=/`
}
