import React from 'react'
import PropTypes from 'prop-types'

const Textarea = props => {
  const {
    label,
    value,
    inputClassName,
    labelClassName,
    onChange,
    maxLength,
    rows,
  } = props
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
        maxLength={maxLength}
        rows={rows}
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
  maxLength: PropTypes.number,
  rows: PropTypes.number,
}

Textarea.defaultProps = {
  value: '',
  inputClassName: '',
  labelClassName: '',
  maxLength: 1000,
  rows: 4,
}

export default Textarea
