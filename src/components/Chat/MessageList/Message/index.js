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
    timeSent,
    dateSent,
    showDate,
    directChannel,
    files,
  } = props

  // Adds the text to be used for the date divider
  const today = new Date().toLocaleDateString()
  const dateText = dateSent === today ? 'Tänään' : dateSent

  // Checks if message is combined user activity message
  const isSystemCombinedUserActivity = () =>
    type === 'system_combined_user_activity'

  // Get message wrapper classes
  const messageWrapperClassList = [
    'chat-message-wrapper',
    currentUserId === senderId ? 'wrapper-sent' : 'wrapper-received',
  ]

  // Get message content classes
  const messageContentClassList = [
    'chat-message-content',
    currentUserId === senderId ? 'content-sent' : 'content-received',
    isSystemCombinedUserActivity() ? 'content-system-combined' : '',
  ]

  return (
    <>
      {showDate && (
        <div className="show-date-content">
          <div className="date-divider" />
          <span className="date-divider-text">{dateText}</span>
          <div className="date-divider" />
        </div>
      )}
      <div className={messageWrapperClassList.join(' ')}>
        <div className="message-outer">
          {timeSent !== '' ? (
            <div className="chat-message-header-content">
              <span className="chat-message-timestamp">{timeSent}</span>
              {currentUserId !== senderId && !directChannel && (
                <h3
                  className={`chat-message-sender ${
                    sender === 'Käyttäjä poistunut'
                      ? 'chat-message-sender-unknown'
                      : ''
                  }`}
                >
                  {sender}
                </h3>
              )}
            </div>
          ) : (
            <div className="message-without-header-content" />
          )}
          <div
            className={`${
              currentUserId === senderId
                ? 'message-icon-and-content-sent'
                : 'message-icon-and-content'
            }`}
          >
            {currentUserId !== senderId && (
              <div
                className="chat-message-sender-icon"
                style={{ backgroundColor: iconColor }}
              >
                <i aria-hidden="true" title={sender[0]} />
                <span className="label">{sender[0]}</span>
              </div>
            )}
            <div className="chat-message-content-field">
              <div className={messageContentClassList.join(' ')}>
                <p className="chat-message-content-text">{text}</p>
                {files && (
                  <img
                    src={`http://${process.env.REACT_APP_MATTERMOST_URL}/api/v4/files/${files[0]}/thumbnail`}
                    alt="attachment"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Message.defaultProps = {
  type: '',
  senderId: '',
  files: null,
}

Message.propTypes = {
  sender: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  type: propTypes.string,
  currentUserId: propTypes.string.isRequired,
  senderId: propTypes.string,
  iconColor: propTypes.string.isRequired,
  directChannel: propTypes.bool.isRequired,
  timeSent: propTypes.string.isRequired,
  dateSent: propTypes.string.isRequired,
  showDate: propTypes.bool.isRequired,
  files: propTypes.instanceOf(Array),
}

export default memo(Message)
