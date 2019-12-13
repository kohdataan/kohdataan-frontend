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
import PasswordResetContainer from './containers/PasswordResetContainer'
import FriendsContainer from './containers/FriendsContainer'
import EditProfileContainer from './containers/EditProfileContainer'
import InterestsContainer from './containers/InterestsContainer'
import FullScreenLoading from './components/FullScreenLoading'
import { rootStartUp as rootStartUpAction } from './store/root'
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
    const { loading } = this.props
    if (loading.root && localStorage.getItem('authToken')) {
      // TODO: Nice spashscree
      return <FullScreenLoading />
    }

    return (
      <Container className="main-container">
        <Route path="/login" component={LogInContainer} />
        <Route path="/reset-password" component={PasswordResetContainer} />
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
        <PrivateRoute path="/chat/:id" component={ChatContainer} />
        <PrivateRoute path="/edit-me" component={EditProfileContainer} />
        <PrivateRoute path="/edit-interests" component={InterestsContainer} />
        {localStorage.getItem('authToken') && <BottomNavigationContainer />}
      </Container>
    )
  }
}

App.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  rootStartUp: PropTypes.func.isRequired,
  loading: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      rootStartUp: rootStartUpAction,
    },
    dispatch
  )

const mapStateToProps = store => {
  return {
    loading: store.loading,
    user: store.user,
  }
}

// export default App
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App))
