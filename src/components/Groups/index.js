/* eslint-disable react/jsx-one-expression-per-line */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Group from './Group'
import Tutorial from '../Tutorial'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

const Groups = props => {
  const {
    history,
    channels,
    teams,
    getMembers,
    profiles,
    getUnreadCount,
    currentUserId,
    tutorialWatched,
    updateUser,
    getPosts,
    showTownSquare,
    showThemeGroup,
  } = props
  const updateTutorialWatched = () => updateUser({ tutorialWatched: true })

  const goToPreviousTutorial = () => {
    history.push('/friends')
  }

  const steps = [
    {
      target: '.nav-link-Ryhmät',
      content: (
        <div>
          <p className="tutorial-step">6/6</p>
          <h1 className="tutorial-header">
            Voit jutella ja tutustua uusiin ihmisiin ryhmissä.{' '}
          </h1>
          <p className="tutorial-text">
            Löydät ryhmät täältä, kohdasta Ryhmät.
          </p>
          <ButtonContainer
            className="button groups-tutorial-btn"
            onClick={goToPreviousTutorial}
          >
            Edellinen
          </ButtonContainer>
        </div>
      ),
      disableBeacon: true,
    },
  ]

  return (
    <section className="groups-wrapper">
      <header className="groups-header">
        <h1>Omat ryhmät</h1>
      </header>
      <div className="groups-boxes">
        {channels &&
          channels.map(channel => (
            <Group
              key={channel.id}
              channel={channel}
              getMembers={getMembers}
              profiles={profiles}
              unreadCount={getUnreadCount(channel.id)}
              currentUserId={currentUserId}
              teams={teams}
              getPosts={getPosts}
              showTownSquare={showTownSquare}
              showThemeGroup={showThemeGroup}
            />
          ))}
      </div>
      {!tutorialWatched && (
        <Tutorial
          steps={steps}
          updateTutorialWatched={updateTutorialWatched}
          history={history}
        />
      )}
    </section>
  )
}

Groups.defaultProps = {
  profiles: {},
  history: null,
}

Groups.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  teams: PropTypes.instanceOf(Object).isRequired,
  currentUserId: PropTypes.string.isRequired,
  getMembers: PropTypes.func.isRequired,
  profiles: PropTypes.instanceOf(Object),
  getUnreadCount: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  tutorialWatched: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object),
  showTownSquare: PropTypes.bool.isRequired,
  showThemeGroup: PropTypes.bool.isRequired,
}

export default memo(Groups)
