import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { Client4 } from 'mattermost-redux/client'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init } from 'mattermost-redux/actions/websocket'
import { login } from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import Container from './components/Container'
import BottomNavigationContainer from './containers/BottomNavigationContainer'
import GroupsContainer from './containers/GroupsContainer'
import PrivateRoute from './utils/PrivateRoute'
import ChatContainer from './containers/ChatContainer'
import LogInContainer from './containers/LogInContainer'
import RegistrationContainer from './containers/RegistrationContainer'
import ProfileContainer from './containers/ProfileContainer'
import getInterestsAction from './store/interest/interestAction'
import { getUserProfile } from './store/user/userAction'
import './styles/defaults.scss'

class App extends Component {
  async componentDidMount() {
    const {
      init: pInit,
      getInterestsAction: pGetInterestsAction,
      getUserProfile: pGetUserProfile,
    } = this.props
    await Client4.setUrl(`http://${process.env.REACT_APP_MATTERMOST_URL}`)
    await pInit('web', `ws://${process.env.REACT_APP_MATTERMOST_URL}`)
    if (!localStorage.getItem('authToken')) {
      return <LogInContainer />
    }
    await pGetUserProfile()

    await pGetInterestsAction()
  }

  // Compare important props and prevent re-render if those are not changing
  shouldComponentUpdate(nextProps) {
    const {
      history,
      init: pInit,
      getInterestsAction: pGetInterestsAction,
      getUserProfile: pGetUserProfile,
      user: pUser,
    } = this.props
    return !(
      nextProps.getInterestsAction === pGetInterestsAction &&
      nextProps.getUserProfile === pGetUserProfile &&
      nextProps.init === pInit &&
      nextProps.history === history &&
      nextProps.user === pUser
    )
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
  getInterestsAction: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      init,
      login,
      getInterestsAction,
      getUserProfile,
    },
    dispatch
  )

const mapStateToProps = store => {
  return { user: store.user }
}

// export default App
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App))
