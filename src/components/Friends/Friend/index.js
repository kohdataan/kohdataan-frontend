import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'



const Friend = props => {
  const { channel, getMembers, unreadCount, currentUser, profiles, key, getUserByUsername, getusername, getPosts } = props
  const [members, setMembers] = useState([])
  const [otherUser, setOtherUser] = useState({})
  const [posts, setPosts] = useState({})


  

  useEffect(() => {
    getMembers(channel.id).then(data => setMembers(data.data))
  }, [])

  useEffect(() => {
    if(members) {
      const username=getusername(members)
      if(username){        
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
      getPosts(channel.id).then(data =>setPosts(data.data))
    }
  }, [channel])

 const getLatest=()=> {
   const postMap=Object.values(posts)[1]
   console.log("latest")
   if(postMap) {
     const postsArray=Object.values(postMap)
     postsArray.sort((a, b) => a.create_at - b.create_at).reverse()
     return postsArray[0]
   }
   return null
 }
 const message=getLatest()





  return (
    <Link
      className={`${unreadCount > 0 ? 'group-box-unreads' : ''} group-box`}
      to={`/chat/${channel.id}`}
    >
      {console.log("kanava", channel)}
      {console.log("postit", Object.values(posts)[1])}
      {console.log("viimeisin", getLatest())}
      <div className="group-box-content">
        <div className="group-header">
          <h2>{otherUser.nickname}</h2>
          {members && (
            <p className="groups-num-members">{`${members.length} jäsentä`}</p>
          )}
        </div>
        <p>{`Yhteistä: ${channel.display_name}`}</p>
      </div>
      <div>
        {message && (
          <p>{message.message}</p>
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

Friend.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  getMembers: propTypes.func.isRequired,
  unreadCount: propTypes.number.isRequired,
}

export default memo(Friend)
