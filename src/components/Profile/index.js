import React, { useState } from 'react'
import './styles.scss'
import ProfileImage from './ProfileImage'
import Description from './Description'
import Interests from './Interests'
import EditButton from './EditButton'
import ProfileHeader from './ProfileHeader'
import DescriptionTextEdit from './DescriptionTextEdit'

const Profile = props => {
  const { user } = props || {}
  const [editProfile, setEditProfile] = useState(false)
  const descriptionText = 'Esimerkkikuvaus käyttäjästä'

  const toggleEditProfile = () =>
    editProfile ? setEditProfile(false) : setEditProfile(true)

  return (
    <div className="profile-container">
      <div className="profile-header-container">
        <ProfileImage />
        {user && <ProfileHeader username={user.username} />}
        <EditButton
          toggleEditProfile={toggleEditProfile}
          isActive={editProfile}
        />
      </div>
      {!editProfile && <Description text={descriptionText} />}
      {editProfile && <DescriptionTextEdit currentText={descriptionText} />}
      <Interests />
    </div>
  )
}

export default Profile
