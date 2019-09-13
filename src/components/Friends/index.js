import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Friend from './Friend'
import './styles.scss'

const Friends = props => {
  const { channels, getMembers, profiles, getUnreadCount } = props

  return (
    <div className="groups-wrapper">
      <div className="groups-header">
        <h1>Kaverit</h1>
      </div>
      <div className="groups-boxes">
        {Object.values(channels).map(channel => (
          <Friend
            key={channel.id}
            channel={channel}
            getMembers={getMembers}
            profiles={profiles}
            unreadCount={getUnreadCount(channel.id)}
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
