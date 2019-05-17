import React, { useState, useEffect } from 'react'
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
  const {
    user,
    myUserInfo,
    currentUser,
    userInterests,
    interestOptions,
    addUserInterests,
    updateUser,
  } = props
  const { location, description, nickname } = myUserInfo
  const [editProfile, setEditProfile] = useState(false)
  const [showModals, setShowModals] = useState({ 1: true, 2: true })
  const [currentInterestIds, setCurrentInterestsIds] = useState([])
  useEffect(() => {
    setCurrentInterestsIds(userInterests.map(item => item.id))
  }, [userInterests])
  const toggleEditProfile = () => setEditProfile(!editProfile)
  const handleEditReady = () => {
    // eslint-disable-next-line no-console
    console.log('adding user interests', currentInterestIds)
    addUserInterests({ userInterests: currentInterestIds })
    toggleEditProfile()
  }
  const closeModal = modal => () => {
    const newState = { ...showModals }
    newState[modal] = false
    setShowModals(newState)
  }

  return (
    <div className="profile-container">
      <div className="profile-header-container">
        <ProfileImage userId={user.id} />
        {user && <ProfileHeader username={user.username} location={location} />}
        {user === currentUser && (
          <EditButton
            toggleEditProfile={toggleEditProfile}
            isActive={editProfile}
            isHighlighted={!showModals[2] && showModals[1]}
          />
        )}
      </div>
      {!editProfile && <Description text={description} />}
      {editProfile && (
        <DescriptionTextEdit
          currentText={description}
          updateUser={updateUser}
        />
      )}
      <Interests
        editProfile={editProfile}
        handleEditReady={handleEditReady}
        userInterests={userInterests}
        currentInterestIds={currentInterestIds}
        setCurrentInterestsIds={setCurrentInterestsIds}
        interestOptions={interestOptions}
      />
      <Instructions closeModal={closeModal} showModals={showModals} />
    </div>
  )
}

Profile.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  myUserInfo: propTypes.instanceOf(Object).isRequired,
  currentUser: propTypes.instanceOf(Object).isRequired,
  userInterests: propTypes.instanceOf(Array).isRequired,
  interestOptions: propTypes.instanceOf(Array).isRequired,
  addUserInterests: propTypes.func.isRequired,
  updateUser: propTypes.func.isRequired,
}

export default Profile
