import { combineReducers } from 'redux'
import user from './user/userReducer'
import interests from './interest/interestReducer'
import channels from './channels/channelReducer'
import loading from './root/rootReducer'

export const appReducer = () => {
  return {
    loading,
    user,
    interests,
    channels,
  }
}

export default () => combineReducers(appReducer())
