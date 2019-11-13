import React, { memo } from 'react'
import PropTypes from 'prop-types'

const InputField = props => {
  const {
    label,
    showLabel,
    value,
    inputClassName,
    labelClassName,
    onChange,
    type,
  } = props
  return (
    <label htmlFor={label} className={inputClassName}>
      {showLabel && label}
      <input
        type={type}
        name={label}
        id={label}
        aria-label={label}
        value={value}
        placeholder={label}
        className={labelClassName}
        onChange={onChange}
      />
    </label>
  )
}

InputField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  value: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

InputField.defaultProps = {
  type: 'text',
  showLabel: true,
  value: '',
  inputClassName: '',
  labelClassName: '',
}

export default memo(InputField)
