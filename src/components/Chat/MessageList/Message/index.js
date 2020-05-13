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
    isUserLeavingOrJoiningChannel,
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
    newMessageCount,
    lastViewed,
    createAt,
    messageDividerSet,
    setMessageDividerSet,
    lastPost,
  } = props

  const [messageText, setMessageText] = useState(text)
  const [image, setImage] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [showNewMessageDivider, setShowNewMessageDivider] = useState(false)
  const [newMessagesIndicator, setNewMessagesIndicator] = useState(0)

  useEffect(() => {
    if (
      lastViewed === createAt &&
      newMessageCount !== 0 &&
      !messageDividerSet &&
      !lastPost
    ) {
      setShowNewMessageDivider(true)
      setMessageDividerSet(true)
      setNewMessagesIndicator(lastViewed)
    } else if (messageDividerSet && lastViewed === newMessagesIndicator) {
      setShowNewMessageDivider(false)
    }
  }, [lastViewed, createAt])

  // checks if messagetext contains certain predetermined string and sets text to deleted if yes
  if (messageText.includes(process.env.REACT_APP_REMOVE_STRING)) {
    setMessageText('Viesti poistettu.')
    setDeleted(true)
  }
  // Adds the text to be used for the date divider
  const today = new Date().toLocaleDateString()
  const dateText = dateSent === today ? 'Tänään' : dateSent

  // Get message wrapper classes
  const messageWrapperClassList = [
    'chat-message-wrapper',
    currentUserId === senderId ? 'wrapper-sent' : 'wrapper-received',
    isUserLeavingOrJoiningChannel && isAdmin
      ? 'content-system-message-admin'
      : '',
  ]

  // Get message content classes
  const messageContentClassList = [
    'chat-message-content',
    currentUserId === senderId ? 'content-sent' : 'content-received',
    isUserLeavingOrJoiningChannel && !isAdmin ? 'content-system-message' : '',
    isAdmin ? 'content-received-admin' : '',
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
  }, [currentUserId, senderId, type])

  useEffect(() => {
    const getMemberImage = () => {
      const url = `${
        process.env.REACT_APP_MATTERMOST_URL
      }/api/v4/users/${senderId}/image?${Date.now()}`
      setImage(url)
    }
    getMemberImage()
  }, [senderId])

  const getMemberStatus = () => {
    let status = ''
    if (iconMemberStatus.includes('online')) {
      status = 'Käyttäjä paikalla'
    } else if (iconMemberStatus.includes('offline')) {
      status = 'Käyttäjä offline'
    } else if (iconMemberStatus.includes('away')) {
      status = 'Käyttäjä poissa'
    }
    return status
  }

  return (
    <>
      <div
        aria-haspopup="false"
        role="article"
        data-focusable="true"
        tabIndex={0}
        aria-live={lastPost ? 'polite' : 'off'}
        className="message-container"
      >
        {lastPost ? <span className="sr-only">Viimeisin viesti.</span> : ''}
        {showDate && (
          <div className="show-date-content">
            <div className="date-divider" />
            <span className="date-divider-text">{dateText}</span>
            <div className="date-divider" />
          </div>
        )}
        <div className={messageWrapperClassList.join(' ')}>
          <div className="message-outer">
            <span className="sr-only">
              Viesti lähettäjältä
              {isAdmin ? 'Valvoja' : sender}
            </span>
            {timeSent !== '' ? (
              <header
                className={`chat-message-header-content ${
                  senderId === currentUserId
                    ? 'own-chat-message-header'
                    : 'other-user-message-header'
                }`}
              >
                {currentUserId !== senderId && !directChannel && (
                  <p
                    aria-hidden
                    className={`chat-message-sender ${
                      sender === 'Poistunut käyttäjä'
                        ? 'chat-message-sender-unknown'
                        : ''
                    }`}
                  >
                    {isAdmin ? 'Valvoja' : sender}
                  </p>
                )}
                <span className="chat-message-timestamp">{timeSent}</span>
              </header>
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
                <header>
                  {isAdmin ? (
                    <div
                      className="label chat-message-sender-icon"
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                      }}
                    >
                      <span>K</span>
                      <span className="sr-only">Valvoja</span>
                    </div>
                  ) : (
                    <Link
                      to={`/profile/${senderMmUsername}`}
                      className="channel-name-link"
                      aria-label="Linkki profiiliin"
                    >
                      <i aria-hidden="true" title={sender[0]} />
                      <div
                        className="label chat-message-sender-icon"
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                      />
                    </Link>
                  )}

                  <div className={iconMemberStatus} aria-hidden />
                  <span className="sr-only">{getMemberStatus()}</span>
                </header>
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
                            alt="liite"
                          />
                          <span className="sr-only">Linkki kuvaan</span>
                        </Link>
                        <span className="sr-only">Kuvateksti</span>
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
                        <div
                          className="player-wrapper"
                          aria-label="Videoviesti"
                        >
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
                            height="200px"
                            style={{ outline: 'none' }}
                          />
                        </div>
                        <span className="sr-only">Viesti</span>
                        <p className="image-message-content-text chat-message-content-text">
                          {messageText}
                        </p>
                      </>
                    )}
                  {files &&
                    !deleted &&
                    files[0] &&
                    filesData[files[0]].mime_type.includes('audio') && (
                      <div className="player-wrapper" aria-label="ääniviesti">
                        <ReactAudioPlayer
                          src={`${process.env.REACT_APP_MATTERMOST_URL}/api/v4/files/${files[0]}`}
                          controls
                          preload="metadata"
                          controlsList="nodownload"
                          style={{ maxWidth: '53vw', outline: 'none' }}
                        />
                      </div>
                    )}
                  {files && deleted && (
                    <>
                      <span className="sr-only">Viesti</span>
                      <p className="chat-message-content-text">{messageText}</p>
                    </>
                  )}
                  {!files && (
                    <>
                      <span className="sr-only">Viesti</span>
                      <p className="chat-message-content-text">{messageText}</p>
                    </>
                  )}
                </div>
                {currentUserId !== senderId &&
                  !directChannel &&
                  !isAdmin &&
                  !isUserLeavingOrJoiningChannel && (
                    <ButtonContainer
                      className="chat-report-message-icon"
                      onClick={() => pinPost(id, senderId, text)}
                      label="Ilmoita asiattomasta viestistä"
                    >
                      <i className="fas fa-ellipsis-v" aria-hidden="true" />
                    </ButtonContainer>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showNewMessageDivider && messageDividerSet && (
        <div className="show-date-content">
          <div className="new-message-divider" />
          <h2 className="new-message-divider-text" id="newMessages">
            Uudet tapahtumat
          </h2>
          <div className="new-message-divider" />
        </div>
      )}
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
  isUserLeavingOrJoiningChannel: propTypes.bool.isRequired,
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
  newMessageCount: propTypes.number,
  lastViewed: propTypes.number.isRequired,
  createAt: propTypes.number.isRequired,
  messageDividerSet: propTypes.bool.isRequired,
  setMessageDividerSet: propTypes.func.isRequired,
  lastPost: propTypes.bool.isRequired,
}

Message.defaultProps = {
  newMessageCount: 0,
}

export default memo(Message)
