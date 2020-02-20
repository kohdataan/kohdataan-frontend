import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Friend from './Friend'
import Tutorial from '../Tutorial'
import './styles.scss'

const Friends = props => {
  const {
    channels,
    getUnreadCount,
    getUsername,
    getPosts,
    getLatestMessage,
    membersInChannel,
    tutorialWatched,
    updateUser,
    history,
  } = props

  const updateTutorialWatched = () => updateUser({ tutorialWatched: true })

  const steps = [
    {
      target: '.nav-link-Kaverit',
      content:
        'Voit viestitellä kavereiden kanssa kahdestaan. Löydät kaverit täältä.',
      disableBeacon: true,
    },
  ]

  return (
    <main className="friends-wrapper">
      <div className="friends-header">
        <h1>Kaverit</h1>
      </div>
      <div className="friends-boxes">
        {channels && channels.length > 0 ? (
          Object.values(channels).map(channel => (
            <Friend
              key={channel.id}
              channel={channel}
              unreadCount={getUnreadCount(channel.id)}
              getUsername={getUsername}
              getPosts={getPosts}
              getLatestMessage={getLatestMessage}
              membersInChannel={membersInChannel}
            />
          ))
        ) : (
          <h3 className="no-friends-yet-header">
            Sinulla ei ole vielä yksityisviestejä. Löydät uusia kavereita
            Ryhmät-välilehdeltä!
          </h3>
        )}
      </div>
      {!tutorialWatched && (
        <Tutorial
          steps={steps}
          history={history}
          updateTutorialWatched={updateTutorialWatched}
        />
      )}
    </main>
  )
}

Friends.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  getUnreadCount: PropTypes.func.isRequired,
  getUsername: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  getLatestMessage: PropTypes.func.isRequired,
  membersInChannel: PropTypes.instanceOf(Object).isRequired,
  tutorialWatched: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
}

export default memo(Friends)
