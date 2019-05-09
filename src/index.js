import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import App from './App'
import configureMattermostStore from './store/configureMattermostStore'

const store = configureMattermostStore()

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)

serviceWorker.unregister()
