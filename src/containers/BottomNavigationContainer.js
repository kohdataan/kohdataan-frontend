import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from 'mattermost-redux/actions/users'
import BottomNavigation from '../components/BottomNavigation'
import BottomNavigationLink from '../components/BottomNavigationLink'
import BottomNavigationBot from '../components/BottomNavigationBot'
import * as API from '../api/user'

const BottomNavigationContainer = props => {
  const {
    location: { pathname },
    logout: matterMostLogout,
  } = props

  if (pathname.split('/')[1] === 'chat') {
    return <div />
  }

  if (pathname.split('/')[1] === 'registration') {
    return <div />
  }

  const handleLogout = async () => {
    try {
      await API.userLogout(localStorage.getItem('authToken'))
      await matterMostLogout()
      localStorage.removeItem('userId')
      localStorage.removeItem('authToken')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  return (
    <BottomNavigation>
      <BottomNavigationLink
        title="Profiili"
        route="/profiili"
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
      <BottomNavigationBot handleLogout={handleLogout} />
    </BottomNavigation>
  )
}

BottomNavigationContainer.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  logout: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
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
  null,
  mapDispatchToProps
)(withRouter(memo(BottomNavigationContainer, shouldComponentUpdate)))
