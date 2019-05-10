import React from 'react'
import Select from 'react-select'
import ShadowBox from '../../ShadowBox'
import './styles.scss'

const Location = () => {
  const locations = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' },
  ]
  return (
    <ShadowBox>
      <div className="add-user-nickname-container">
        <h3 className="add-user-nickname-title">Asuinpaikka</h3>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={locations[0]}
          isSearchable
          name="color"
          options={locations}
        />
        <p className="add-user-nickname-title">Tämä nimi näkyy muille</p>
      </div>
    </ShadowBox>
  )
}

export default Location
