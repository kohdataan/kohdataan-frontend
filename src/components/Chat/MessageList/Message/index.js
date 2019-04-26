import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const Message = props => {
  const { sender, text, currentUserId, senderId, iconColor } = props

  const messageWrapperClassList = [
    'chat-message-wrapper',
    currentUserId === senderId ? 'wrapper-sent' : 'wrapper-received',
  ]
  const messageContentClassList = [
    'chat-message-content',
    currentUserId === senderId ? 'content-sent' : 'content-received',
    senderId ? '' : 'content-no-sender',
  ]

  const senderIconClassList = [
    'chat-message-sender-icon',
    `chat-${iconColor}-icon`,
  ]

  return (
    <div className={messageWrapperClassList.join(' ')}>
      {currentUserId !== senderId && (
        <div className={senderIconClassList.join(' ')}>
          <i aria-hidden="true" title={sender[0]} />
          <span className="label">{sender[0]}</span>
        </div>
      )}
      <div className={messageContentClassList.join(' ')}>
        {currentUserId !== senderId && (
          <h3 className="chat-message-content-header">{sender}</h3>
        )}
        <p className="chat-message-content-text">{text}</p>
      </div>
    </div>
  )
}

Message.propTypes = {
  sender: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  currentUserId: propTypes.string.isRequired,
  senderId: propTypes.string.isRequired,
  iconColor: propTypes.string.isRequired,
}

export default Message
