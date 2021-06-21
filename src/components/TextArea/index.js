import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const TextArea = (props) => {
  const {
    label,
    showLabel,
    value,
    inputClassName,
    labelClassName,
    onChange,
    maxLength,
    rows,
    ariaDescribedby,
  } = props
  return (
    <label htmlFor={label} className={inputClassName}>
      {showLabel && label}
      <textarea
        type="text"
        name={label}
        id={label}
        aria-label={label}
        value={value}
        placeholder={label}
        className={labelClassName}
        onChange={onChange}
        maxLength={maxLength}
        rows={rows}
        aria-describedby={ariaDescribedby}
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
  ariaDescribedby: PropTypes.string,
}

TextArea.defaultProps = {
  showLabel: true,
  value: '',
  inputClassName: '',
  labelClassName: '',
  maxLength: 1000,
  rows: 4,
  ariaDescribedby: null,
}

export default memo(TextArea)
