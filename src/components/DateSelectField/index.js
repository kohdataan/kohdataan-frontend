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

  const customStyles = {
    container: provided => ({
      ...provided,
      width: '33%',
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

  return (
    <div>
      <label htmlFor={label} className={inputClassName}>
        {showLabel && label}
      </label>
      {/* 
      <input
        type="number"
        list="day"
        name="day"
        min="1"
        max="31"
        ref={ref}
        id={label}
        aria-label={label}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        placeholder="Päivä"
        className="day-select-field"
      />
      <datalist id="day">
        {days.map(d => (
          <option value={d}>{d}</option>
        ))}
      </datalist>

      <input
        type="text"
        list="month"
        name="month"
        ref={ref}
        aria-label={label}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        placeholder="Kuukausi"
        className="month-select-field"
      />
      <datalist id="month">
        {months.map(month => (
          <option value={month.value} className="month-option">
            {month.label}
          </option>
        ))}
      </datalist>
      */}
      <div className="birthdate-selections">
        <Select
          name="day"
          options={days}
          isSearchable
          placeholder="Päivä"
          styles={customStyles}
          backspaceRemovesValue="true"
        />

        <Select
          name="month"
          options={months}
          isSearchable
          placeholder="Kuukausi"
          styles={customStyles}
          backspaceRemovesValue="true"
        />
        <Select
          name="year"
          options={years}
          isSearchable
          placeholder="Vuosi"
          styles={customStyles}
          backspaceRemovesValue="true"
        />
      </div>
      {/* 
      <input
        type="number"
        min="1900"
        max="2100"
        list="years"
        name="year"
        ref={ref}
        id={label}
        aria-label={label}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        placeholder="Vuosi"
        className="year-select-field"
      />
      <datalist id="years">
        {years.map(y => (
          <option value={y}>{y}</option>
        ))}
      </datalist>
      */}
    </div>
  )
})

DateSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  ariaInvalid: PropTypes.bool,
  ariaDescribedBy: PropTypes.string,
  inputClassName: PropTypes.string,
}

DateSelectField.defaultProps = {
  showLabel: true,
  ariaInvalid: false,
  ariaDescribedBy: '',
  inputClassName: '',
}

export default memo(DateSelectField)
