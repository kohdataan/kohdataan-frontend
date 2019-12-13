import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Friend = props => {
  const {
    channel,
    getMembers,
    unreadCount,
    getUserByUsername,
    getUsername,
    getPosts,
    getLatestMessage,
  } = props

  const [members, setMembers] = useState([])
  const [otherUser, setOtherUser] = useState({})
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState({})

  const imageUri =
    user && user.id
      ? `http://${process.env.REACT_APP_MATTERMOST_URL}/api/v4/users/${
          user.id
        }/image`
      : null
  const message = getLatestMessage(posts)

  useEffect(() => {
    getMembers(channel.id).then(data => setMembers(data.data))
  }, [])

  useEffect(() => {
    if (members) {
      const userObj = getUsername(members)
      if (userObj) {
        setUser(userObj)
        getUserByUsername(userObj.username, localStorage.getItem('authToken'))
          .then(data => {
            setOtherUser(data)
          })
          // eslint-disable-next-line no-console
          .catch(error => console.log(error))
      }
    }
  }, [members])

  useEffect(() => {
    if (channel) {
      getPosts(channel.id).then(data => setPosts(data.data))
    }
  }, [channel])

  return (
    <Link className="friend-box" to={`/chat/${channel.id}`}>
      <div className="friend-box-content">
        <div className="friend-icon-box">
          {imageUri && (
            <img className="friend-icon" src={imageUri} alt="Profiilikuva" />
          )}
        </div>
        <div className="friend-text-content">
          <div className="friend-header">
            <h2>{otherUser.nickname}</h2>
            {unreadCount > 0 && (
              <mark className="unread-badge">{unreadCount}</mark>
            )}
          </div>
          {message && <>{message}</>}
        </div>
      </div>
    </Link>
  )
}

Friend.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  getMembers: propTypes.func.isRequired,
  unreadCount: propTypes.number.isRequired,
  getUserByUsername: propTypes.func.isRequired,
  getUsername: propTypes.func.isRequired,
  getPosts: propTypes.func.isRequired,
  getLatestMessage: propTypes.func.isRequired,
}

export default memo(Friend)
