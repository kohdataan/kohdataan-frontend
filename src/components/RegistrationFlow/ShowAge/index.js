import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ShadowBox from '../../ShadowBox'
import RadioButton from '../../RadioButton'
import './styles.scss'

const ShowAge = props => {
  const { onChange, age } = props

  return (
    <ShadowBox>
      <main role="main" className="add-user-show-age-container">
        <div className="profile-creation-title-container">
          <h3 className="profile-creation-title">
            Ikäsi:
            <span className="add-user-show-age-value"> {age} vuotta</span>
          </h3>

          <span className="profile-creation-step-text">2/6</span>
        </div>
        <RadioButton
          label="Näytä ikä muille"
          name="agePermission"
          value="showAge"
          onChange={() => onChange(true)}
          checked={showAge === 'true'}
        />
        <RadioButton
          label="Älä näytä ikää muille"
          name="agePermission"
          value="hideAge"
          onChange={() => onChange(false)}
          checked={showAge === 'false'}
        />
      </main>
    </ShadowBox>
  )
}

ShowAge.propTypes = {
  onChange: PropTypes.func.isRequired,
  age: PropTypes.string.isRequired,
}

export default memo(ShowAge)
