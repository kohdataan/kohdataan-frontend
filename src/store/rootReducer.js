import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import test from './test/testReducer'

export default history =>
  combineReducers({
    test,
    router: connectRouter(history),
  })
