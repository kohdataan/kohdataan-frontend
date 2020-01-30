import React, { memo, useRef, useEffect } from 'react'
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
import { setComponentCoordinates } from '../store/root'

const BottomNavigationContainer = props => {
  const {
    location: { pathname },
    logout: matterMostLogout,
    setComponentCoordinates: setCoords,
  } = props

  const botRef = useRef()
  const profileNavRef = useRef()
  const friendsNavRef = useRef()
  const groupsNavRef = useRef()

  const saveReferences = (component, coords) => setCoords(component, coords)

  useEffect(() => {
    const botCoord =
      botRef && botRef.current && botRef.current.getBoundingClientRect()
    const profileCoord =
      profileNavRef &&
      profileNavRef.current &&
      profileNavRef.current.getBoundingClientRect()
    const friendsCoord =
      friendsNavRef &&
      friendsNavRef.current &&
      friendsNavRef.current.getBoundingClientRect()
    const groupsCoord =
      groupsNavRef &&
      groupsNavRef.current &&
      groupsNavRef.current.getBoundingClientRect()
    if (botCoord) {
      saveReferences('bot', botCoord)
    }
    if (profileCoord) {
      saveReferences('profileNav', profileCoord)
    }
    if (friendsCoord) {
      saveReferences('friendsNav', friendsCoord)
    }
    if (groupsCoord) {
      saveReferences('groupsNav', groupsCoord)
    }
  }, [])

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
        ref={profileNavRef}
      />
      <BottomNavigationLink
        title="Kaverit"
        route="/friends"
        icon="fas fa-comment-dots"
        ref={friendsNavRef}
      />
      <BottomNavigationLink
        title="Ryhmät"
        route="/"
        icon="fas fa-user-friends"
        ref={groupsNavRef}
      />

      <BottomNavigationBot
        handleLogout={handleLogout}
        path={pathname}
        ref={botRef}
      />
    </BottomNavigation>
  )
}

BottomNavigationContainer.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  logout: PropTypes.func.isRequired,
  setComponentCoordinates: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      setComponentCoordinates,
    },
    dispatch
  )

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(memo(BottomNavigationContainer, shouldComponentUpdate)))
