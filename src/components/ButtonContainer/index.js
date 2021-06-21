import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const ButtonContainer = (props) => {
  const {
    className,
    disabled,
    children,
    secondary,
    onClick,
    label,
    role,
    ariaDescribedby,
  } = props
  return (
    <button
      type="button"
      className={`button-container ${
        secondary ? `button-secondary` : ``
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex="0"
      aria-label={label}
      role={role}
      aria-describedby={ariaDescribedby}
    >
      {children}
    </button>
  )
}

ButtonContainer.propTypes = {
  className: propTypes.string.isRequired,
  disabled: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.string,
    propTypes.instanceOf(Array),
    propTypes.node,
  ]).isRequired,
  onClick: propTypes.func.isRequired,
  secondary: propTypes.bool,
  label: propTypes.string,
  role: propTypes.string,
  ariaDescribedby: propTypes.string,
}

ButtonContainer.defaultProps = {
  disabled: false,
  secondary: false,
  label: '',
  role: 'button',
  ariaDescribedby: null,
}

export default memo(ButtonContainer)
