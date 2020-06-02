import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import groupNameColors from '../../../assets/groupColors'
import Member from './Member'
import { isSystemAdmin, isTeamAdmin } from '../../../utils/userIsAdmin'
import { getUserByUsername } from '../../../api/user/user'

const Group = props => {
  const {
    channel,
    getMembers,
    unreadCount,
    profiles,
    currentUserId,
    teams,
    getPosts,
    showTownSquare,
  } = props

  const [members, setMembers] = useState([])
  const [activeMembers, setActiveMembers] = useState([])
  const [parsedPurpose, setParsedPurpose] = useState([])
  const [unreadPosts, setUnreadPosts] = useState([])
  const [posts, setPosts] = useState({})
  const [membersToShow, setMembersToShow] = useState([])

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

  const removeDeletedMembers = resp => {
    // Create array of nicknames of users with deleteAt timestamp
    const deletedProfiles = resp
      .filter(r => {
        return r.deleteAt !== null
      })
      .map(deleted => deleted.nickname)
    // filter out deleted profiles
    const memberProfiles = []
    for (let i = 0; i < activeMembers.length; i++) {
      const { id } = activeMembers[i]
      const user = profiles[id]
      memberProfiles.push(user)
    }
    const filteredMmUserIds = memberProfiles
      .filter(profile => {
        return !deletedProfiles.includes(profile.nickname)
      })
      .map(profile => profile.id)
    const filteredMembers = activeMembers.filter(member =>
      filteredMmUserIds.includes(member.id)
    )
    setMembersToShow(filteredMembers)
  }

  // Get user info from own backend
  useEffect(() => {
    const getNodeUsers = async () => {
      const results = []
      if (activeMembers) {
        for (let i = 0; i < activeMembers.length; i++) {
          const { id } = activeMembers[i]
          const user = profiles[id]
          if (user && user.delete_at === 0) {
            results.push(
              getUserByUsername(
                user.username,
                localStorage.getItem('authToken')
              )
            )
          }
        }
        return removeDeletedMembers(await Promise.all(results))
      }
    }
    getNodeUsers()
  }, [profiles, activeMembers])

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
    <>
      {channel.name === 'town-square' && !showTownSquare ? (
        <>
          <div className=" group-box-content-inactive">
            <div className="group-header">
              <div
                className="group-color-icon"
                style={{
                  backgroundColor: 'grey',
                }}
              />
              <h2>Kysy valvojalta</h2>
            </div>
            <div className="monitor-group-text">
              <p>
                Tässä ryhmässä voit kysyä valvojalta Kohdataan-somen käytöstä.
              </p>
              <p>Ryhmä on auki arkisin klo 9-17.</p>
            </div>
          </div>
        </>
      ) : (
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
                <p>
                  {`Kiinnostukset: ${parsedPurpose.slice(0, 3).join(', ')}`}
                </p>
              </div>
            )}
            {channel.name !== 'town-square' ? (
              <div className="group-current-members">
                <span className="sr-only">Jäsenet</span>
                {membersToShow &&
                  membersToShow.map(member => (
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
                <p>Ryhmä on auki arkisin klo 9-17.</p>
              </div>
            )}
          </div>
          {unreadPosts === 1 && (
            <div className="group-unreads-text">
              <span>{`${unreadPosts} uusi viesti`}</span>
            </div>
          )}
          {unreadPosts > 1 && (
            <div className="group-unreads-text">
              <span>{`${unreadPosts} uutta viestiä`}</span>
            </div>
          )}
          {unreadPosts <= 0 && (
            <div className="group-unreads-text no-unreads">
              <p>Ei uusia viestejä</p>
            </div>
          )}
        </Link>
      )}
    </>
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
  showTownSquare: propTypes.bool.isRequired,
}

export default memo(Group)
