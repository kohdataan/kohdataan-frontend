import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ShadowBox from '../../ShadowBox'
import RadioButton from '../../RadioButton'
import './styles.scss'

const ShowAge = props => {
  const { setShowAge, setChoiceMade } = props
  setChoiceMade(false)
  const handleChange = value => {
    setShowAge(value)
    if (value !== null) {
      setChoiceMade(true)
    } else {
      setChoiceMade(false)
    }
  }
  // TODO: Show real age once date of birth is implemented.
  return (
    <ShadowBox>
      <main role="main" className="add-user-show-age-container">
        <div className="profile-creation-title-container">
          <h3 className="profile-creation-title">
            Ikäsi:
            <span className="add-user-show-age-value"> 18 vuotta</span>
          </h3>
          <span className="profile-creation-step-text">2/6</span>
        </div>
        <RadioButton
          label="Näytä ikä muille"
          name="agePermission"
          value="showAge"
          onChange={() => handleChange(true)}
        />
        <RadioButton
          label="Älä näytä ikää muille"
          name="agePermission"
          value="hideAge"
          onChange={() => handleChange(false)}
        />
      </main>
    </ShadowBox>
  )
}

ShowAge.propTypes = {
  setShowAge: PropTypes.func.isRequired,
  setChoiceMade: PropTypes.func.isRequired,
}

export default memo(ShowAge)
