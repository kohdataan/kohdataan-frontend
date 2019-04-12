import React, {useEffect}from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from './components/Container'
import NavBarContainer from './containers/NavBarContainer'
import GroupsContainer from './containers/GroupsContainer'
import QuestionsContainer from './containers/QuestionsContainer'
import ProfileContainer from './containers/ProfileContainer'
import EditProfileContainer from './containers/EditProfileContainer'
import {Client4} from 'mattermost-redux/client'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {login} from 'mattermost-redux/actions/users'
import {init} from 'mattermost-redux/actions/websocket'

Client4.setUrl("http://localhost:9090")

const App = (props) => {

  // login effect
  useEffect(() => {
    props.login(
      process.env.REACT_APP_MATTERMOST_USERNAME, 
      process.env.REACT_APP_MATTERMOST_PASSWORD
    )
  }, [])

  // websocket effect
  useEffect(() => {
    props.init('web', 'ws://localhost:9090')
  }, [])

  return (
    <Router>
      <Container className="main-container">
        <Route path="/profiili" component={ProfileContainer} />
        <Route path="/kysymykset" component={QuestionsContainer} />
        <Route path="/ryhmat" component={GroupsContainer} />
        <Route path="/muokkaa" component={EditProfileContainer} />
        <NavBarContainer />
      </Container>
    </Router>
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
  init,
}, dispatch)

// export default App
export default connect(null, mapDispatchToProps)(App)
