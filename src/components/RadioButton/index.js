import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const RadioButton = props => {
  const { name, labelClassName, inputClassName, value, onChange, label, checked } = props

  return (
    <label htmlFor={label} className={`radio-button ${labelClassName}`}>
      {label}
      <input
        type="radio"
        name={name}
        id={label}
        value={value}
        onChange={onChange}
        className={inputClassName}
        checked={checked}
        onKeyPress={onChange}
        tabIndex={0}
      />
      <span className="radio-button-checkmark" />
    </label>
  )
}

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
}

RadioButton.defaultProps = {
  value: '',
  inputClassName: '',
  labelClassName: '',
  checked: false,
}

export default memo(RadioButton)
