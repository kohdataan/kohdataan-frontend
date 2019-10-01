import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Message from './Message'

const MessageList = props => {
  const { posts, currentUserId, getUserNamebyId, getIconColor, directChannel } = props

  return (
    <div className="chat-message-list-container chat--message-list">
      <div className="chat--message-list--container">
        {posts.length > 0 &&
          posts.map(post => (
            <Message
              key={post.id}
              type={post.type}
              sender={getUserNamebyId(post.user_id)}
              text={post.message}
              senderId={post.user_id}
              currentUserId={currentUserId}
              iconColor={getIconColor(post.user_id)}
              directChannel={directChannel}
            />
          ))}
      </div>
    </div>
  )
}

MessageList.propTypes = {
  posts: propTypes.instanceOf(Array).isRequired,
  currentUserId: propTypes.string.isRequired,
  getUserNamebyId: propTypes.func.isRequired,
  getIconColor: propTypes.func.isRequired,
}

export default memo(MessageList)
