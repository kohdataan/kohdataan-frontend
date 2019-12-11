import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import BottomNavigation from '../components/BottomNavigation'
import BottomNavigationLink from '../components/BottomNavigationLink'
import BottomNavigationBot from '../components/BottomNavigationBot'

const BottomNavigationContainer = props => {
  const {
    location: { pathname },
  } = props

  if (pathname.split('/')[1] === 'chat') {
    return <div />
  }

  if (pathname.split('/')[1] === 'registration') {
    return <div />
  }

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
      <BottomNavigationBot />
    </BottomNavigation>
  )
}

BottomNavigationContainer.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default withRouter(
  memo(BottomNavigationContainer, shouldComponentUpdate)
)
