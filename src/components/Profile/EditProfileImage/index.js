import React from 'react'
import Avatar from 'react-avatar-edit'
import PropTypes from 'prop-types'
import './styles.scss'

const EditProfileImage = props => {
  const { onChange } = props

  return (
    <div className="profile-header-item">
      <Avatar
        width={80}
        height={80}
        label="Valitse"
        onCrop={onChange}
        labelStyle={{ fontSize: '15px', fontWeight: 'bold' }}
      />
    </div>
  )
}

EditProfileImage.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default EditProfileImage
