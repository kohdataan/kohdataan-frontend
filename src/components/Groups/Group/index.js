import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Group = props => {
  const { channel, getMembers, unreadCount } = props
  const [members, setMembers] = useState([])

  useEffect(() => {
    getMembers(channel.id).then(data => setMembers(data.data))
  }, [channel, getMembers])

  return (
    <Link
      className={`${unreadCount > 0 ? 'group-box-unreads' : ''} group-box`}
      to={`/chat/${channel.id}`}
    >
      <div className="group-box-content">
        <div className="group-header">
          <h2>{channel.display_name}</h2>
          {members && (
            <p className="groups-num-members">{`${members.length} jäsentä`}</p>
          )}
        </div>
        <p>{`Yhteistä: ${channel.display_name}`}</p>
      </div>
      {unreadCount > 0 && (
        <div className="group-unreads-text">
          <li>{`${unreadCount} uutta viestiä`}</li>
        </div>
      )}
      {unreadCount <= 0 && (
        <div className="group-unreads-text no-unreads">
          <p>Ei uusia viestejä</p>
        </div>
      )}
    </Link>
  )
}

Group.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  getMembers: propTypes.func.isRequired,
  unreadCount: propTypes.number.isRequired,
}

export default memo(Group)
