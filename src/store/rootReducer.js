import { combineReducers } from 'redux'
import user from './user/userReducer'

export const appReducer = () => {
  return {
    user,
  }
}

export default () => combineReducers(appReducer())
