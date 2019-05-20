import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import ShadowBox from '../../ShadowBox'
import getLocations from '../../../api/location'
import './styles.scss'

const Location = props => {
  const [locations, setLocations] = useState([])
  const { value, onChange } = props

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

  return (
    <ShadowBox>
      <div className="add-user-location-container">
        <h3 className="add-user-location-title">Asuinpaikka</h3>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={locations[0]}
          placeholder="Asuinpaikka"
          isSearchable
          name="color"
          options={locations}
          value={value}
          onChange={onChange}
        />
        <p className="add-user-location-title">Tämä tieto näkyy muille</p>
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
}

export default Location
