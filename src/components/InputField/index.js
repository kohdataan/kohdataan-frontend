import React from 'react'
import PropTypes from 'prop-types'

const InputField = props => {
  const { label, value, inputClassName, labelClassName, onChange } = props
  return (
    <label htmlFor={label} className={inputClassName}>
      {label}
      <input
        type="text"
        name={label}
        id={label}
        value={value}
        placeholder={label}
        className={labelClassName}
        onChange={onChange}
      />
    </label>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

InputField.defaultProps = {
  value: '',
  inputClassName: '',
  labelClassName: '',
}

export default InputField
