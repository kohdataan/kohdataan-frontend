import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const Message = props => {
  const { sender, text, currentUserId, senderId } = props
  const messageWrapperClassList = [
    'chat-message-wrapper',
    currentUserId === senderId ? 'wrapper-sent' : 'wrapper-received',
  ]
  const messageContentClassList = [
    'chat-message-content',
    currentUserId === senderId ? 'content-sent' : 'content-received',
    senderId ? '' : 'content-no-sender',
  ]
  return (
    <div className={messageWrapperClassList.join(' ')}>
      {currentUserId !== senderId && (
        <span className="chat-message-sender-icon">{sender[0]}</span>
      )}
      <div className={messageContentClassList.join(' ')}>
        {currentUserId !== senderId && (
          <span className="chat-message-content-header">{sender}</span>
        )}
        <span>{text}</span>
      </div>
    </div>
  )
}

Message.propTypes = {
  sender: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  currentUserId: propTypes.string.isRequired,
  senderId: propTypes.string.isRequired,
}

export default Message
