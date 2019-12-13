import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Friend from './Friend'
import './styles.scss'

const Friends = props => {
  const {
    channels,
    getMembers,
    getUnreadCount,
    getUserByUsername,
    getUsername,
    getPosts,
    getLatestMessage,
  } = props
  console.log(channels)
  return (
    <div className="friends-wrapper">
      <div className="friends-header">
        <h1>Kaverit</h1>
      </div>
      <div className="friends-boxes">
        {channels &&
          Object.values(channels).map(channel => (
            <Friend
              key={channel.id}
              channel={channel}
              getMembers={getMembers}
              unreadCount={getUnreadCount(channel.id)}
              getUserByUsername={getUserByUsername}
              getUsername={getUsername}
              getPosts={getPosts}
              getLatestMessage={getLatestMessage}
            />
          ))}
      </div>
    </div>
  )
}

Friends.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  getMembers: PropTypes.func.isRequired,
  getUnreadCount: PropTypes.func.isRequired,
  getUserByUsername: PropTypes.func.isRequired,
  getUsername: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  getLatestMessage: PropTypes.func.isRequired,
}

export default memo(Friends)
