import React, { useState, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ProfileImage from './ProfileImage'
import Description from './Description'
import InterestsGrid from './InterestsGrid'
import ProfileHeader from './ProfileHeader'
import Instructions from './Instructions'
import EditButton from './EditButton'

const Profile = props => {
  const { mmuser, myUserInfo, ownProfile, userInterests, updateUser } = props

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

  const closeModal = modal => () => {
    const newState = { ...showModals }
    newState[modal] = false
    setShowModals(newState)
    if (modal === 2 && ownProfile) {
      updateUser({ tutorialWatched: true })
    }
  }

  return (
    <main className="profile-container">
      <div className="profile-header-container">
        <ProfileImage userId={mmuser.id} />
        {mmuser && myUserInfo && (
          <ProfileHeader
            nickname={nickname || mmuser.username}
            location={location}
            currentUser={mmuser}
          />
        )}
        {ownProfile && (
          <Link className="" to="/edit-me">
            <EditButton isHighlighted={showModals[1] && !showModals[2]} />
          </Link>
        )}
      </div>
      <Description text={description} />
      {ownProfile && (
        <Link className="" to="/edit-interests">
          <EditButton isHighlighted={false} />
        </Link>
      )}
      <div className="interests-container">
        <InterestsGrid interestList={userInterests} />
      </div>
      <Instructions closeModal={closeModal} showModals={showModals} />
    </main>
  )
}

Profile.propTypes = {
  mmuser: propTypes.instanceOf(Object).isRequired,
  myUserInfo: propTypes.instanceOf(Object).isRequired,
  userInterests: propTypes.instanceOf(Array).isRequired,
  ownProfile: propTypes.bool,
  updateUser: propTypes.func,
}

Profile.defaultProps = {
  updateUser: null,
  ownProfile: false,
}

export default memo(Profile)
