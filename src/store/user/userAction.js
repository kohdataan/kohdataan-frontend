import uuid from 'uuid/v1'
import * as types from '../../contants/actionTypes'
import * as API from '../../api/user'

// TODO: remove after beta.
export const signUp = () => {
  return async dispatch => {
    const user = {
      email: `${uuid()}@kohdataanbeta.fi`,
      password: `${uuid()}`,
      username: `${uuid()}`,
    }

    const response = await API.userSignUp(user)

    console.log({ user })

    console.log(response)
    dispatch({
      type: types.ADD_USER_TO_STATE,
      user: '',
    })
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
