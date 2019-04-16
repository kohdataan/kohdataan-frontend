import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './store/history'
import * as serviceWorker from './serviceWorker'
import App from './App'
import configureMattermostStore from './store/configureMattermostStore'

const store = configureMattermostStore()

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)

serviceWorker.unregister()
