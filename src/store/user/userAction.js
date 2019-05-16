import uniqid from 'uniqid'
import { login } from 'mattermost-redux/actions/users'
import * as types from '../../contants/actionTypes'
import * as API from '../../api/user'

// TODO: remove after beta.
export const addUserToStateAndMattermostLogin = (mmusername, mmpassword) => {
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async dispatch => {
    try {
      const user = await API.getUser(id, token)
      dispatch({
        type: types.ADD_USER_TO_STATE,
        user: user.user,
      })

      dispatch(login(mmusername, mmpassword))
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
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

// TODO: remove after beta
export const signUpAndSignIn = () => {
  return async dispatch => {
    try {
      const user = {
        email: `${uniqid.process()}@kohdataanbeta.fi`,
        password: `${uniqid.process()}`,
        username: `${uniqid.process()}`,
      }

      const signUpResponse = await API.userSignUp(user)
      console.log(signUpResponse)
      const signInResponse = await API.userLogin(user)
      console.log(signInResponse)
      localStorage.setItem('userId', signInResponse.user.id)
      localStorage.setItem('authToken', signInResponse.token)

      await dispatch(
        addUserToStateAndMattermostLogin(
          // signInResponse.user.id,
          // signInResponse.token,
          user.email,
          user.password
        )
      )
    } catch (e) {
      // throw error message if sign up or sign in fail
      // eslint-disable-next-line no-console
      console.error(e)
      dispatch({ type: types.SIGNUP_SIGNIN_FAILURE, payload: e, error: true })
    }
  }
}

export const getUserInterests = () => {
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async dispatch => {
    try {
      const userInterests = await API.getUserInterest(id, token)
      await dispatch({
        type: types.GET_USER_INTERESTS,
        userInterests,
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

export const addUserInterests = data => {
  // const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async dispatch => {
    try {
      await API.addUserInterests(data, token)
      await dispatch({
        type: types.ADD_USER_INTERESTS,
        userInterests: data,
      })
    } catch (e) {
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
