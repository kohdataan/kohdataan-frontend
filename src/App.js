import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
import OtherUserProfileContainer from './containers/OtherUserProfileContainer'
import EmailVerificationContainer from './containers/EmailVerificationContainer'
import PasswordResetRequestContainer from './containers/PasswordResetRequestContainer'
import PasswordResetInfoContainer from './containers/PasswordResetInfoContainer'
import PasswordResetPageContainer from './containers/PasswordResetPageContainer'
import FriendsContainer from './containers/FriendsContainer'
import ViewImageContainer from './containers/ViewImageContainer'
import EditProfileContainer from './containers/EditProfileContainer'
import InterestsContainer from './containers/InterestsContainer'
import FullScreenLoading from './components/FullScreenLoading'
import { rootStartUp as rootStartUpAction } from './store/root'
import ChangeAccountInfoContainer from './containers/ChangeAccountInfoContainer'
import RestoreAccountContainer from './containers/RestoreAccountContainer'
import AccountLocked from './components/AccountLocked'
import CookieContainer from './containers/CookieContainer'
import './styles/defaults.scss'

class App extends Component {
  async componentDidMount() {
    const { rootStartUp } = this.props
    await rootStartUp()
  }

  // Compare important props and prevent re-render if those are not changing
  shouldComponentUpdate(nextProps) {
    const { history, rootStartUp, user: pUser, loading } = this.props
    return !(
      nextProps.history === history &&
      nextProps.user === pUser &&
      nextProps.loading === loading &&
      nextProps.rootStartUp === rootStartUp
    )
  }

  render() {
    const { loading, user: pUser, mmuser } = this.props

    if (loading.root && localStorage.getItem('authToken')) {
      return <FullScreenLoading />
    }
    if (!loading.root && localStorage.getItem('authToken') && !mmuser) {
      return <AccountLocked />
    }

    return (
      <Container className="main-container">
        <Route exact path="/login" component={LogInContainer} />
        <Route path="/login/:uuid" component={LogInContainer} />
        <Route
          exact
          path="/email-verification"
          component={EmailVerificationContainer}
        />
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
        <PrivateRoute exact path="/friends" component={FriendsContainer} />
        <PrivateRoute
          path="/profile/:username"
          component={OtherUserProfileContainer}
        />
        <PrivateRoute path="/me" component={ProfileContainer} />
        <PrivateRoute path="/edit-me" component={EditProfileContainer} />
        <PrivateRoute exact path="/chat/:id" component={ChatContainer} />
        <PrivateRoute path="/chat/:id/:fileId" component={ViewImageContainer} />
        <PrivateRoute path="/edit-interests" component={InterestsContainer} />
        <PrivateRoute path="/account" component={ChangeAccountInfoContainer} />
        {localStorage.getItem('authToken') && <BottomNavigationContainer />}
        {localStorage.getItem('authToken') && pUser && pUser.deleteAt && (
          <RestoreAccountContainer />
        )}
        {!document.cookie.includes('CookieConsent=true') && <CookieContainer />}
      </Container>
    )
  }
}

App.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  rootStartUp: PropTypes.func.isRequired,
  loading: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  mmuser: PropTypes.instanceOf(Object),
}

App.defaultProps = {
  mmuser: null,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      rootStartUp: rootStartUpAction,
    },
    dispatch
  )

const mapStateToProps = store => {
  const currentUserId =
    store &&
    store.entities &&
    store.entities.users &&
    store.entities.users.currentUserId
  const profiles =
    store &&
    store.entities &&
    store.entities.users &&
    store.entities.users.profiles
  return {
    loading: store.loading,
    user: store.user,
    mmuser: profiles[currentUserId],
  }
}

// export default App
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
