import uuid from 'uuid/v1'
import * as types from '../../contants/actionTypes'
import * as API from '../../api/user'

// TODO: remove after beta.
export const signUpAndSignIn = () => {
  return async dispatch => {
    try {
      const user = {
        email: `${uuid()}@kohdataanbeta.fi`,
        password: `${uuid()}`,
        username: `${uuid()}`,
      }

      await API.userSignUp(user)
      const signInResponse = await API.userLogin(user)

      localStorage.setItem('authToken', signInResponse.token)
      dispatch({
        type: types.ADD_USER_TO_STATE,
        user: signInResponse,
      })
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
