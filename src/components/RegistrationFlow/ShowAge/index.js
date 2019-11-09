import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ShadowBox from '../../ShadowBox'
import RadioButton from '../../RadioButton'
import './styles.scss'

const ShowAge = props => {
  const { setShowAge } = props

  // TODO: Show real age once date of birth is implemented.
  return (
    <ShadowBox>
      <div className="add-user-show-age-container">
        <div className="profile-creation-title-container">
          <h3 className="profile-creation-title">IKÄSI: <span className="add-user-show-age-value">18 vuotta</span></h3>
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
}

export default memo(ShowAge)
