import React, { memo } from 'react'
import PropTypes from 'prop-types'

const InputField = (props) => {
  const {
    label,
    labelClassName,
    showPlaceholder,
    showLabel,
    value,
    inputClassName,
    onChange,
    type,
    ariaRequired,
    ariaDescribedby,
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
        placeholder={showPlaceholder ? label : ''}
        className={labelClassName}
        onChange={onChange}
        aria-required={ariaRequired}
        aria-describedby={ariaDescribedby}
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
  showPlaceholder: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  ariaRequired: PropTypes.bool,
  ariaDescribedby: PropTypes.string,
}

InputField.defaultProps = {
  type: 'text',
  showLabel: true,
  value: '',
  inputClassName: '',
  labelClassName: '',
  showPlaceholder: true,
  ariaRequired: false,
  ariaDescribedby: null,
}

export default memo(InputField)
