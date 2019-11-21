import React, { memo } from 'react'
import PropTypes from 'prop-types'

const DateSelectField = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    showLabel,
    ariaInvalid,
    ariaDescribedBy,
    inputClassName,
    labelClassName,
  } = props
  return (
    <label htmlFor={label} className={inputClassName}>
      {showLabel && label}
      <select
        name={"day"}
        ref={ref}
        id={label}
        aria-label={label}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        placeholder={"day"}
        className={labelClassName}
      >
        <option value={0} disabled selected> Päivä </option>
        {paivat.map(paiva => (
            <option value={paiva}>{paiva}</option>            
        ))}
      </select>
      <select
        name={"month"}
        ref={ref}
        id={label}
        aria-label={label}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        placeholder={"month"}
        className={labelClassName}
      >
        <option value="" disabled selected> Kuukausi </option>
        {kuukaudet.map(kuukausi => ( 
            <option value={kuukausi.kuukausi}>{kuukausi.nimi}</option>            
        ))}
      </select>
      <select
        name={"year"}
        ref={ref}
        id={label}
        aria-label={label}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        placeholder={"year"}
        className={labelClassName}
      >
        <option value={0} disabled selected> Vuosi </option>
        {vuodet.map(vuosi => (
            <option value={vuosi}>{vuosi}</option>            
        ))}
      </select> 
  </label>
  )
})

const kuukaudet = [
  {kuukausi: 1, nimi: "Tammikuu"},
  {kuukausi: 2, nimi: "Helmikuu"},
  {kuukausi: 3, nimi: "Maaliskuu"},
  {kuukausi: 4, nimi: "Huhtikuu"},
  {kuukausi: 5, nimi:  "Toukokuu"},
  {kuukausi: 6, nimi:  "Kesäkuu"},
  {kuukausi: 7, nimi:  "Heinäkuu"},
  {kuukausi: 8, nimi:  "Elokuu"},
  {kuukausi: 9, nimi:  "Syyskuu"},
  {kuukausi: 10, nimi:  "Lokakuu"},
  {kuukausi: 11, nimi:  "Marraskuu"},
  {kuukausi: 12, nimi:  "Joulukuu"}
]

var vuodet = []

var vuosi = new Date().getFullYear();

while (vuosi >= 1900)
{
  vuodet.push(vuosi)
  vuosi--
}

var paivat = []
var paiva = 1
while (paiva <= 31)
{
  paivat.push(paiva)
  paiva++
}



DateSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  ariaInvalid: PropTypes.bool,
  ariaDescribedBy: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
}

DateSelectField.defaultProps = {
  showLabel: true,
  ariaInvalid: false,
  ariaDescribedBy: '',
  inputClassName: '',
  labelClassName: ''
}

export default memo(DateSelectField)
