import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import Friend from './Friend'
import Instructions from '../Profile/Instructions'
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
    friendsCoordinates,
    history,
    myUserInfo,
    statuses,
    currentUserId,
  } = props

  const getShowModals = () => {
    return !tutorialWatched
  }

  const [showModals, setShowModals] = useState({
    4: getShowModals(),
  })

  const closeModal = modal => () => {
    const newState = { ...showModals }
    newState[modal] = false
    setShowModals(newState)
    history.push('/')
  }

  const getStatusById = id => {
    const status = id ? statuses[id] : ''
    return status
  }

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
              myUserInfo={myUserInfo}
              getStatusById={getStatusById}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          <h3 className="no-friends-yet-header">
            Sinulla ei ole vielä yksityisviestejä.
          </h3>
        )}
      </div>
      {!tutorialWatched && (
        <Instructions
          closeModal={closeModal}
          showModals={showModals}
          friendsCoordinates={friendsCoordinates}
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
  history: PropTypes.instanceOf(Object).isRequired,
  friendsCoordinates: PropTypes.instanceOf(Object),
  myUserInfo: PropTypes.instanceOf(Object).isRequired,
  statuses: PropTypes.instanceOf(Object).isRequired,
  currentUserId: PropTypes.string.isRequired,
}

Friends.defaultProps = {
  friendsCoordinates: {},
}

export default memo(Friends)
