import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Group from './Group'
import './styles.scss'

const Groups = props => {
  const { channels, getMembers, profiles, getUnreadCount } = props

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
          />
        ))}
      </div>
    </div>
  )
}

Groups.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  getMembers: PropTypes.func.isRequired,
  profiles: PropTypes.instanceOf(Object).isRequired,
  getUnreadCount: PropTypes.func.isRequired,
}

export default memo(Groups)
