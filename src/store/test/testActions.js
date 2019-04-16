/* eslint-disable import/prefer-default-export */
import * as types from '../../contants/actionTypes'

export const test = () => {
  return async dispatch => {
    dispatch({
      type: types.TEST,
      test: 'test',
    })
  }
}
