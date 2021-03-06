import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ShadowBox from '../../ShadowBox'
import InputField from '../../InputField'
import './styles.scss'

const Nickname = (props) => {
  const { onChange, value, hideStep } = props
  return (
    <ShadowBox>
      <div className="add-user-nickname-container">
        <div className="profile-creation-title-container">
          <h2 className="profile-creation-title">Kerro kuka olet.</h2>
          {!hideStep && <span className="profile-creation-step-text">1/6</span>}
        </div>
        <InputField
          inputClassName="add-user-nickname-text"
          labelClassName="add-user-nickname-field"
          label="Kutsumanimi"
          showLabel={false}
          onChange={onChange}
          value={value}
          ariaRequired
          ariaDescribedby="describe-nickname-input"
        />
        <p className="add-user-nickname-title" id="describe-nickname-input">
          Tämä nimi näkyy muille.
        </p>
      </div>
    </ShadowBox>
  )
}

Nickname.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  hideStep: PropTypes.bool,
}

Nickname.defaultProps = {
  hideStep: false,
}

export default memo(Nickname)
