import { combineReducers } from 'redux'
import user from './user/userReducer'
import interests from './interest/interestReducer'
import channels from './channels/channelReducer'

export const appReducer = () => {
  return {
    user,
    interests,
    channels,
  }
}

export default () => combineReducers(appReducer())
