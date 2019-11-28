import React, { memo } from 'react'
import PropTypes from 'prop-types'

const InputField = props => {
  const {
    label,
    value,
    inputClassName,
    labelClassName,
    showPlaceholder,
    onChange,
    type,
  } = props
  return (
    <label htmlFor={label} className={inputClassName}>
      {label}
      <input
        type={type}
        name={label}
        id={label}
        value={value}
        placeholder={showPlaceholder ? label : ''}
        className={labelClassName}
        onChange={onChange}
      />
    </label>
  )
}

InputField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  showPlaceholder: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

InputField.defaultProps = {
  type: 'text',
  value: '',
  inputClassName: '',
  labelClassName: '',
  showPlaceholder: true,
}

export default memo(InputField)
