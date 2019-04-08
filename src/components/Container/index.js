import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const Container = props => {
  const { className, children } = props
  return <div className={className}>{children}</div>
}

Container.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export default Container
