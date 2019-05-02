import React from 'react'
import './styles.scss'

const ProfileImage = () => {
  return (
    <div className="profile-header-item">
      <i
        aria-hidden="true"
        className="profile-img far fa-user"
        title="Profiilikuva"
      />
      <span className="sr-only">Profiilikuva</span>
    </div>
  )
}

export default ProfileImage
