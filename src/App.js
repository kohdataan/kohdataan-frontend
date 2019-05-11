import React, { useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
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
import ChatContainer from './containers/ChatContainer'
import LogInContainer from './containers/LogInContainer'
import RegistrationContainer from './containers/RegistrationContainer'
import {
  signUpAndSignIn,
  addUserToStateAndMattermostLogin,
} from './store/user/userAction'
import './styles/defaults.scss'

Client4.setUrl(`http://${process.env.REACT_APP_MATTERMOST_URL}`)

const App = props => {
  const { history } = props

  // websocket effect
  useEffect(() => {
    props.init('web', `ws://${process.env.REACT_APP_MATTERMOST_URL}`)
  }, [])

  // TODO: remove after beta (if user is not signed in, create new user, and sign in)
  useEffect(() => {
    async function registerUserAndSignUp() {
      if (!localStorage.getItem('authToken')) {
        await props.signUpAndSignIn()
        history.push('/registration/info')
      } else {
        await props.addUserToStateAndMattermostLogin()
      }
    }
    registerUserAndSignUp()
  }, [])

  return (
    <Container className="main-container">
      <Route path="/login" component={LogInContainer} />
      <Route path="/registration/:step" component={RegistrationContainer} />
      <PrivateRoute path="/profiili/:username?" component={ProfileContainer} />
      <PrivateRoute path="/kysymykset" component={QuestionsContainer} />
      <PrivateRoute path="/ryhmat" component={GroupsContainer} />
      <PrivateRoute path="/chat/:id" component={ChatContainer} />
      {localStorage.getItem('authToken') && <BottomNavigationContainer />}
    </Container>
  )
}

App.propTypes = {
  init: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  signUpAndSignIn: PropTypes.func.isRequired,
  addUserToStateAndMattermostLogin: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      init,
      signUpAndSignIn,
      addUserToStateAndMattermostLogin,
    },
    dispatch
  )

const mapStateToProps = store => {
  return { user: store.user }
}

// export default App
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
