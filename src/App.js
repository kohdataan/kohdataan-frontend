import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Client4 } from 'mattermost-redux/client'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from 'mattermost-redux/actions/users'
import { init } from 'mattermost-redux/actions/websocket'
import PropTypes from 'prop-types'
import Container from './components/Container'
import BottomNavigationContainer from './containers/BottomNavigationContainer'
import GroupsContainer from './containers/GroupsContainer'
import QuestionsContainer from './containers/QuestionsContainer'
import ProfileContainer from './containers/ProfileContainer'
import './styles/defaults.scss'
import ChatContainer from './containers/ChatContainer'

Client4.setUrl(`http://${process.env.REACT_APP_MATTERMOST_URL}`)

const App = props => {
  // login effect
  useEffect(() => {
    props.login(
      process.env.REACT_APP_MATTERMOST_USERNAME,
      process.env.REACT_APP_MATTERMOST_PASSWORD
    )
  }, [])

  // websocket effect
  useEffect(() => {
    props.init('web', `ws://${process.env.REACT_APP_MATTERMOST_URL}`)
  }, [])

  return (
    <Router>
      <Container className="main-container">
        <Route path="/profiili/:username?" component={ProfileContainer} />
        <Route path="/kysymykset" component={QuestionsContainer} />
        <Route path="/ryhmat" component={GroupsContainer} />
        <Route path="/chat/:id" component={ChatContainer} />
        <BottomNavigationContainer />
      </Container>
    </Router>
  )
}

App.propTypes = {
  init: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      init,
    },
    dispatch
  )

// export default App
export default connect(
  null,
  mapDispatchToProps
)(App)
