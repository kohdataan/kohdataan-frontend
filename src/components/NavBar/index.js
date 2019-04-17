import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import NavBarLink from './NavBarLink'

const NavBar = props => {
  const { routes } = props
  return (
    <div className="bottom-nav">
      {routes.map(route => (
        <NavBarLink {...route} key={route.route} />
      ))}
    </div>
  )
}

NavBar.propTypes = {
  routes: PropTypes.instanceOf(Array).isRequired,
}

export default NavBar
