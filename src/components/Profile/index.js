import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ProfileImage from './ProfileImage'
import Description from './Description'
import Interests from './Interests'
import ProfileHeader from './ProfileHeader'
import Instructions from './Instructions'
import EditProfile from './EditProfile'
import EditButton from './EditButton'
import EditInterests from './EditInterests'

const Profile = props => {
  const {
    user,
    myUserInfo,
    ownProfile,
    userInterests,
    interestOptions,
    addUserInterests,
    updateProfilePicture,
    updateUser,
    startDirect,
    setImg,
  } = props

  // Extended user info from node backend
  const { location, description, tutorialWatched, nickname } = myUserInfo

  // Decide whether to show modals
  const getShowModals = () => {
    return !!(!tutorialWatched && ownProfile)
  }

  const [editProfile, setEditProfile] = useState(false)
  const [editInterests, setEditInterests] = useState(false)
  const [showModals, setShowModals] = useState({
    1: getShowModals(),
    2: getShowModals(),
  })

  const [currentInterestIds, setCurrentInterestsIds] = useState([])
  const [newNickname, setNewNickname] = useState('')
  const [updatedDescription, setUpdatedDescription] = useState(description)

  useEffect(() => {
    setCurrentInterestsIds(userInterests.map(item => item.id))
  }, [userInterests])

  const toggleEditProfile = () => setEditProfile(!editProfile)
  const toggleEditInterests = () => setEditInterests(!editInterests)

  const handleEditReady = () => {
    /*
    updateUser({
      description: updatedDescription,
      nickname: newNickname || nickname,
      mmid: user.id,
    })
    */
    updateProfilePicture()
    toggleEditProfile()
  }

  const handleInterestEditReady = newInterests => {
    addUserInterests({ userInterests: newInterests })
    toggleEditInterests()
  }

  const closeModal = modal => () => {
    const newState = { ...showModals }
    newState[modal] = false
    setShowModals(newState)
    if (modal === 2 && ownProfile) {
      updateUser({ tutorialWatched: true })
    }
  }
  console.log(myUserInfo)

  return (
    <>
      {editProfile && (
        <EditProfile
          myUserInfo={myUserInfo}
          setNewNickname={setNewNickname}
          newNickname={newNickname}
          setUpdatedDescription={setUpdatedDescription}
          setImg={setImg}
          handleEditReady={handleEditReady}
        />
      )}
      {editInterests && (
        <EditInterests
          interestOptions={interestOptions}
          userInterests={userInterests}
          currentInterestIds={currentInterestIds}
          handleInterestEditReady={handleInterestEditReady}
        />
      )}
      {!editProfile && !editInterests && (
        <main className="profile-container">
          <div className="profile-header-container">
            <ProfileImage userId={user.id} />
            {user && myUserInfo && (
              <ProfileHeader
                nickname={nickname || user.username}
                location={location}
                startDirect={startDirect}
                currentUser={user}
              />
            )}
            {ownProfile && (
              <EditButton
                toggleEditProfile={toggleEditProfile}
                isHighlighted={showModals[1] && !showModals[2]}
              />
            )}
          </div>
          <Description text={description} />
          {ownProfile && <EditButton toggleEditProfile={toggleEditInterests} />}
          <div className="interests-container">
            <Interests
              editProfile={editProfile}
              handleEditReady={handleEditReady}
              userInterests={userInterests}
              currentInterestIds={currentInterestIds}
              setCurrentInterestsIds={setCurrentInterestsIds}
              interestOptions={interestOptions}
            />
          </div>
          <Instructions closeModal={closeModal} showModals={showModals} />
        </main>
      )}
    </>
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
  ownProfile: propTypes.bool,
  updateUser: propTypes.func,
  setImg: propTypes.func,
}

Profile.defaultProps = {
  updateUser: null,
  ownProfile: false,
  addUserInterests: null,
  updateProfilePicture: null,
  setImg: null,
  startDirect: null,
}

export default memo(Profile)
