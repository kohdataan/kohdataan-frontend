import React, { memo } from 'react'
import PropTypes from 'prop-types'

const ValidatedInputField = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    showLabel,
    showPlaceholder,
    onChange,
    ariaInvalid,
    inputClassName,
    labelClassName,
    type,
  } = props
  return (
    <label htmlFor={label} className={inputClassName}>
      {showLabel && label}
      <input
        type={type}
        name={name}
        ref={ref}
        id={label}
        onChange={onChange}
        aria-label={label}
        aria-invalid={ariaInvalid}
        placeholder={showPlaceholder ? label : ''}
        className={labelClassName}
      />
    </label>
  )
})

ValidatedInputField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  showLabel: PropTypes.bool,
  showPlaceholder: PropTypes.bool,
  ariaInvalid: PropTypes.bool,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
}

ValidatedInputField.defaultProps = {
  type: 'text',
  showLabel: true,
  showPlaceholder: true,
  ariaInvalid: false,
  inputClassName: '',
  labelClassName: '',
  onChange: null,
}

export default memo(ValidatedInputField)
