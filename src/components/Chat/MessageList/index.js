import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Message from './Message'

const MessageList = props => {
  const {
    posts,
    currentUserId,
    getUserNamebyId,
    getIconColor,
    unreadCount,
  } = props
  const firstUnread = () => {
    if (unreadCount === 0) return null
    const a = posts.length - unreadCount
    return posts[a].id
  }

  const unreadMessage = () => {
    if (unreadCount === 1) return 'lukematon viesti'
    return 'lukematonta viestiä'
  }

  const unreadDivider = postId => {
    if (postId === firstUnread()) {
      return (
        <div className="chat--unread-divider">
          {`${unreadCount} ${unreadMessage()}`}
          <hr color="#1a1a1a" margin-bottom="0px" />
        </div>
      )
    }
    return null
  }
  return (
    <div className="chat-message-list-container chat--message-list">
      <div className="chat--message-list--container">
        {posts.length > 0 &&
          posts.map(post => (
            <div key={post.id}>
              {unreadDivider(post.id)}
              <Message
                type={post.type}
                sender={getUserNamebyId(post.user_id)}
                text={post.message}
                senderId={post.user_id}
                currentUserId={currentUserId}
                iconColor={getIconColor(post.user_id)}
              />
            </div>
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
  unreadCount: propTypes.number.isRequired,
}

export default memo(MessageList)
