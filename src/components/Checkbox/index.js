import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const Checkbox = (props) => {
  const {
    name,
    labelClassName,
    inputClassName,
    value,
    onChange,
    label,
    checked,
  } = props
  return (
    <label htmlFor={name} className={`checkbox ${labelClassName}`}>
      {label}
      <input
        type="checkbox"
        name={name}
        id={name}
        value={value}
        checked={checked}
        className={inputClassName}
        onChange={onChange}
      />
      <span className="checkmark" />
    </label>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

Checkbox.defaultProps = {
  value: '',
  checked: false,
  inputClassName: '',
  labelClassName: '',
}

export default memo(Checkbox)
