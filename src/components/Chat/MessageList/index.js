import React, { useEffect } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Message from './Message'

const MessageList = props => {
  const { posts, currentUserId, getUserNamebyId, getIconColor } = props
  let scrollList = React.createRef()

  useEffect(() => {
    scrollList.scrollTop = scrollList.scrollHeight
  })

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
            iconColor={getIconColor(post[3])}
          />
        ))}
    </div>
  )
}

MessageList.propTypes = {
  posts: propTypes.instanceOf(Array).isRequired,
  currentUserId: propTypes.string.isRequired,
  getUserNamebyId: propTypes.func.isRequired,
  getIconColor: propTypes.func.isRequired,
}

export default MessageList
