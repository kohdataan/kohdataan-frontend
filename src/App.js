import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { Client4 } from 'mattermost-redux/client'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init } from 'mattermost-redux/actions/websocket'
import { loadMe, login } from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import Container from './components/Container'
import BottomNavigationContainer from './containers/BottomNavigationContainer'
import GroupsContainer from './containers/GroupsContainer'
import PrivateRoute from './utils/PrivateRoute'
import ChatContainer from './containers/ChatContainer'
import LogInContainer from './containers/LogInContainer'
import CreateAccountContainer from './containers/CreateAccountContainer'
import RegistrationContainer from './containers/RegistrationContainer'
import RegistrationSuccessContainer from './containers/RegistrationSuccessContainer'
import ThankYouMessageContainer from './containers/ThankYouMessageContainer'
import RegistrationProblemContainer from './containers/RegistrationProblemContainer'
import ProfileContainer from './containers/ProfileContainer'
import PasswordResetRequestContainer from './containers/PasswordResetRequestContainer'
import PasswordResetInfoContainer from './containers/PasswordResetInfoContainer'
import PasswordResetPageContainer from './containers/PasswordResetPageContainer'
import FriendsContainer from './containers/FriendsContainer'
import ViewImageContainer from './containers/ViewImageContainer'
import getInterestsAction from './store/interest/interestAction'
import { addUserToState } from './store/user/userAction'
import './styles/defaults.scss'

class App extends Component {
  async componentDidMount() {
    const { init: pInit, getInterestsAction: pGetInterestsAction } = this.props
    await Client4.setUrl(`http://${process.env.REACT_APP_MATTERMOST_URL}`)
    await pInit('web', `ws://${process.env.REACT_APP_MATTERMOST_URL}`)
    await pGetInterestsAction()
  }

  // Compare important props and prevent re-render if those are not changing
  shouldComponentUpdate(nextProps) {
    const {
      history,
      init: pInit,
      getInterestsAction: pGetInterestsAction,
      addUserToState: pAddUserToState,
      loadMe: pLoadMe,
      user: pUser,
    } = this.props
    return !(
      nextProps.getInterestsAction === pGetInterestsAction &&
      nextProps.addUserToState === pAddUserToState &&
      nextProps.init === pInit &&
      nextProps.history === history &&
      nextProps.user === pUser &&
      nextProps.loadMe === pLoadMe
    )
  }

  render() {
    return (
      <Container className="main-container">
        <Route path="/login" component={LogInContainer} />
        <Route
          exact
          path="/reset-password"
          component={PasswordResetRequestContainer}
        />
        <Route
          path="/reset-password-info"
          component={PasswordResetInfoContainer}
        />
        <Route
          path="/reset-password/:uuid"
          component={PasswordResetPageContainer}
        />
        <Route
          path="/registration-success"
          component={RegistrationSuccessContainer}
        />
        <Route path="/messagesent" component={ThankYouMessageContainer} />
        <Route path="/createaccount" component={CreateAccountContainer} />
        <Route
          path="/registrationproblem"
          component={RegistrationProblemContainer}
        />
        <PrivateRoute
          path="/registration/:step"
          component={RegistrationContainer}
        />
        <PrivateRoute exact path="/" component={GroupsContainer} />
        <PrivateRoute exact path="/friends/" component={FriendsContainer} />
        <PrivateRoute
          path="/profiili/:username?"
          component={ProfileContainer}
        />
        <PrivateRoute exact path="/chat/:id" component={ChatContainer} />
        <Route path="/chat/:id/:fileId" component={ViewImageContainer} />
        {localStorage.getItem('authToken') && <BottomNavigationContainer />}
      </Container>
    )
  }
}

App.propTypes = {
  init: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  getInterestsAction: PropTypes.func.isRequired,
  addUserToState: PropTypes.func.isRequired,
  loadMe: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      init,
      addUserToState,
      loadMe,
      getInterestsAction,
      login,
    },
    dispatch
  )

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

// export default App
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App))
