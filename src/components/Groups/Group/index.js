import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import groupNameColors from '../../../assets/groupColors'

const Group = props => {
  const { channel, getMembers, unreadCount, profiles } = props
  const [members, setMembers] = useState([])
  const [activeMembers, setActiveMembers] = useState('')

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
        .filter(
          member =>
            profiles[member.user_id] && profiles[member.user_id].delete_at === 0
        )
        .map(member => profiles[member.user_id])
      if (activeMembersArr && activeMembersArr.length > 5) {
        setActiveMembers(
          activeMembersArr
            .map(member => member.nickname)
            .slice(0, 5)
            .join(' ')
            .push('...')
        )
      } else {
        setActiveMembers(
          activeMembersArr.map(member => member.nickname).join(' ')
        )
      }
    }
    getActiveMembers()
  }, [members, setActiveMembers])

  return (
    <Link
      className={`${unreadCount > 0 ? 'group-box-unreads' : ''} group-box`}
      to={`/chat/${channel.id}`}
    >
      <div className="group-box-content">
        <div className="group-header">
          {channel.name !== 'town-square' && (
            <div
              className="group-color-icon"
              style={{
                backgroundColor: groupNameColors[channel.display_name],
                border: `${
                  channel.display_name.toLowerCase().includes('valkoiset')
                    ? '1px solid grey'
                    : 'none'
                }`,
              }}
            />
          )}
          <h2>
            {channel.name === 'town-square' ? 'Palaute' : channel.display_name}
          </h2>
        </div>
        {channel.name !== 'town-square' ? (
          <p>{activeMembers}</p>
        ) : (
          <p>Tämä kanava on yleistä palautetta varten.</p>
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
}

export default memo(Group)
