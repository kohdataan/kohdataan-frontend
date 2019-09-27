import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Friend from './Friend'
import './styles.scss'

const Friends = props => {
  const { channels, getMembers, getUnreadCount, getUserByUsername, getusername, getPosts, getLatestMessage } = props

  return (
    <div className="friends-wrapper">
      <div className="friends-header">
        <h1>Kaverit</h1>
      </div>
      <div className="friends-boxes">
        {Object.values(channels).map(channel => (
          <Friend
            key={channel.id}
            channel={channel}
            getMembers={getMembers}
            unreadCount={getUnreadCount(channel.id)}
            getUserByUsername={getUserByUsername}
            getusername={getusername}
            getPosts={getPosts}
            getLatestMessage ={getLatestMessage}
          />
        ))}
      </div>
    </div>
  )
}

Friends.defaultProps = {
  profiles: {},
}

Friends.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  getMembers: PropTypes.func.isRequired,
  profiles: PropTypes.instanceOf(Object),
  getUnreadCount: PropTypes.func.isRequired,
}

export default memo(Friends)
