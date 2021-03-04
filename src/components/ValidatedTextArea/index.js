import React, { memo } from 'react'
import PropTypes from 'prop-types'

const ValidatedTextArea = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    showLabel,
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
        name={name}
        id={label}
        ref={ref}
        className={labelClassName}
        onChange={onChange}
        maxLength={maxLength}
        rows={rows}
      />
    </label>
  )
})

ValidatedTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
}

ValidatedTextArea.defaultProps = {
  showLabel: true,
  inputClassName: '',
  labelClassName: '',
  maxLength: 1000,
  rows: 4,
}

export default memo(ValidatedTextArea)
