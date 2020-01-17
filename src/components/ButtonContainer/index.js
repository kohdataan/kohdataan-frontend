import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const ButtonContainer = props => {
  const { className, children, secondary, onClick } = props
  return (
    <button
      type="button"
      className={`button-container ${
        secondary ? `button-secondary` : ``
      } ${className}`}
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex="0"
    >
      {children}
    </button>
  )
}

ButtonContainer.propTypes = {
  className: propTypes.string.isRequired,
  children: propTypes.oneOfType([
    propTypes.string,
    propTypes.instanceOf(Array),
    propTypes.node,
  ]).isRequired,
  onClick: propTypes.func.isRequired,
  secondary: propTypes.bool,
}

ButtonContainer.defaultProps = {
  secondary: false,
}

export default memo(ButtonContainer)
