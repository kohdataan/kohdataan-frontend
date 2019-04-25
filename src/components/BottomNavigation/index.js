import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const BottomNavigation = props => {
  const { children, className, ...other } = props
  return (
    <nav className={className} {...other}>
      {children}
    </nav>
  )
}

BottomNavigation.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

BottomNavigation.defaultProps = {
  className: 'bottom-navigation',
}

export default BottomNavigation
