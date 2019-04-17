import React from 'react'
import './styles.scss'
import ProfileImage from './ProfileImage'
import Description from './Description'
import Interests from './Interests'
import EditButton from './EditButton'
import ProfileHeader from './ProfileHeader'

const Profile = props => {
  const { user } = props || {}
  const descriptionText = 'Esimerkkikuvaus käyttäjästä'
  const editProfileRoute = '/muokkaa'

  return (
    <div>
      <div className="profile-container">
        <ProfileImage />
        {user && <ProfileHeader username={user.username} />}
        <EditButton route={editProfileRoute} />
      </div>
      <Description text={descriptionText} />
      <Interests />
    </div>
  )
}

export default Profile
