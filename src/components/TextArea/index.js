import React, { memo } from 'react'
import PropTypes from 'prop-types'

const TextArea = props => {
  const { label, value, inputClassName, labelClassName, onChange, rows } = props
  return (
    <label htmlFor={label} className={inputClassName}>
      {label}
      <textarea
        name={label}
        id={label}
        rows={rows}
        value={value}
        placeholder={label}
        className={labelClassName}
        onChange={onChange}
      />
    </label>
  )
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.string,
}

TextArea.defaultProps = {
  value: '',
  inputClassName: '',
  labelClassName: '',
  rows: '3',
}

export default memo(TextArea)
