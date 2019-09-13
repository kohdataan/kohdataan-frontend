import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ProfileImage from './ProfileImage'
import Description from './Description'
import Interests from './Interests'
import EditButton from './EditButton'
import ProfileHeader from './ProfileHeader'
import DescriptionTextEdit from './DescriptionTextEdit'
import Instructions from './Instructions'
import EditProfileImage from './EditProfileImage'
import EditNickname from './EditNickname'

const Profile = props => {
  const {
    user,
    myUserInfo,
    currentUser,
    loggedInUser,
    userInterests,
    interestOptions,
    addUserInterests,
    updateProfilePicture,
    updateUser,
    startDirect,
    setImg,
  } = props
  const { location, description, tutorialWatched, nickname } = myUserInfo
  const getShowModals = () => {
    return !!(!tutorialWatched && currentUser)
  }
  const [editProfile, setEditProfile] = useState(false)
  const [showModals, setShowModals] = useState({
    1: getShowModals(),
    2: getShowModals(),
  })
  const [currentInterestIds, setCurrentInterestsIds] = useState([])
  const [newNickname, setNewNickname] = useState('')

  useEffect(() => {
    setCurrentInterestsIds(userInterests.map(item => item.id))
  }, [userInterests])

  const [updatedDescription, setUpdatedDescription] = useState(description)

  const toggleEditProfile = () => setEditProfile(!editProfile)

  const handleEditReady = () => {
    updateUser({
      description: updatedDescription,
      nickname: newNickname || nickname,
      mmid: currentUser.id,
    })
    addUserInterests({ userInterests: currentInterestIds })
    updateProfilePicture()
    toggleEditProfile()
  }

  const closeModal = modal => () => {
    const newState = { ...showModals }
    newState[modal] = false
    setShowModals(newState)
    if (modal === 2 && currentUser) {
      updateUser({ tutorialWatched: true })
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-header-container">
        {!editProfile && <ProfileImage userId={user.id} />}
        {editProfile && <EditProfileImage onChange={setImg} />}
        {user && myUserInfo && !editProfile && (
          <ProfileHeader
            nickname={nickname || user.username}
            location={location}
            startDirect={startDirect}
            currentUser={currentUser}
          />
        )}

        {editProfile && (
          <EditNickname
            value={newNickname}
            onChange={e => {
              setNewNickname(e.target.value)
            }}
          />
        )}
        {currentUser && (
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
          currentText={
            typeof updatedDescription === 'string'
              ? updatedDescription
              : description || ''
          }
          onChange={setUpdatedDescription}
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
  userInterests: propTypes.instanceOf(Array).isRequired,
  interestOptions: propTypes.instanceOf(Array).isRequired,
  addUserInterests: propTypes.func,
  updateProfilePicture: propTypes.func,
  startDirect: propTypes.func,
  currentUser: propTypes.instanceOf(Object),
  updateUser: propTypes.func,
  setImg: propTypes.func,
}

Profile.defaultProps = {
  updateUser: null,
  currentUser: null,
  addUserInterests: null,
  updateProfilePicture: null,
  setImg: null,
}

export default memo(Profile)
