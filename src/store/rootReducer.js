import { combineReducers } from 'redux'
import test from './test/testReducer'

export const appReducer = () => {
  return {
    test,
  }
}

export default () => combineReducers(appReducer())
