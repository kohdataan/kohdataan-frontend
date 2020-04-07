import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const ButtonContainer = props => {
  const { className, children, secondary, onClick, label, role } = props
  return (
    <button
      type="button"
      className={`button-container ${
        secondary ? `button-secondary` : ``
      } ${className}`}
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex="0"
      aria-label={label}
      role={role}
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
  label: propTypes.string,
  role: propTypes.string,
}

ButtonContainer.defaultProps = {
  secondary: false,
  label: '',
  role: 'button',
}

export default memo(ButtonContainer)
