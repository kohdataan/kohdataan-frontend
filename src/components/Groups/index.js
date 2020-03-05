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
    posts,
  } = props

  const updateTutorialWatched = () => updateUser({ tutorialWatched: true })

  const goToPreviousTutorial = () => {
    history.push('/friends')
  }

  const steps = [
    {
      target: '.nav-link-Ryhmät',
      content: (
        <>
          <p className="tutorial-text">
            Voit jutella ja tutustua uusiin ihmisiin ryhmissä.{' '}
          </p>
          <p className="tutorial-text">Löydät ryhmät täältä.</p>
          <ButtonContainer
            className="button groups-tutorial-btn"
            onClick={goToPreviousTutorial}
          >
            Edellinen
          </ButtonContainer>
        </>
      ),
      disableBeacon: true,
    },
  ]

  return (
    <div className="groups-wrapper">
      <div className="groups-header">
        <h1>Omat ryhmät</h1>
      </div>
      <div className="groups-boxes">
        {Object.values(channels).map(channel => (
          <Group
            key={channel.id}
            channel={channel}
            getMembers={getMembers}
            profiles={profiles}
            unreadCount={getUnreadCount(channel.id)}
            currentUserId={currentUserId}
            teams={teams}
            posts={posts}
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
    </div>
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
  posts: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object),
}

export default memo(Groups)
