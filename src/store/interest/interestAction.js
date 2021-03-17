import * as types from '../../contants/actionTypes'
import getInterests from '../../api/interests/interest'

const getInterestsAction = () => {
  // const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken')
  return async (dispatch) => {
    try {
      const interests = await getInterests(token)
      await dispatch({
        type: types.GET_INTERESTS,
        interests,
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}

export default getInterestsAction
