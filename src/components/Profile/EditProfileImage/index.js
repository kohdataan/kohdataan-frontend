import React, { memo } from 'react'
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
        borderStyle={{
          border: '2px dashed rgb(151, 151, 151)',
          borderRadius: '50%',
          textAlign: 'center',
        }}
      />
    </div>
  )
}

EditProfileImage.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default memo(EditProfileImage)
