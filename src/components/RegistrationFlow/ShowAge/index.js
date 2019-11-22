import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ShadowBox from '../../ShadowBox'
import RadioButton from '../../RadioButton'
import './styles.scss'

const ShowAge = props => {
  const { setShowAge, age } = props

  return (
    <ShadowBox>
      <div className="add-user-show-age-container">
        <div className="add-user-show-age-text-container">
          <span>
            <span className="add-user-show-age-title">IKÄSI:</span> {age} vuotta
          </span>
          <span className="profile-creation-step-text">2/6</span>
        </div>
        <RadioButton
          label="Näytä ikä muille"
          name="agePermission"
          value="showAge"
          onChange={() => setShowAge(true)}
        />
        <RadioButton
          label="Älä näytä ikää muille"
          name="agePermission"
          value="hideAge"
          onChange={() => setShowAge(false)}
        />
      </div>
    </ShadowBox>
  )
}

ShowAge.propTypes = {
  setShowAge: PropTypes.func.isRequired,
  age: PropTypes.string.isRequired,
}

export default memo(ShowAge)
