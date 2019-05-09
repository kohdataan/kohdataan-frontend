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
  const [showModal1, setShowModal1] = useState(true)
  const [showModal2, setShowModal2] = useState(true)
  const descriptionText = 'Esimerkkikuvaus käyttäjästä'

  const toggleEditProfile = () => setEditProfile(!editProfile)
  const closeModal = i => () =>
    i === 1 ? setShowModal1(false) : setShowModal2(false)

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
      <Instructions
        showModal1={showModal1}
        closeModal={closeModal}
        showModal2={showModal2}
      />
    </div>
  )
}

Profile.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  currentUser: propTypes.instanceOf(Object).isRequired,
}

export default Profile
