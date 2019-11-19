import React, { memo } from 'react'
import PropTypes from 'prop-types'

const ValidatedInputField = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    showLabel,
    ariaInvalid,
    ariaDescribedBy,
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
        aria-label={label}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        placeholder={label}
        className={labelClassName}
      />
    </label>
  )
})

ValidatedInputField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  ariaInvalid: PropTypes.bool,
  ariaDescribedBy: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
}

ValidatedInputField.defaultProps = {
  type: 'text',
  showLabel: true,
  ariaInvalid: false,
  ariaDescribedBy: '',
  inputClassName: '',
  labelClassName: '',
}

export default memo(ValidatedInputField)
