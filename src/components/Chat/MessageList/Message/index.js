import React, { useState, memo } from 'react'
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
    previous,
  } = props

  const timeSent = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const today = new Date().toLocaleDateString()
  const dateSent = new Date(timestamp).toLocaleDateString()
  const dateText = dateSent === today ? 'Tänään' : dateSent
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

  const showDate = previous

  return (
    <>
      {showDate ? (
        <div className="show-date-content">
          <div className="date-divider" />
          <span className="date-sent-text">{dateText}</span>
          <div className="date-divider" />
        </div>
      ) : (
        <></>
      )}
      <div className={messageWrapperClassList.join(' ')}>
        <div className="message-content">
          <div className="message-header-content">
            <span className="chat-message-timestamp">{timeSent}</span>
            {currentUserId !== senderId && (
              <h3 className="chat-message-content-header">{sender}</h3>
            )}
          </div>
          <div className="message-content-text">
            <div className={messageContentClassList.join(' ')}>
              <p className="chat-message-content-text">{text}</p>
            </div>
          </div>
        </div>
        {currentUserId !== senderId && (
          <div className={senderIconClassList.join(' ')}>
            <i aria-hidden="true" title={sender[0]} />
            <span className="label">{sender[0]}</span>
          </div>
        )}
      </div>
    </>
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
  previous: propTypes.bool.isRequired,
}

export default memo(Message)
