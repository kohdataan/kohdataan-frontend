import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Member from './Member'
import getIconColor from '../../../utils/getMemberIconColor'

const Group = props => {
  const { channel, getMembers, unreadCount, profiles, currentUserId } = props
  const [members, setMembers] = useState([])
  const [activeMembers, setActiveMembers] = useState([])

  useEffect(() => {
    const getMemberData = async () => {
      if (channel && channel.id) {
        const memberData = await getMembers(channel.id)
        setMembers(memberData.data)
      }
    }
    getMemberData()
  }, [channel, getMembers])

  useEffect(() => {
    const getActiveMembers = () => {
      const activeMembersArr = members
        .map(member => profiles[member.user_id])
        .filter(member => member.delete_at === 0)
      setActiveMembers(activeMembersArr)
    }
    getActiveMembers()
  }, [members, profiles, setActiveMembers])

  return (
    <Link
      className={`${unreadCount > 0 ? 'group-box-unreads' : ''} group-box`}
      to={`/chat/${channel.id}`}
    >
      <div className="group-box-content">
        <div className="group-header">
          <h2>
            {channel.name === 'town-square' ? 'Palaute' : channel.display_name}
          </h2>
        </div>
        {channel.name !== 'town-square' ? (
          <div className="group-current-members">
            {activeMembers.map(member => (
              <Member
                iconColor={getIconColor(member.id, members)}
                nickname={member.nickname || member.username}
                currentUserId={currentUserId}
                userId={member.id}
              />
            ))}
          </div>
        ) : (
          <p>Tämä ryhmä on yleistä palautetta varten.</p>
        )}
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
  currentUserId: propTypes.string.isRequired,
}

export default memo(Group)
