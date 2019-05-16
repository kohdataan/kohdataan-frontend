import { combineReducers } from 'redux'
import user from './user/userReducer'
import interests from './interest/interestReducer'

export const appReducer = () => {
  return {
    user,
    interests,
  }
}

export default () => combineReducers(appReducer())
