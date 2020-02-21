import React, { memo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../../../ButtonContainer'

const Message = props => {
  const {
    id,
    sender,
    text,
    currentUserId,
    senderId,
    type,
    timeSent,
    dateSent,
    showDate,
    directChannel,
    files,
    channelId,
    senderMmUsername,
    iconMemberStatus,
    isAdmin,
    pinPost,
  } = props

  const [messageText, setMessageText] = useState(text)
  // Adds the text to be used for the date divider
  const today = new Date().toLocaleDateString()
  const dateText = dateSent === today ? 'Tänään' : dateSent

  // Checks if message type is users leaving or joining the channel
  const isUserLeavingOrJoiningChannel = () => {
    if (type === 'system_join_channel' || type === 'system_leave_channel') {
      return true
    }
    return false
  }
  // Get message wrapper classes
  const messageWrapperClassList = [
    'chat-message-wrapper',
    currentUserId === senderId ? 'wrapper-sent' : 'wrapper-received',
  ]

  // Get message content classes
  const messageContentClassList = [
    'chat-message-content',
    currentUserId === senderId ? 'content-sent' : 'content-received',
    isUserLeavingOrJoiningChannel() ? 'content-system-message' : '',
  ]

  useEffect(() => {
    if (type === 'system_join_channel') {
      if (senderId === currentUserId) {
        setMessageText('Sinä liityit kanavalle.')
      } else if (sender === 'Käyttäjä poistunut') {
        setMessageText(`Käyttäjä poistunut.`)
      } else {
        setMessageText(`${sender} liittyi kanavalle.`)
      }
    } else if (type === 'system_leave_channel') {
      if (senderId === currentUserId) {
        setMessageText('Sinä poistuit kanavalta.')
      } else if (sender === 'Käyttäjä poistunut') {
        setMessageText(`Käyttäjä poistunut.`)
      } else {
        setMessageText(`${sender} poistui kanavalta.`)
      }
    }
  }, [currentUserId, sender, senderId, type])

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
                  {isAdmin ? 'Valvoja' : sender}
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
            {currentUserId !== senderId && sender !== 'Käyttäjä poistunut' && (
              <div>
                <Link
                  to={`/profile/${senderMmUsername}`}
                  className="channel-name-link"
                >
                  <i aria-hidden="true" title={sender[0]} />
                  {isAdmin ? (
                    <div
                      className="label chat-message-sender-icon"
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                      }}
                    >
                      K
                    </div>
                  ) : (
                    <div
                      className="label chat-message-sender-icon"
                      style={{
                        backgroundImage: `url(
                        ${
                          process.env.REACT_APP_MATTERMOST_URL
                        }/api/v4/users/${senderId}/image?${Date.now()}
                      )`,
                      }}
                    />
                  )}
                </Link>
                <div className={iconMemberStatus} />
              </div>
            )}
            {currentUserId !== senderId && sender === 'Käyttäjä poistunut' && (
              <div className="chat-message-sender-icon">
                <i aria-hidden="true" title={sender[0]} />
                <span className="label">{sender[0]}</span>
              </div>
            )}
            <div className="chat-message-content-field">
              <div className={messageContentClassList.join(' ')}>
                {files && (
                  <>
                    <Link to={`${channelId}/${files[0]}`}>
                      <img
                        className="message-image"
                        src={`${process.env.REACT_APP_MATTERMOST_URL}/api/v4/files/${files[0]}/thumbnail`}
                        alt="attachment"
                      />
                    </Link>
                    <p className="image-message-content-text chat-message-content-text">
                      {messageText}
                    </p>
                  </>
                )}
                {!files && (
                  <p className="chat-message-content-text">{messageText}</p>
                )}
              </div>
              {currentUserId !== senderId &&
                !directChannel &&
                !isAdmin &&
                !isUserLeavingOrJoiningChannel() && (
                  <ButtonContainer
                    className="chat-report-message-icon"
                    onClick={() => pinPost(id)}
                  >
                    <i className="fas fa-ellipsis-v" aria-hidden="true" />
                  </ButtonContainer>
                )}
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
  senderMmUsername: '',
  iconMemberStatus: '',
  isAdmin: false,
}

Message.propTypes = {
  sender: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  type: propTypes.string,
  currentUserId: propTypes.string.isRequired,
  senderId: propTypes.string,
  directChannel: propTypes.bool.isRequired,
  timeSent: propTypes.string.isRequired,
  dateSent: propTypes.string.isRequired,
  showDate: propTypes.bool.isRequired,
  files: propTypes.instanceOf(Array),
  channelId: propTypes.string.isRequired,
  senderMmUsername: propTypes.string,
  iconMemberStatus: propTypes.string,
  isAdmin: propTypes.bool,
  pinPost: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
}

export default memo(Message)
