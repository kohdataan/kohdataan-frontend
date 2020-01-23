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
    directChannel,
  } = props

  let previousTime = null
  let previousDate = null

  const setTimeStampValues = post => {
    let showDate = false
    let showTime = true
    const dateSent = new Date(post.create_at).toLocaleDateString()
    const timeSent = new Date(post.create_at).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    if (previousTime === null && previousTime !== '') previousTime = timeSent

    if (dateSent === previousDate && previousTime === timeSent) {
      showTime = false
    }
    previousTime = timeSent
    if (dateSent !== previousDate) {
      previousDate = dateSent
      showDate = true
    }
    return {
      sendTime: showTime ? timeSent : '',
      sendDate: dateSent,
      show: showDate,
    }
  }

  return (
    <div className="chat-message-list-container chat--message-list">
      <div className="chat--message-list--container">
        {posts.length > 0 &&
          posts.map(post => {
            const timestampValues = setTimeStampValues(post)
            return (
              post &&
              post.user_id &&
              !post.type.includes('system') && (
                <Message
                  key={post.id}
                  files={post.file_ids}
                  type={post.type}
                  url={post.url}
                  sender={getUserNamebyId(post.user_id)}
                  text={post.message}
                  senderId={post.user_id}
                  currentUserId={currentUserId}
                  iconColor={getIconColor(post.user_id)}
                  directChannel={directChannel}
                  timeSent={timestampValues.sendTime}
                  dateSent={timestampValues.sendDate}
                  showDate={timestampValues.show}
                />
              )
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
  directChannel: propTypes.bool.isRequired,
}

export default memo(MessageList)
