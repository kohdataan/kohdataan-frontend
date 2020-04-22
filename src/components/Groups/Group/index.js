import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import groupNameColors from '../../../assets/groupColors'
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
    getPosts,
  } = props

  const [members, setMembers] = useState([])
  const [activeMembers, setActiveMembers] = useState([])
  const [parsedPurpose, setParsedPurpose] = useState([])
  const [unreadPosts, setUnreadPosts] = useState([])
  const [posts, setPosts] = useState({})

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
    // Get channel posts
    const fetchPosts = async () => {
      if (channel && channel.id) {
        const channelPosts = await getPosts(channel.id, 0, 100)
        if (channelPosts.data && channelPosts.data.posts)
          setPosts(channelPosts.data.posts)
      }
    }
    fetchPosts()
  }, [channel, getPosts])

  // get unread posts for channel
  useEffect(() => {
    const getUnreadPosts = async () => {
      if (unreadCount && unreadCount > 0 && posts) {
        const beginIndex = Object.keys(posts).length - unreadCount
        const getUnreadMessages = Object.values(posts)
          .sort((p1, p2) => p1.create_at - p2.create_at)
          .slice(beginIndex)
        if (getUnreadMessages)
          setUnreadPosts(getUnreadMessages.filter(p => p.type === '').length)
      }
    }
    getUnreadPosts()
  }, [unreadCount, posts])

  return (
    <Link
      className={`${unreadPosts > 0 ? 'group-box-unreads' : ''} group-box`}
      to={{
        pathname: `/chat/${channel.id}`,
        state: {
          unreadCount,
        },
      }}
    >
      <div className="group-box-content">
        <div className="group-header">
          <div
            className="group-color-icon"
            style={{
              backgroundColor:
                channel.name === 'town-square'
                  ? 'grey'
                  : groupNameColors[channel.display_name],
              border: `${
                channel.display_name.toLowerCase().includes('valkoiset')
                  ? '1px solid grey'
                  : 'none'
              }`,
            }}
          />
          <h2>
            {channel.name === 'town-square'
              ? 'Kysy valvojalta'
              : channel.display_name}
          </h2>
        </div>
        {channel.name !== 'town-square' && (
          <div className="group-interests">
            <p>{`Kiinnostukset: ${parsedPurpose.slice(0, 3).join(', ')}`}</p>
          </div>
        )}
        {channel.name !== 'town-square' ? (
          <div className="group-current-members">
            <span className="sr-only">Jäsenet</span>
            {activeMembers &&
              activeMembers.map(member => (
                <Member
                  key={`group-${member.id}`}
                  nickname={member.nickname}
                  currentUserId={currentUserId}
                  userId={member.id}
                />
              ))}
          </div>
        ) : (
          <div className="monitor-group-text">
            <p>
              Tässä ryhmässä voit kysyä valvojalta Kohdataan-somen käytöstä.
            </p>
            <p>Valvoja vastaa arkisin klo 9-17 välillä.</p>
            <p>Ryhmä on väliaikainen, se on auki 18.05. asti.</p>
          </div>
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
  getPosts: propTypes.instanceOf(Object).isRequired,
}

export default memo(Group)
