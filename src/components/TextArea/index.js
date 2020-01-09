import React, { memo } from 'react'
import PropTypes from 'prop-types'

const TextArea = props => {
  const {
    label,
    showLabel,
    value,
    inputClassName,
    labelClassName,
    onChange,
    maxLength,
    rows,
  } = props
  return (
    <label htmlFor={label} className={inputClassName}>
      {showLabel && label}
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

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  value: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
}

TextArea.defaultProps = {
  showLabel: true,
  value: '',
  inputClassName: '',
  labelClassName: '',
  maxLength: 1000,
  rows: 4,
}

export default memo(TextArea)
