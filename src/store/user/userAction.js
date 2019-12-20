import * as types from '../../contants/actionTypes'
import * as API from '../../api/user'

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
