import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Message from './Message'

const MessageList = props => {
  const { posts, currentUserId, getUserNamebyId, getIconColor } = props

  let previous = '01/01/2010'
  let firstInDate = false

  return (
    <div className="chat-message-list-container chat--message-list">
      <div className="chat--message-list--container">
        {posts.length > 0 &&
          posts.map(post => {
            firstInDate = false
            const dateSent = new Date(post.create_at).toLocaleDateString()

            if (dateSent !== previous && post.message) {
              previous = dateSent
              firstInDate = true
            }
            return (
              <Message
                key={post.id}
                type={post.type}
                sender={getUserNamebyId(post.user_id)}
                text={post.message}
                senderId={post.user_id}
                currentUserId={currentUserId}
                iconColor={getIconColor(post.user_id)}
                timestamp={post.create_at}
                previous={firstInDate}
              />
            )
          })}
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
