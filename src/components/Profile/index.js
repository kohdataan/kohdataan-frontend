import React, { useState } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ProfileImage from './ProfileImage'
import Description from './Description'
import Interests from './Interests'
import EditButton from './EditButton'
import ProfileHeader from './ProfileHeader'
import DescriptionTextEdit from './DescriptionTextEdit'
import Instructions from './Instructions'

const Profile = props => {
  const { user, currentUser } = props
  const [editProfile, setEditProfile] = useState(false)
  const [showModals, setShowModals] = useState({ 1: true, 2: true })
  const descriptionText = 'Esimerkkikuvaus käyttäjästä'

  const toggleEditProfile = () => setEditProfile(!editProfile)

  const closeModal = modal => () => {
    const newState = { ...showModals }
    newState[modal] = false
    setShowModals(newState)
  }

  return (
    <div className="profile-container">
      <div className="profile-header-container">
        <ProfileImage />
        {user && <ProfileHeader username={user.username} />}
        {user === currentUser && (
          <EditButton
            toggleEditProfile={toggleEditProfile}
            isActive={editProfile}
          />
        )}
      </div>
      {!editProfile && <Description text={descriptionText} />}
      {editProfile && <DescriptionTextEdit currentText={descriptionText} />}
      <Interests
        editProfile={editProfile}
        toggleEditProfile={toggleEditProfile}
      />
      <Instructions closeModal={closeModal} showModals={showModals} />
    </div>
  )
}

Profile.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  currentUser: propTypes.instanceOf(Object).isRequired,
}

export default Profile
