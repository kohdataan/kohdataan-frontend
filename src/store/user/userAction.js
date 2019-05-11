import uniqid from 'uniqid'
import { login } from 'mattermost-redux/actions/users'
import * as types from '../../contants/actionTypes'
import * as API from '../../api/user'

// TODO: remove after beta.

export const addUserToStateAndMattermostLogin = () => {
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async dispatch => {
    const user = await API.getUser(id, token)
    dispatch({
      type: types.ADD_USER_TO_STATE,
      user: user.user,
    })

    /* TODO: MATTERMOST LOGIN, backend is not ready
      dispatch(
        login(
          user.username,
          user.password
        )
      )
      */

    dispatch(
      login(
        process.env.REACT_APP_MATTERMOST_USERNAME,
        process.env.REACT_APP_MATTERMOST_PASSWORD
      )
    )
  }
}

export const updateUser = data => {
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async dispatch => {
    await API.updateUser(data, id, token)
    dispatch({
      type: types.UPDATE_USER,
      user: data,
    })
  }
}

// TODO: remove after beta
export const signUpAndSignIn = () => {
  return async dispatch => {
    try {
      const user = {
        email: `${uniqid.process()}@kohdataanbeta.fi`,
        password: `${uniqid.process()}`,
        username: `${uniqid.process()}`,
      }

      await API.userSignUp(user)
      const signInResponse = await API.userLogin(user)

      localStorage.setItem('userId', signInResponse.user.id)
      localStorage.setItem('authToken', signInResponse.token)

      await dispatch(
        addUserToStateAndMattermostLogin(
          signInResponse.user.id,
          signInResponse.token
        )
      )
    } catch (e) {
      // throw error message if sign up or sign in fail
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export function clearUserCookie() {
  document.cookie = 'MMUSERID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/'
  document.cookie = `MMUSERID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${
    window.location.hostname
  };path=/`
  document.cookie = 'MMCSRF=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/'
  document.cookie = `MMCSRF=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${
    window.location.hostname
  };path=/`
}
