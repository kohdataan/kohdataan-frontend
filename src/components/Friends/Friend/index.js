import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { TextLine } from '../../ContentLoader'

const Friend = props => {
  const {
    channel,
    unreadCount,
    getUsername,
    getPosts,
    getLatestMessage,
    membersInChannel,
  } = props

  const [user, setUser] = useState({})
  const [posts, setPosts] = useState({})

  const imageUri =
    user && user.id
      ? `${process.env.REACT_APP_MATTERMOST_URL}/api/v4/users/${user.id}/image`
      : null
  const message = getLatestMessage(posts)

  useEffect(() => {
    // get member userinfo
    const members = Object.values(membersInChannel[channel.id])
    const getUserInfo = async () => {
      const userObj = getUsername(members)
      if (userObj) {
        setUser(userObj)
      }
    }
    getUserInfo()
  }, [getUsername, membersInChannel, channel])

  useEffect(() => {
    // Get channel posts
    const fetchPosts = async () => {
      if (channel && channel.id) {
        const channelPosts = await getPosts(channel.id)
        setPosts(channelPosts.data)
      }
    }
    fetchPosts()
  }, [channel, getPosts])
  if (user.delete_at === 0) {
    return (
      <Link className="friend-box" to={`/chat/${channel.id}`}>
        <div className="friend-box-content">
          <div className="friend-icon-box">
            <img className="friend-icon" src={imageUri} alt="Profiilikuva" />
          </div>
          <div className="friend-text-content">
            <div className="friend-header">
              <h2>{user.nickname}</h2>
              {unreadCount > 0 && (
                <mark className="unread-badge">{unreadCount}</mark>
              )}
            </div>
            {message ? <>{message}</> : <TextLine />}
          </div>
        </div>
      </Link>
    )
  }
  return (
    <div className="friend-box">
      <div className="friend-box-content">
        <div className="friend-icon-box">
          <img className="friend-icon" src={imageUri} alt="Profiilikuva" />
        </div>
        <div className="friend-text-content">
          <div className="friend-header">
            <h2 className="deleted-user-nickname">{user.nickname}</h2>
          </div>
          <div className="deleted-user-message">
            Käyttäjä on poistunut palvelusta
          </div>
        </div>
      </div>
    </div>
  )
}

Friend.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  unreadCount: propTypes.number.isRequired,
  getUsername: propTypes.func.isRequired,
  getPosts: propTypes.func.isRequired,
  getLatestMessage: propTypes.func.isRequired,
  membersInChannel: propTypes.instanceOf(Object).isRequired,
}

export default memo(Friend)
