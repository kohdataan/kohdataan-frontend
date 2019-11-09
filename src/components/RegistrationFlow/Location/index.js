import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import ShadowBox from '../../ShadowBox'
import RadioButton from '../../RadioButton'
import getLocations from '../../../api/location'
import './styles.scss'

const Location = props => {
  const [locations, setLocations] = useState([])
  const { value, onChange, setShowLocation } = props

  useEffect(() => {
    async function fetchLocations() {
      const fetchedLocations = await getLocations(
        localStorage.getItem('authToken')
      )
      setLocations(
        fetchedLocations.map(location => {
          return { value: location, label: location }
        })
      )
    }
    fetchLocations()
  }, [])

  const customStyles = {
    menu: provided => ({
      ...provided,
      borderRadius: 0,
      border: '1px solid black',
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      backgroundColor: state.isSelected ? 'lightgrey' : 'white',
    }),
    control: provided => ({
      ...provided,
      borderRadius: 0,
      marginTop: '5%',
      border: '1px solid black',
      boxShadow: 'none',
    }),
    dropdownIndicator: provided => ({
      ...provided,
      color: '#f59023',
    }),
  }

  return (
    <ShadowBox>
      <div className="add-user-location-container">
        <div className="profile-creation-title-container">
          <h3 className="profile-creation-title">Asuinpaikkasi</h3>
          <span className="profile-creation-step-text">3/6</span>
        </div>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={locations[0]}
          placeholder="Kirjoita"
          isSearchable
          name="color"
          options={locations}
          value={value}
          onChange={onChange}
          styles={customStyles}
        />
        <RadioButton
          label="Näytä asuinpaikka muille"
          name="locationPermission"
          value="showLocation"
          onChange={() => setShowLocation(true)}
        />
        <RadioButton
          label="Älä näytä asuinpaikkaa muille"
          name="locationPermission"
          value="hideLocation"
          onChange={() => setShowLocation(false)}
        />
      </div>
    </ShadowBox>
  )
}

Location.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Object).isRequired,
    PropTypes.string,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  setShowLocation: PropTypes.func.isRequired,
}

export default memo(Location)
