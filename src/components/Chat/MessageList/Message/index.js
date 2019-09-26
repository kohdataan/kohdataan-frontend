import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const Message = props => {
  const {
    sender,
    text,
    currentUserId,
    senderId,
    iconColor,
    type,
    timestamp,
  } = props

  const timeSent = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  // Checks if message is system message
  const isSystemMessage = () =>
    type === 'system_join_channel' || type === 'system_leave_channel'

  // Checks if message is combined user activity message
  const isSystemCombinedUserActivity = () =>
    type === 'system_combined_user_activity'

  // Get message wrapper classes
  const messageWrapperClassList = [
    'chat-message-wrapper',
    currentUserId === senderId ? 'wrapper-sent' : 'wrapper-received',
    isSystemMessage() ? 'wrapper-system' : '',
  ]

  // Get message content classes
  const messageContentClassList = [
    'chat-message-content',
    currentUserId === senderId ? 'content-sent' : 'content-received',
    isSystemCombinedUserActivity() ? 'content-system-combined' : '',
  ]

  const senderIconClassList = [
    'chat-message-sender-icon',
    `chat-${iconColor}-icon`,
  ]

  return (
    <div className={messageWrapperClassList.join(' ')}>
      <div className="message-content">
        <div className="message-header-content">
          {currentUserId === senderId && (
            <h3 className="chat-message-content-header">{sender}</h3>
          )}
          <p className="chat-message-timestamp">{timeSent}</p>
        </div>
        {currentUserId !== senderId && (
          <div className={senderIconClassList.join(' ')}>
            <i aria-hidden="true" title={sender[0]} />
            <span className="label">{sender[0]}</span>
          </div>
        )}
        <div className={messageContentClassList.join(' ')}>
          <p className="chat-message-content-text">{text}</p>
        </div>
      </div>
    </div>
  )
}

Message.defaultProps = {
  type: '',
  senderId: '',
}

Message.propTypes = {
  sender: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  type: propTypes.string,
  currentUserId: propTypes.string.isRequired,
  senderId: propTypes.string,
  iconColor: propTypes.string.isRequired,
  timestamp: propTypes.number.isRequired,
}

export default memo(Message)
