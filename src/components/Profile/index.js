import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ProfileImage from './ProfileImage'
import Description from './Description'
import Interests from './Interests'
import ProfileHeader from './ProfileHeader'
import Instructions from './Instructions'
import EditButton from './EditButton'

const Profile = props => {
  const {
    user,
    myUserInfo,
    ownProfile,
    userInterests,
    interestOptions,
    updateUser,
    startDirect,
  } = props

  // Extended user info from node backend
  const { location, description, tutorialWatched, nickname } = myUserInfo

  // Decide whether to show modals
  const getShowModals = () => {
    return !!(!tutorialWatched && ownProfile)
  }

  const [showModals, setShowModals] = useState({
    1: getShowModals(),
    2: getShowModals(),
  })

  const [currentInterestIds, setCurrentInterestsIds] = useState([])

  useEffect(() => {
    setCurrentInterestsIds(userInterests.map(item => item.id))
  }, [userInterests])

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
        <Link className="" to="/me/edit">
          <EditButton isHighlighted={showModals[1] && !showModals[2]} />
        </Link>
      </div>
      <Description text={description} />
      <Link className="" to="/me/edit-interests">
        <EditButton />
      </Link>
      <div className="interests-container">
        <Interests
          userInterests={userInterests}
          currentInterestIds={currentInterestIds}
          setCurrentInterestsIds={setCurrentInterestsIds}
          interestOptions={interestOptions}
        />
      </div>
      <Instructions closeModal={closeModal} showModals={showModals} />
    </main>
  )
}

Profile.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  myUserInfo: propTypes.instanceOf(Object).isRequired,
  userInterests: propTypes.instanceOf(Array).isRequired,
  interestOptions: propTypes.instanceOf(Array).isRequired,
  startDirect: propTypes.func,
  ownProfile: propTypes.bool,
  updateUser: propTypes.func,
}

Profile.defaultProps = {
  updateUser: null,
  ownProfile: false,
  startDirect: null,
}

export default memo(Profile)
