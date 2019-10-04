import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Message from './Message'

const MessageList = props => {
  const { posts, currentUserId, getUserNamebyId, getIconColor } = props

  let previousDate = '01/01/2000'
  let previousTime = '10000'

  return (
    <div className="chat-message-list-container chat--message-list">
      <div className="chat--message-list--container">
        {posts.length > 0 &&
          posts.map(post => {
            let showDate = false
            const dateSent = new Date(post.create_at).toLocaleDateString()
            let timeSent = new Date(post.create_at).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
            if (previousTime === '10000') previousTime = timeSent

            if (dateSent === previousDate && previousTime === timeSent) {
              timeSent = ''
            }
            previousTime = timeSent
            if (dateSent !== previousDate && post.message) {
              previousDate = dateSent
              showDate = true
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
                timeSent={timeSent}
                dateSent={dateSent}
                showDate={showDate}
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
