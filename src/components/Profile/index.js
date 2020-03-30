import React, { memo, useEffect, useState } from 'react'
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

  const [returnToTutorial, setReturnToTutorial] = useState(false)

  useEffect(() => {
    if (history.location.state && history.location.state.navigateBack) {
      setReturnToTutorial(true)
    }
  }, [])

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

  const goToFriendsPage = () => {
    history.push({
      pathname: '/friends',
      state: { navigateBack: false },
    })
  }

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
        <aside aria-label="tutoriaali-2" role="dialog" tabIndex={-1}>
          <p className="tutorial-step">2/6</p>
          <h1 className="tutorial-header">Tämä on oma profiilisi!</h1>
          <p className="tutorial-text">Löydät sen kohdasta Profiili.</p>
        </aside>
      ),
    },
    {
      target: '.user-edit-button',
      content: (
        <aside aria-label="tutoriaali-3" role="dialog" tabIndex={-1}>
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
        <aside aria-label="tutoriaali-4" role="dialog" tabIndex={-1}>
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

  const reversedSteps = [
    {
      target: '.nav-bot',
      content: (
        <aside aria-label="tutoriaali-4" role="dialog" tabIndex={-1}>
          <p className="tutorial-step">4/6</p>
          <h1 className="tutorial-header">
            Jos tarvitset apua tai haluat lähettää valvojalle viestin, voit
            klikata Bottia.
          </h1>
          <p className="tutorial-text">Löydät sen kohdasta Botti.</p>
          <ButtonContainer
            className="button profile-tutorial-btn"
            onClick={goToFriendsPage}
          >
            Seuraava
          </ButtonContainer>
        </aside>
      ),
      disableBeacon: true,
    },
    {
      target: '.user-edit-button',
      content: (
        <aside aria-label="tutoriaali-3" role="dialog" tabIndex={-1}>
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
      target: '.nav-link-Profiili',
      content: (
        <aside aria-label="tutoriaali-2" role="dialog" tabIndex={-1}>
          <p className="tutorial-step">2/6</p>
          <h1 className="tutorial-header">Tämä on oma profiilisi!</h1>
          <p className="tutorial-text">Löydät sen kohdasta Profiili.</p>
        </aside>
      ),
    },
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
      styles: { buttonNext: { display: 'none' } },
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
          steps={returnToTutorial ? reversedSteps : steps}
          history={history}
          updateTutorialWatched={updateTutorialWatched}
          navigateBack={returnToTutorial}
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
