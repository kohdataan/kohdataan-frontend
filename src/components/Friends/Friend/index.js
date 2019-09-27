import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'



const Friend = props => {
  const { channel, getMembers, unreadCount, getUserByUsername, getusername, getPosts, getLatestMessage } = props
  const [members, setMembers] = useState([])
  const [otherUser, setOtherUser] = useState({})
  const [posts, setPosts] = useState({})
  const [message, setMessage] = useState({})


  

  useEffect(() => {
    getMembers(channel.id).then(data => setMembers(data.data))
  }, [])

  useEffect(() => {
    if(members) {
      const username=getusername(members)
      if(username){
        getUserByUsername(
          username,
          localStorage.getItem('authToken'))
        .then(data => setOtherUser(data))
        .catch(error=>console.log(error))
      }

    }
  }, [members])

  useEffect(() => {
    if (channel) {
      getPosts(channel.id).then(data =>setPosts(data.data))
      setMessage(getLatestMessage(posts))
    }
  }, [channel])

  return (
    <Link
      className={`${unreadCount > 0 ? 'friend-box-unreads' : ''} friend-box`}
      to={`/chat/${channel.id}`}
    >
      <div className="friend-box-content">
        <div className="friend-header">
          <h2>{otherUser.nickname}</h2>
          {unreadCount > 0 && (
        <span className="unread-badge">{members.length}</span>
      )}
        </div>
        {message && (
          <p>{message.message}</p>
        )}
      </div>
    </Link>
  )
}

Friend.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  getMembers: propTypes.func.isRequired,
  unreadCount: propTypes.number.isRequired,
}

export default memo(Friend)
