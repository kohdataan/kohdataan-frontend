import { applyMiddleware, compose, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './rootReducer'

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  let store

  if (process.env.NODE_ENV === 'production') {
    store = createStore(
      createRootReducer(history),
      preloadedState,
      compose(applyMiddleware(routerMiddleware(history), thunk))
    )
  } else {
    const composeEnhancer =
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    store = createStore(
      createRootReducer(history),
      preloadedState,
      composeEnhancer(applyMiddleware(routerMiddleware(history), thunk))
    )
  }
  return store
}
