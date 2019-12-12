import { combineReducers } from 'redux'
import user from './user/userReducer'
import interests from './interest/interestReducer'
import channels from './channels/channelReducer'
import friends from './friends/friendsReducer'
import loading from './root/rootReducer'

export const appReducer = () => {
  return {
    loading,
    user,
    interests,
    channels,
    friends,
  }
}

export default () => combineReducers(appReducer())
