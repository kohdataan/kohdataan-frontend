import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Friend from './Friend'
import './styles.scss'

const Friends = props => {
  const {
    channels,
    getUnreadCount,
    getUsername,
    getPosts,
    getLatestMessage,
    membersInChannel,
  } = props

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
              unreadCount={getUnreadCount(channel.id)}
              getUsername={getUsername}
              getPosts={getPosts}
              getLatestMessage={getLatestMessage}
              membersInChannel={membersInChannel}
            />
          ))}
      </div>
    </div>
  )
}

Friends.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  getUnreadCount: PropTypes.func.isRequired,
  getUsername: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  getLatestMessage: PropTypes.func.isRequired,
  membersInChannel: PropTypes.instanceOf(Object).isRequired,
}

export default memo(Friends)
