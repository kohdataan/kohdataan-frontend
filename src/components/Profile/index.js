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
    currentUserId,
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
      content: (
        <>
          <p className="tutorial-text">Tämä on profiilisi!</p>
          <p className="tutorial-text">Löydät sen täältä.</p>
        </>
      ),
      disableBeacon: true,
    },
    {
      target: '.user-edit-button',
      content: (
        <>
          <p className="tutorial-text">
            Profiilisi tiedot näkyvät myös muille.
          </p>
          <p className="tutorial-text">Voit muokata tietoja täältä.</p>
        </>
      ),
    },
    {
      target: '.nav-bot',
      content: (
        <>
          <p className="tutorial-text">
            Jos tarvitset apua, tai haluat lähettää ylläpidolle viestin, voit
            klikata Bottia.
          </p>
          <p className="tutorial-text">Löydät Botin täältä.</p>
        </>
      ),
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
      <header className="profile-header-container">
        <ProfileImage mmuser={mmuser} />
        {mmuser && myUserInfo && (
          <ProfileHeader
            nickname={nickname}
            location={location}
            birthdate={birthdate}
            showAge={showAge}
            showLocation={showLocation}
          />
        )}
        {ownProfile && (
          <Link className="edit-me-link" to="/edit-me">
            <EditButton label="muokkaa profiilia"/>
          </Link>
        )}
      </header>
      <Description text={description} />

      <section className="interests-container">
        <div className="interests-header">
          <h2 className="profile-secondary-header">Minua kiinnostaa</h2>
          {ownProfile && (
            <Link className="edit-interests-link" to="/edit-interests">
              <EditButton
                isHighlighted={false}
                label="muokkaa mielenkiinnon kohteita"
              />
            </Link>
          )}
        </div>
        <InterestsGrid interestList={userInterests} />
      </section>

      {!ownProfile &&
        startDirectChannel &&
        myUserInfo.blockedUsers &&
        !myUserInfo.blockedUsers.includes(currentUserId) && (
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
  currentUserId: propTypes.string,
  mmuser: propTypes.instanceOf(Object).isRequired,
  myUserInfo: propTypes.instanceOf(Object).isRequired,
  userInterests: propTypes.instanceOf(Array),
  ownProfile: propTypes.bool,
  startDirectChannel: propTypes.func,
  history: propTypes.instanceOf(Object),
  updateUser: propTypes.func,
}

Profile.defaultProps = {
  ownProfile: false,
  startDirectChannel: null,
  userInterests: [],
  history: null,
  updateUser: null,
  currentUserId: null,
}

export default memo(Profile)
