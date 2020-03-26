import React, { memo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
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
    filesData,
  } = props

  const [messageText, setMessageText] = useState(text)
  const [image, setImage] = useState(null)
  const [deleted, setDeleted] = useState(false)

  // checks if messagetext contains certain predetermined string and sets text to deleted if yes
  if (messageText.includes('STRING_TO_USE')) {
    setMessageText('Viesti poistettu.')
    setDeleted(true)
  }
  // Adds the text to be used for the date divider
  const today = new Date().toLocaleDateString()
  const dateText = dateSent === today ? 'Tänään' : dateSent

  // Checks if message type is users leaving or joining the channel
  const isUserLeavingOrJoiningChannel = () => {
    if (
      type === 'system_join_channel' ||
      type === 'system_leave_channel' ||
      type === 'system_join_team' ||
      type === 'system_leave_team'
    ) {
      return true
    }
    return false
  }
  // Get message wrapper classes
  const messageWrapperClassList = [
    'chat-message-wrapper',
    currentUserId === senderId ? 'wrapper-sent' : 'wrapper-received',
    isUserLeavingOrJoiningChannel() && isAdmin
      ? 'content-system-message-admin'
      : '',
  ]

  // Get message content classes
  const messageContentClassList = [
    'chat-message-content',
    currentUserId === senderId ? 'content-sent' : 'content-received',
    isUserLeavingOrJoiningChannel() && !isAdmin ? 'content-system-message' : '',
  ]

  useEffect(() => {
    if (type === 'system_join_channel' || type === 'system_join_team') {
      if (senderId === currentUserId) {
        setMessageText('Sinä liityit kanavalle.')
      } else {
        setMessageText(`Käyttäjä liittyi kanavalle.`)
      }
    } else if (
      type === 'system_leave_channel' ||
      type === 'system_leave_team'
    ) {
      if (senderId === currentUserId) {
        setMessageText('Sinä poistuit kanavalta.')
      } else {
        setMessageText(`Käyttäjä poistui kanavalta.`)
      }
    }
  }, [currentUserId, sender, senderId, type])

  useEffect(() => {
    const getMemberImage = () => {
      const url = `${
        process.env.REACT_APP_MATTERMOST_URL
      }/api/v4/users/${senderId}/image?${Date.now()}`
      setImage(url)
    }
    getMemberImage()
  }, [senderId])

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
                    sender === 'Poistunut käyttäjä'
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
            {currentUserId !== senderId && sender !== 'Poistunut käyttäjä' && (
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
                        backgroundImage: `url(${image})`,
                      }}
                    />
                  )}
                </Link>
                <div className={iconMemberStatus} />
              </div>
            )}
            {currentUserId !== senderId && sender === 'Poistunut käyttäjä' && (
              <div className="deleted-user-icon-container">
                <div className="chat-message-sender-icon">
                  <i className="fas fa-circle deleted-user-chat-icon" />
                </div>
              </div>
            )}
            <div className="chat-message-content-field">
              <div className={messageContentClassList.join(' ')}>
                {files &&
                  !deleted &&
                  files[0] &&
                  filesData[files[0]].mime_type.includes('image') && (
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
                {files &&
                  !deleted &&
                  files[0] &&
                  filesData[files[0]].mime_type.includes('video') && (
                    <>
                      <div className="player-wrapper">
                        <ReactPlayer
                          className="react-player"
                          url={`${process.env.REACT_APP_MATTERMOST_URL}/api/v4/files/${files[0]}`}
                          controls
                          config={{
                            file: {
                              attributes: {
                                controlsList: 'nodownload noremoteplayback',
                                disablePictureInPicture: true,
                              },
                            },
                          }}
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <p className="image-message-content-text chat-message-content-text">
                        {messageText}
                      </p>
                    </>
                  )}
                {files &&
                  !deleted &&
                  files[0] &&
                  filesData[files[0]].mime_type.includes('audio') && (
                    <div className="player-wrapper">
                      <ReactAudioPlayer
                        src={`${process.env.REACT_APP_MATTERMOST_URL}/api/v4/files/${files[0]}`}
                        controls
                        preload="auto"
                        controlsList="nodownload"
                        style={{ maxWidth: '53vw' }}
                      />
                    </div>
                  )}
                {files && deleted && (
                  <p className="chat-message-content-text">{messageText}</p>
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
                    onClick={() => pinPost(id, senderId, text)}
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
  filesData: propTypes.instanceOf(Object).isRequired,
  id: propTypes.string.isRequired,
}

export default memo(Message)
