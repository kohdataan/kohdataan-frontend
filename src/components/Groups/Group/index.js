import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Group = props => {
  const { channel, getMembers, unreadCount, profiles } = props
  const [members, setMembers] = useState([])

  useEffect(() => {
    const getMemberData = async () => {
      if (channel && channel.id) {
        const memberData = await getMembers(channel.id)
        setMembers(memberData.data)
      }
    }
    getMemberData()
  }, [channel, getMembers])

  const getActiveMembersCount = () => {
    const activeMembers = members.filter(
      member =>
        profiles[member.user_id] && profiles[member.user_id].delete_at === 0
    )
    return activeMembers && activeMembers.length
  }

  return (
    <Link
      className={`${unreadCount > 0 ? 'group-box-unreads' : ''} group-box`}
      to={`/chat/${channel.id}`}
    >
      <div className="group-box-content">
        <div className="group-header">
          <h2>{channel.display_name}</h2>
          {members && (
            <p className="groups-num-members">{`${getActiveMembersCount()} jäsentä`}</p>
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
  profiles: propTypes.instanceOf(Object).isRequired,
}

export default memo(Group)
