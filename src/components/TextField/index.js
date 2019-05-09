import React from 'react'
import PropTypes from 'prop-types'

const Textarea = props => {
  const { label, value, inputClassName, labelClassName, onChange } = props
  return (
    <label htmlFor={label} className={inputClassName}>
      {label}
      <textarea
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

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

Textarea.defaultProps = {
  value: '',
  inputClassName: '',
  labelClassName: '',
}

export default Textarea
