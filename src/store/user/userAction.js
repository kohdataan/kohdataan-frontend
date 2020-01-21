import { login as matterMostLogin } from 'mattermost-redux/actions/users'
import * as types from '../../contants/actionTypes'
import * as API from '../../api/user/user'

export const userLogin = user => {
  return async dispatch => {
    try {
      let loginSuccess = false
      const res = await API.userLogin(user)
      if (res) {
        localStorage.setItem('userId', res.user.id)
        localStorage.setItem('authToken', res.token)
        loginSuccess = true
      }
      if (loginSuccess) {
        const { email, password } = user
        await dispatch(matterMostLogin(email, password))
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      dispatch({
        type: types.USER_LOGIN_FAILURE,
        payload: e,
        error: true,
      })
    }
  }
}

export const addUserToState = () => {
  return async dispatch => {
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('authToken')
    try {
      const user = await API.getUser(id, token)
      dispatch({
        type: types.ADD_USER_TO_STATE,
        user,
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('e')
      dispatch({ type: types.GET_USER_FAILURE, payload: e, error: true })
    }
  }
}

export const updateUser = data => {
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async dispatch => {
    try {
      await API.updateUser(data, id, token)
      dispatch({
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

export const updateUserPassword = data => {
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async dispatch => {
    try {
      const res = await API.updatePassword(data, id, token)
      if (res && res.ok) {
        dispatch({
          type: types.UPDATE_USER_PASSWORD,
        })
      } else if (res) {
        dispatch({
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

export const restoreUserAccount = () => {
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async dispatch => {
    try {
      const resp = await API.restoreUser(id, token)
      if (resp && resp.success && resp.restored) {
        dispatch({
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
  return async dispatch => {
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

export const addUserInterests = interests => {
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async dispatch => {
    try {
      const data = { userId: id, ...interests }
      await API.addUserInterests(data, token)
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
