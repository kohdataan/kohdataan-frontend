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
import ButtonContainer from '../ButtonContainer'

const Profile = props => {
  const {
    mmuser,
    myUserInfo,
    ownProfile,
    userInterests,
    startDirectChannel,
    history,
  } = props

  // Extended user info from node backend
  const {
    location,
    description,
    tutorialWatched,
    nickname,
    birthdate,
    showAge,
    showLocation,
  } = myUserInfo
  // Decide whether to show modals
  const getShowModals = () => {
    return !!(!tutorialWatched && ownProfile)
  }

  const [showModals, setShowModals] = useState({
    1: getShowModals(),
    2: getShowModals(),
    3: getShowModals(),
  })

  const closeModal = modal => () => {
    const newState = { ...showModals }
    newState[modal] = false
    setShowModals(newState)
    if (modal === 3 && ownProfile) {
      history.push('/friends')
    }
  }

  return (
    <main className="profile-container">
      <div className="go-back-button-container">
        {!ownProfile && startDirectChannel && (
          <ButtonContainer
            onClick={history.goBack}
            className="profile-modal-header-button"
          >
            {'< Palaa'}
          </ButtonContainer>
        )}
      </div>
      <div className="profile-header-container">
        <ProfileImage userId={mmuser.id} />
        {mmuser && myUserInfo && (
          <ProfileHeader
            nickname={nickname || mmuser.username}
            location={location}
            birthdate={birthdate}
            showAge={showAge}
            showLocation={showLocation}
          />
        )}
        {ownProfile && (
          <Link className="edit-me-link" to="/edit-me">
            <EditButton isHighlighted={showModals[1] && !showModals[2]} />
          </Link>
        )}
      </div>
      <Description text={description} />

      <div className="interests-container">
        <div className="interests-header">
          <h2>Minua kiinnostaa</h2>
          {ownProfile && (
            <Link className="edit-interests-link" to="/edit-interests">
              <EditButton isHighlighted={false} />
            </Link>
          )}
        </div>
        <InterestsGrid interestList={userInterests} />
      </div>

      {!ownProfile && startDirectChannel && (
        <div className="start-conversation-button">
          <ButtonContainer
            onClick={startDirectChannel}
            className="profile-dm-button"
          >
            Lähetä viesti
          </ButtonContainer>
        </div>
      )}
      {!tutorialWatched && ownProfile && (
        <Instructions closeModal={closeModal} showModals={showModals} />
      )}
    </main>
  )
}

Profile.propTypes = {
  mmuser: propTypes.instanceOf(Object).isRequired,
  myUserInfo: propTypes.instanceOf(Object).isRequired,
  userInterests: propTypes.instanceOf(Array),
  ownProfile: propTypes.bool,
  startDirectChannel: propTypes.func,
  history: propTypes.instanceOf(Object),
}

Profile.defaultProps = {
  ownProfile: false,
  startDirectChannel: null,
  userInterests: [],
  history: null,
}

export default memo(Profile)
