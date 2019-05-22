import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import BottomNavigation from '../components/BottomNavigation'
import BottomNavigationLink from '../components/BottomNavigationLink'

class BottomNavigationContainer extends PureComponent {
  render() {
    const {
      location: { pathname },
    } = this.props

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
          route="/profiili"
          icon="fas fa-user-circle"
        />
        <BottomNavigationLink
          title="Ryhmät"
          route="/"
          icon="fas fa-user-friends"
        />
      </BottomNavigation>
    )
  }
}

BottomNavigationContainer.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
}

export default withRouter(BottomNavigationContainer)
