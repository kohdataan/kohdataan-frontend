import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import test from './test/testReducer'

export const appReducer = history => {
  return {
    test,
    router: connectRouter(history),
  }
}

export default history => combineReducers(appReducer(history))
