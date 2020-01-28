import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import './styles.scss'

const DateSelectField = React.forwardRef((props, ref) => {
  const {
    label,
    showLabel,
    ariaInvalid,
    errors,
    ariaDescribedBy,
    inputClassName,
    labelClassName,
    noOptionsMessage,
    name,
    onChange,
    value,
  } = props
  const years = []
  let year = new Date().getFullYear()
  const months = [
    { value: '01', label: 'Tammi' },
    { value: '02', label: 'Helmi' },
    { value: '03', label: 'Maalis' },
    { value: '04', label: 'Huhti' },
    { value: '05', label: 'Touko' },
    { value: '06', label: 'Kesä' },
    { value: '07', label: 'Heinä' },
    { value: '08', label: 'Elo' },
    { value: '09', label: 'Syys' },
    { value: '10', label: 'Loka' },
    { value: '11', label: 'Marras' },
    { value: '12', label: 'Joulu' },
  ]
  const days = [
    { value: 1, label: '01' },
    { value: 2, label: '02' },
    { value: 3, label: '03' },
    { value: 4, label: '04' },
    { value: 5, label: '05' },
    { value: 6, label: '06' },
    { value: 7, label: '07' },
    { value: 8, label: '08' },
    { value: 9, label: '09' },
  ]
  let day = 10
  let options = []

  const getBorderStyle = isFocused => {
    let border = '1px solid #f59023'
    if (isFocused) {
      border = '1px solid white'
    } else if (
      errors &&
      (errors.ref.name === 'day' ||
        errors.ref.name === 'month' ||
        errors.ref.name === 'year')
    ) {
      border = '1px solid #ff5c69'
    }
    return border
  }

  const customStyles = {
    container: provided => ({
      ...provided,
      width: '100%',
    }),
    menu: provided => ({
      ...provided,
      border: '2px solid #f59023',
    }),
    placeholder: provided => ({
      ...provided,
      color: 'white',
      fontSize: '15px',
    }),
    clearIndicator: provided => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: provided => ({
      ...provided,
      padding: '1px',
    }),
    indicatorSeparator: provided => ({
      ...provided,
      display: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'white',
      background: state.isFocused ? 'grey' : '#1c1c1c',
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: 25,
      border: state.isFocused ? getBorderStyle(true) : getBorderStyle(false),
      boxShadow: 'none',
      background: '#3a3a3a',
      color: 'white',
      minWidth: '20vw',
      margin: '0',
    }),
    input: () => ({
      color: 'white',
    }),
    singleValue: () => ({
      color: 'white',
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
    <label htmlFor={label} className={labelClassName}>
      {showLabel && label}
      <Select
        id={label}
        name={name}
        options={options}
        ref={ref}
        isSearchable
        isClearable
        isRequired
        placeholder={label}
        aria-label={label}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        styles={customStyles}
        onChange={onChange}
        className={inputClassName}
        value={value.label}
        noOptionsMessage={noOptionsMessage}
      />
    </label>
  )
})

DateSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  ariaInvalid: PropTypes.bool,
  errors: PropTypes.instanceOf(Object),
  ariaDescribedBy: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  noOptionsMessage: PropTypes.func.isRequired,
}

DateSelectField.defaultProps = {
  showLabel: false,
  ariaInvalid: false,
  errors: null,
  ariaDescribedBy: '',
  inputClassName: '',
  labelClassName: '',
}

export default memo(DateSelectField)
