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
      content: (
        <aside aria-label="tutoriaali-1" role="dialog" tabIndex={-1}>
          <p className="tutorial-step">1/6</p>
          <h1 className="tutorial-header">
            Seuraavilla sivuilla esittelemme sinulle Kohdataan-somen!
          </h1>
        </aside>
      ),
      placement: 'center',
      target: 'body',
      disableBeacon: true,
    },
    {
      target: '.nav-link-Profiili',
      content: (
        <>
          <p className="tutorial-step">2/6</p>
          <h1 className="tutorial-header">Tämä on oma profiilisi!</h1>
          <p className="tutorial-text">Löydät sen kohdasta Profiili.</p>
        </>
      ),
    },
    {
      target: '.user-edit-button',
      content: (
        <aside>
          <p className="tutorial-step">3/6</p>
          <h1 className="tutorial-header">
            Profiilisi tiedot näkyvät myös muille.
          </h1>
          <p className="tutorial-text">
            Voit muokata tietoja kohdasta Muokkaa.
          </p>
        </aside>
      ),
    },
    {
      target: '.nav-bot',
      content: (
        <aside>
          <p className="tutorial-step">4/6</p>
          <h1 className="tutorial-header">
            Jos tarvitset apua tai haluat lähettää valvojalle viestin, voit
            klikata Bottia.
          </h1>
          <p className="tutorial-text">Löydät sen kohdasta Botti.</p>
        </aside>
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
