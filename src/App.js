import React, { PureComponent } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { Client4 } from 'mattermost-redux/client'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init } from 'mattermost-redux/actions/websocket'
import PropTypes from 'prop-types'
import Container from './components/Container'
import BottomNavigationContainer from './containers/BottomNavigationContainer'
import GroupsContainer from './containers/GroupsContainer'
import ProfileContainer from './containers/ProfileContainer'
import PrivateRoute from './utils/PrivateRoute'
import ChatContainer from './containers/ChatContainer'
import LogInContainer from './containers/LogInContainer'
import RegistrationContainer from './containers/RegistrationContainer'
import {
  signUpAndSignIn,
  addUserToStateAndMattermostLogin,
} from './store/user/userAction'
import getInterestsAction from './store/interest/interestAction'
import './styles/defaults.scss'

class App extends PureComponent {
  async componentDidMount() {
    const {
      history,
      init: pInit,
      addUserToStateAndMattermostLogin: pAddUserToStateAndMattermostLogin,
      getInterestsAction: pGetInterestsAction,
      signUpAndSignIn: pSignUpAndSignIn,
    } = this.props
    await Client4.setUrl(`http://${process.env.REACT_APP_MATTERMOST_URL}`)
    await pInit('web', `ws://${process.env.REACT_APP_MATTERMOST_URL}`)
    if (!localStorage.getItem('authToken')) {
      await pSignUpAndSignIn()
      history.push('/registration/info')
    } else {
      await pAddUserToStateAndMattermostLogin()
    }
    await pGetInterestsAction()
  }

  render() {
    return (
      <Container className="main-container">
        <Route path="/login" component={LogInContainer} />
        <Route path="/registration/:step" component={RegistrationContainer} />
        <PrivateRoute exact path="/" component={GroupsContainer} />
        <PrivateRoute
          path="/profiili/:username?"
          component={ProfileContainer}
        />
        <PrivateRoute path="/chat/:id" component={ChatContainer} />
        {localStorage.getItem('authToken') && <BottomNavigationContainer />}
      </Container>
    )
  }
}

App.propTypes = {
  init: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  signUpAndSignIn: PropTypes.func.isRequired,
  addUserToStateAndMattermostLogin: PropTypes.func.isRequired,
  getInterestsAction: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      init,
      signUpAndSignIn,
      addUserToStateAndMattermostLogin,
      getInterestsAction,
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
