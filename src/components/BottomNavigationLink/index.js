import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './styles.scss'

const BottomNavigationLink = props => {
  const { title, route, icon } = props
  return (
    <NavLink
      exact
      to={route}
      className="nav-link"
      activeClassName="nav-link-active"
    >
      <div>
        <i aria-hidden="true" className={icon} title={title} />
      </div>
      <p className="label">{title}</p>
    </NavLink>
  )
}

BottomNavigationLink.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default memo(BottomNavigationLink)
