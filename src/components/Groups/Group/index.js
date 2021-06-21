import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import groupNameColors from '../../../assets/groupColors'
import Member from './Member'

const Group = (props) => {
  const {
    channel,
    getMembers,
    unreadCount,
    profiles,
    currentUserId,
    getPosts,
    showTownSquare,
  } = props

  const [members, setMembers] = useState([])
  const [parsedPurpose, setParsedPurpose] = useState([])
  const [unreadPosts, setUnreadPosts] = useState([])
  const [posts, setPosts] = useState({})
  const [membersToShow, setMembersToShow] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const getParsedPurpose = () => {
      if (channel && channel.purpose && channel.name !== 'off-topic') {
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

  // Only show members with existing profiles
  useEffect(() => {
    const setMemberProfilesToShow = () => {
      const memberIds = members.map((member) => member.user_id)
      const channelMembers = profiles.filter(
        (p) => memberIds.indexOf(p.id) !== -1
      )
      setMembersToShow(channelMembers)
    }
    setMemberProfilesToShow()
  }, [members, profiles])

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
          setUnreadPosts(getUnreadMessages.filter((p) => p.type === '').length)
      }
    }
    getUnreadPosts()
  }, [unreadCount, posts])

  useEffect(() => {
    if (members) {
      setCurrentUser(members.find((member) => member.user_id === currentUserId))
    }
  }, [currentUser, currentUserId, members])

  const getChannelHeader = () => {
    if (channel.name === 'town-square') {
      return 'Kohdataan'
    }
    if (channel.name === 'off-topic') {
      return 'Teemat'
    }
    return channel.display_name
  }

  const addLineBreaks = (text) => {
    const slices = text.split('///')
    return slices.map((slice) => {
      return (
        <span key={slice.toString()}>
          <span>{slice}</span>
          <br />
        </span>
      )
    })
  }

  const showChannel = () => {
    switch (channel.name) {
      case 'town-square':
        return (
          <div className="monitor-group-text">
            <p>{addLineBreaks(channel.header)}</p>
          </div>
        )
      case 'off-topic':
        return (
          <div className="monitor-group-text">
            <p>
              Täällä järjestämme kaikille avoimia, eri aiheisiin liittyviä
              ohjattuja keskusteluja.
            </p>
            <br />
            <p>{addLineBreaks(channel.header)}</p>
          </div>
        )
      default:
        return (
          <div className="group-current-members">
            <span className="sr-only">Jäsenet</span>
            {membersToShow &&
              membersToShow.map((member) => (
                <Member
                  key={`group-${member.id}`}
                  nickname={member.nickname}
                  currentUserId={currentUserId}
                  userId={member.id}
                />
              ))}
          </div>
        )
    }
  }

  const getInactiveChannels = () => {
    if (channel.name === 'town-square' && !showTownSquare) {
      return (
        <>
          <div className=" group-box-content-inactive">
            <div className="group-header">
              <div
                className="group-color-icon"
                style={{
                  backgroundColor: 'grey',
                }}
              />
              <h2>Kohdataan</h2>
            </div>
            <div className="monitor-group-text">
              <p>{addLineBreaks(channel.header)}</p>
            </div>
          </div>
        </>
      )
    }
    if (channel.name === 'off-topic') {
      return (
        <>
          <div className=" group-box-content-inactive">
            <div className="group-header">
              <div
                className="group-color-icon"
                style={{
                  backgroundColor: 'grey',
                }}
              />
              <h2>Teemat</h2>
            </div>
            <div className="monitor-group-text">
              <p>
                Täällä järjestämme kaikille avoimia, eri aiheisiin liittyviä
                ohjattuja keskusteluja.
              </p>
              <br />
              <p>{addLineBreaks(channel.header)}</p>
            </div>
          </div>
        </>
      )
    }
    return <></>
  }

  return (
    <>
      {(channel.name === 'town-square' && !showTownSquare) ||
      (channel.name === 'off-topic' && channel.purpose === '') ? (
        getInactiveChannels()
      ) : (
        <Link
          className={`${unreadPosts > 0 ? 'group-box-unreads' : ''} group-box`}
          to={{
            pathname: `/chat/${channel.id}`,
            state: {
              unreadCount,
              currentUser,
            },
          }}
        >
          <div
            className={
              channel.name === 'off-topic'
                ? 'long-group-box-content'
                : 'group-box-content'
            }
          >
            <div className="group-header">
              <div
                className="group-color-icon"
                style={{
                  backgroundColor:
                    channel.name === 'town-square' ||
                    channel.name === 'off-topic'
                      ? 'grey'
                      : groupNameColors[channel.display_name],
                  border: `${
                    channel.display_name.toLowerCase().includes('valkoiset')
                      ? '1px solid grey'
                      : 'none'
                  }`,
                }}
              />
              <h2>{getChannelHeader()}</h2>
            </div>
            {channel.name !== 'town-square' && channel.name !== 'off-topic' && (
              <div className="group-interests">
                <p>
                  {`Kiinnostukset: ${parsedPurpose.slice(0, 3).join(', ')}`}
                </p>
              </div>
            )}
            {showChannel()}
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
  getPosts: propTypes.instanceOf(Object).isRequired,
  showTownSquare: propTypes.bool.isRequired,
}

export default memo(Group)
