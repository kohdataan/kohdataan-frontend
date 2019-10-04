import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const Checkbox = props => {
  const { label, onChange, checked } = props
  console.log('Checkbox props', props)
  return (
    <label className="container">
      <input type="checkbox" onChange={onChange} checked={checked} />
      <span className="checkmark" />
      {label}
    </label>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
}

export default memo(Checkbox)
