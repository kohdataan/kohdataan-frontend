import React from 'react'
import ShadowBox from '../../ShadowBox'
import Textarea from '../../TextField'
import './styles.scss'

const Description = props => {
  return (
    <ShadowBox>
      <div className="add-user-nickname-container">
        <h3 className="add-user-nickname-title">Kerro itsestäsi</h3>
        <Textarea
          inputClassName="add-user-nickname-text"
          labelClassName="add-user-nickname-field"
          label="Kuvaus"
        />
        <p className="add-user-nickname-title">Tämä kuvaus näkyy muille</p>
      </div>
    </ShadowBox>
  )
}

export default Description
