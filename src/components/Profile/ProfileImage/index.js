import React, { memo } from 'react'
import propTypes from 'prop-types'
import './styles.scss'

const ProfileImage = props => {
  const { mmuser } = props
  const imageUri = `${process.env.REACT_APP_MATTERMOST_URL}/api/v4/users/${
    mmuser.id
  }/image?${Date.now()}`
  return (
    <div className="profile-header-item">
      {mmuser.id && (
        <img className="profile-img" src={imageUri} alt="Profiilikuva" />
      )}
      <span className="sr-only">Profiilikuva</span>
    </div>
  )
}

ProfileImage.propTypes = {
  mmuser: propTypes.shape({
    id: propTypes.string,
    last_picture_update: propTypes.number,
  }).isRequired,
}

export default memo(ProfileImage)
