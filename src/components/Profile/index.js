import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ProfileImage from './ProfileImage'
import Description from './Description'
import InterestsGrid from './InterestsGrid'
import ProfileHeader from './ProfileHeader'
import EditButton from './EditButton'
import ButtonContainer from '../ButtonContainer'
import Tutorial from '../Tutorial'

const Profile = props => {
  const {
    mmuser,
    myUserInfo,
    ownProfile,
    userInterests,
    startDirectChannel,
    updateUser,
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

  const steps = [
    {
      target: '.nav-link-Profiili',
      content: 'Tämä on profiilisi! Löydät sen täältä.',
      disableBeacon: true,
    },
    {
      target: '.user-edit-button',
      content:
        'Profiilisi tiedot näkyvät myös muille. Voit muokata tietoja täältä.',
    },
    {
      target: '.nav-bot',
      content:
        'Jos tarvitset apua, tai haluat lähettää ylläpidolle viestin, voit klikata Bottia. Löydät Botin täältä.',
    },
  ]

  const updateTutorialWatched = () => updateUser({ tutorialWatched: true })

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
        <ProfileImage mmuser={mmuser} />
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
            <EditButton />
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
        <Tutorial
          steps={steps}
          history={history}
          updateTutorialWatched={updateTutorialWatched}
        />
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
  updateUser: propTypes.func.isRequired,
}

Profile.defaultProps = {
  ownProfile: false,
  startDirectChannel: null,
  userInterests: [],
  history: null,
}

export default memo(Profile)
