import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ShadowBox from '../../ShadowBox'
import InputField from '../../InputField'
import './styles.scss'

const Nickname = props => {
  const { onChange, value } = props
  return (
    <ShadowBox>
      <div className="add-user-nickname-container">
        <h3 className="add-user-nickname-title">Kerro kuka olet</h3>
        <InputField
          inputClassName="add-user-nickname-text"
          labelClassName="add-user-nickname-field"
          label="Kutsumanimi"
          onChange={onChange}
          value={value}
        />
        <p className="add-user-nickname-title">Tämä nimi näkyy muille</p>
      </div>
    </ShadowBox>
  )
}

Nickname.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default memo(Nickname)
