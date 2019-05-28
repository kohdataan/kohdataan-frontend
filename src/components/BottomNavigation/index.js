import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const BottomNavigation = props => {
  const { children, className, ...other } = props
  return (
    <div className="bottom-navigation-container">
      <nav className={className} {...other}>
        {children}
      </nav>
    </div>
  )
}

BottomNavigation.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

BottomNavigation.defaultProps = {
  className: 'bottom-navigation',
}

export default memo(BottomNavigation)
