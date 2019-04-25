import React, { useEffect } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Message from './Message'

const MessageList = props => {
  const { posts, profiles, currentUserId } = props
  let scrollList = React.createRef()

  useEffect(() => {
    scrollList.scrollTop = scrollList.scrollHeight
  })

  const getUserNamebyId = id => {
    const user = Object.values(profiles).find(profile => profile.id === id)
    return user ? user.username : ''
  }

  return (
    <div
      className="chat-message-list-container"
      ref={el => {
        scrollList = el
      }}
    >
      {posts.length > 0 &&
        posts.map(post => (
          <Message
            key={post[1]}
            sender={getUserNamebyId(post[3])}
            text={post[2]}
            senderId={post[3]}
            currentUserId={currentUserId}
          />
        ))}
    </div>
  )
}

MessageList.propTypes = {
  posts: propTypes.instanceOf(Array).isRequired,
  profiles: propTypes.instanceOf(Object).isRequired,
  currentUserId: propTypes.string.isRequired,
}

export default MessageList
