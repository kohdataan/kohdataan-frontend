import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './styles.scss'

const NavBarLink = props => {
  const { title, route, icon } = props
  return (
    <Link to={route} className="nav-link">
      <div>
        <i className={icon} />
      </div>
      <span className="label">{title}</span>
    </Link>
  )
}

NavBarLink.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default NavBarLink
