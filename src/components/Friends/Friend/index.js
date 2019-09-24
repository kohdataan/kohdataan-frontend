import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'



const Friend = props => {
  const { channel, getMembers, unreadCount, currentUser, profiles, key, getUserByUsername, getusername, getPosts, posts} = props
  const [members, setMembers] = useState([])
  const [otherUser, setOtherUser] = useState({})

  

  useEffect(() => {
    getMembers(channel.id).then(data => setMembers(data.data))
  }, [])

  useEffect(() => {
    if(members) {
      const username=getusername(members)
      if(username){        
        console.log("käyttis", getusername(members))
        try{
          getUserByUsername(
            username,
            localStorage.getItem('authToken')
          ).then(data => setOtherUser(data))
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e)
        }
      }

    }
  }, [members])

  useEffect(() => {
    if (channel) {
      getPosts(channel.id)
    }
  }, [])





  return (
    <Link
      className={`${unreadCount > 0 ? 'group-box-unreads' : ''} group-box`}
      to={`/chat/${channel.id}`}
    >
      {console.log("kanava", channel)}
      {console.log("postit", posts)}
      <div className="group-box-content">
        <div className="group-header">
          <h2>{otherUser.nickname}</h2>
          {members && (
            <p className="groups-num-members">{`${members.length} jäsentä`}</p>
          )}
        </div>
        <p>{`Yhteistä: ${channel.display_name}`}</p>
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

Friend.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  getMembers: propTypes.func.isRequired,
  unreadCount: propTypes.number.isRequired,
}

export default memo(Friend)
