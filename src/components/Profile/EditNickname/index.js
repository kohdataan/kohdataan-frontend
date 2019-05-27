import React from 'react'
import PropTypes from 'prop-types'
import InputField from '../../InputField'
import './styles.scss'

const EditNickname = props => {
  const { onChange, value } = props
  return (
    <div className="profile-header-item">
      <InputField
        inputClassName="add-user-nickname-text"
        labelClassName="add-user-nickname-field profile-add-nickname"
        label="Kutsumanimi"
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

EditNickname.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default EditNickname
