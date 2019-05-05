import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Client4 } from 'mattermost-redux/client'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init } from 'mattermost-redux/actions/websocket'
import PropTypes from 'prop-types'
import Container from './components/Container'
import BottomNavigationContainer from './containers/BottomNavigationContainer'
import GroupsContainer from './containers/GroupsContainer'
import QuestionsContainer from './containers/QuestionsContainer'
import ProfileContainer from './containers/ProfileContainer'
import PrivateRoute from './utils/PrivateRoute'
import './styles/defaults.scss'
import ChatContainer from './containers/ChatContainer'
import LogInContainer from './containers/LogInContainer'

Client4.setUrl(`http://${process.env.REACT_APP_MATTERMOST_URL}`)

const App = props => {
  // websocket effect
  useEffect(() => {
    props.init('web', `ws://${process.env.REACT_APP_MATTERMOST_URL}`)
  }, [])

  return (
    <Router>
      <Container className="main-container">
        <Route path="/login" component={LogInContainer} />
        <PrivateRoute path="/profiili" component={ProfileContainer} />
        <PrivateRoute path="/kysymykset" component={QuestionsContainer} />
        <PrivateRoute path="/ryhmat" component={GroupsContainer} />
        <PrivateRoute path="/chat/:id" component={ChatContainer} />
        {localStorage.getItem('authToken') && <BottomNavigationContainer />}
      </Container>
    </Router>
  )
}

App.propTypes = {
  init: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      init,
    },
    dispatch
  )

// export default App
export default connect(
  null,
  mapDispatchToProps
)(App)
