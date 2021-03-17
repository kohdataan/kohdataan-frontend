import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from 'mattermost-redux/actions/users'
import BottomNavigation from '../components/BottomNavigation'
import BottomNavigationLink from '../components/BottomNavigationLink'
import BottomNavigationBot from '../components/BottomNavigationBot'
import * as API from '../api/user/user'
import logoutHandler from '../utils/userLogout'

const BottomNavigationContainer = (props) => {
  const {
    location: { pathname },
    logout: matterMostLogout,
    user,
  } = props

  if (pathname.split('/')[1] === 'chat') {
    return <div />
  }

  if (pathname.split('/')[1] === 'registration') {
    return <div />
  }

  const handleLogout = () => logoutHandler(API.userLogout, matterMostLogout)

  return (
    <BottomNavigation>
      <BottomNavigationLink
        title="Profiili"
        route="/me"
        icon="fas fa-user-circle"
      />
      <BottomNavigationLink
        title="Kaverit"
        route="/friends"
        icon="fas fa-comment-dots"
      />
      <BottomNavigationLink
        title="Ryhmät"
        route="/"
        icon="fas fa-user-friends"
      />

      <BottomNavigationBot
        handleLogout={handleLogout}
        path={pathname}
        user={user}
      />
    </BottomNavigation>
  )
}

BottomNavigationContainer.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
}

const mapStateToProps = (state) => {
  const { currentUserId } = state.entities.users
  const user = state.entities.users.profiles[currentUserId]
  return {
    currentUserId,
    user,
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logout,
    },
    dispatch
  )

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(memo(BottomNavigationContainer, shouldComponentUpdate)))
