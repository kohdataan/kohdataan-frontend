import { combineReducers } from 'redux'
import user from './user/userReducer'
import interests from './interest/interestReducer'
import channels from './channels/channelReducer'
import chat from './chat/chatReducer'

export const appReducer = () => {
  return {
    user,
    interests,
    channels,
    chat,
  }
}

export default () => combineReducers(appReducer())
