import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import './styles.scss'

const DateSelectField = React.forwardRef((props, ref) => {
  const {
    label,
    showLabel,
    ariaInvalid,
    ariaDescribedBy,
    inputClassName,
    name,
    onChange,
    value,
  } = props

  const years = []
  let year = new Date().getFullYear()
  const months = [
    { value: 1, label: 'Tammi' },
    { value: 2, label: 'Helmi' },
    { value: 3, label: 'Maalis' },
    { value: 4, label: 'Huhti' },
    { value: 5, label: 'Touko' },
    { value: 6, label: 'Kesä' },
    { value: 7, label: 'Heinä' },
    { value: 8, label: 'Elo' },
    { value: 9, label: 'Syys' },
    { value: 10, label: 'Loka' },
    { value: 11, label: 'Marras' },
    { value: 12, label: 'Joulu' },
  ]
  const days = []
  let day = 1
  let options = []

  const customStyles = {
    container: provided => ({
      ...provided,
      width: '100%',
    }),
    menu: provided => ({
      ...provided,
      border: '2px solid #f59023',
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'white',
      background: state.isSelected ? 'grey' : '#1c1c1c',
    }),
    control: provided => ({
      ...provided,
      borderRadius: 25,
      border: '1px solid #f59023',
      boxShadow: 'none',
      background: '#1c1c1c',
      color: 'white',
    }),
    input: () => ({
      color: 'white',
    }),
    singleValue: () => ({
      color: 'white',
    }),
    dropdownIndicator: provided => ({
      ...provided,
      color: '#f59023',
    }),
  }

  while (year >= 1900) {
    years.push({ value: year, label: year })
    year -= 1
  }

  while (day <= 31) {
    days.push({ value: day, label: day })
    day += 1
  }

  switch (name) {
    case 'day':
      options = days
      break
    case 'month':
      options = months
      break
    case 'year':
      options = years
      break
    default:
  }

  return (
    <div>
      <label htmlFor={label} className={inputClassName}>
        {showLabel && label}
        <Select
          id={label}
          name={name}
          ref={ref}
          options={options}
          isSearchable
          placeholder={label}
          aria-label={label}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          styles={customStyles}
          onChange={onChange}
          value={value.label}
        />
      </label>
    </div>
  )
})

DateSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  ariaInvalid: PropTypes.bool,
  ariaDescribedBy: PropTypes.string,
  inputClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

DateSelectField.defaultProps = {
  showLabel: false,
  ariaInvalid: false,
  ariaDescribedBy: '',
  inputClassName: '',
}

export default memo(DateSelectField)
