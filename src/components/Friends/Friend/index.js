import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'



const Friend = props => {
  const { channel, getMembers, unreadCount, getUserByUsername, getusername, getPosts, getLatestMessage } = props
  const [members, setMembers] = useState([])
  const [otherUser, setOtherUser] = useState({})
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState({})
  const message=getLatestMessage(posts)
 


  

  useEffect(() => {
    getMembers(channel.id).then(data => setMembers(data.data))
  }, [])

  useEffect(() => {
    if(members) {
      const user=getusername(members)
      console.log("kayttaja", user)
      if(user){
        setUser(user)
        getUserByUsername(
          user.username,
          localStorage.getItem('authToken'))
        .then(data => {setOtherUser(data)})
        .catch(error=>console.log(error))
      }

    }
  }, [members])

  useEffect(() => {
    if (channel) {
      getPosts(channel.id).then(data =>setPosts(data.data))
    }
  }, [channel])


  const imageUri = user!==undefined ? `http://${process.env.REACT_APP_MATTERMOST_URL}/api/v4/users/${user.id}/image` : null
    

  return (
    <Link
      className="friend-box"
      to={`/chat/${channel.id}`}
    >
      

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
        <span className="unread-badge">{unreadCount}</span>
      )}
        </div>
        {console.log(message)}
        {message && (
          <span>{message}</span>
        )}
        </div>
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
