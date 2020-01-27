import React, { memo } from 'react'
import './styles.scss'

const ProfileImage = props => {
  const { userId } = props || ''
  const imageUri = `${process.env.REACT_APP_MATTERMOST_URL}/api/v4/users/${userId}/image`
  return (
    <div className="profile-header-item">
      {userId && (
        <img className="profile-img" src={imageUri} alt="Profiilikuva" />
      )}
      <span className="sr-only">Profiilikuva</span>
    </div>
  )
}

export default memo(ProfileImage)
