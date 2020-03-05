import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Member from './Member'
import { isSystemAdmin, isTeamAdmin } from '../../../utils/userIsAdmin'

const Group = props => {
  const {
    channel,
    getMembers,
    unreadCount,
    profiles,
    currentUserId,
    teams,
    posts,
  } = props

  const [members, setMembers] = useState([])
  const [activeMembers, setActiveMembers] = useState([])
  const [parsedPurpose, setParsedPurpose] = useState([])
  const [unreadPosts, setUnreadPosts] = useState([])

  useEffect(() => {
    const getParsedPurpose = () => {
      if (channel && channel.purpose) {
        try {
          const parsed = JSON.parse(channel.purpose)
          const sorted = Object.keys(parsed).sort(
            (a, b) => parsed[b] - parsed[a]
          )
          setParsedPurpose(sorted)
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
        }
      }
    }
    getParsedPurpose()
  }, [channel, setParsedPurpose])

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
      const activeMembersArr =
        members &&
        members
          .map(member => profiles[member.user_id])
          .filter(member => member && member.delete_at === 0)
          .filter(
            member =>
              !isSystemAdmin(member.id, profiles) &&
              !isTeamAdmin(member.id, teams)
          )
      setActiveMembers(activeMembersArr)
    }
    getActiveMembers()
  }, [members, profiles, setActiveMembers, teams])

  useEffect(() => {
    const getUnreadPosts = () => {
      if (unreadCount && unreadCount > 0 && posts && channel) {
        const channelPosts =
          posts &&
          Object.values(posts).filter(item => item.channel_id === channel.id)
        const beginIndex = Object.keys(channelPosts).length - unreadCount
        const sorted =
          channelPosts &&
          channelPosts
            .sort((p1, p2) => p1.create_at - p2.create_at)
            .slice(beginIndex)
        const filtered = sorted && sorted.filter(p => p.type === '')
        if (filtered && filtered.length) {
          setUnreadPosts(filtered.length)
        }
      }
    }
    getUnreadPosts()
  }, [posts, unreadCount, channel])

  return (
    <Link
      className={`${unreadPosts > 0 ? 'group-box-unreads' : ''} group-box`}
      to={`/chat/${channel.id}`}
    >
      <div className="group-box-content">
        <div className="group-header">
          <h2>
            {channel.name === 'town-square' ? 'Palaute' : channel.display_name}
          </h2>
        </div>
        {channel.name !== 'town-square' && (
          <div className="group-interests">
            <p>{`Kiinnostukset: ${parsedPurpose.slice(0, 3).join(', ')}`}</p>
          </div>
        )}
        {channel.name !== 'town-square' ? (
          <div className="group-current-members">
            {activeMembers &&
              activeMembers.map(member => (
                <Member
                  key={`group-${member.id}`}
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
      {unreadPosts === 1 && (
        <div className="group-unreads-text">
          <li>{`${unreadPosts} uusi viesti`}</li>
        </div>
      )}
      {unreadPosts > 1 && (
        <div className="group-unreads-text">
          <li>{`${unreadPosts} uutta viestiä`}</li>
        </div>
      )}
      {unreadPosts <= 0 && (
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
  teams: propTypes.instanceOf(Object).isRequired,
  posts: propTypes.instanceOf(Object).isRequired,
}

export default memo(Group)
