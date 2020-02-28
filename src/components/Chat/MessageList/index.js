import React, { memo, useEffect, useRef } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Message from './Message'
import getUsernameById from '../../../utils/getUsernameById'
import { isSystemAdmin, isTeamAdmin } from '../../../utils/userIsAdmin'

const MessageList = props => {
  const {
    posts,
    teams,
    currentUserId,
    getUserNamebyId,
    directChannel,
    channelId,
    profiles,
    getStatusById,
    pinPost,
    filesData,
  } = props

  const getIconMemberStatus = userId =>
    `chat-${getStatusById(userId)}-status-icon`

  const ref = useRef()

  let previousTime = null
  let previousDate = null
  let previousSender = null

  const setTimeStampValues = post => {
    let showDate = false
    let showTime = true
    const sender = getUserNamebyId(post.user_id)
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }
    const dateSent = new Date(post.create_at).toLocaleDateString(
      'fi-FI',
      options
    )
    const timeSent = new Date(post.create_at).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    if (previousTime === null && previousTime !== '') {
      previousTime = timeSent
      previousSender = sender
    }

    if (dateSent === previousDate && previousTime === timeSent) {
      showTime = false
    }
    if (previousSender !== sender) {
      showTime = true
      previousSender = sender
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

  const isAdmin = id => {
    if (isSystemAdmin(id, profiles) || isTeamAdmin(id, teams)) {
      return true
    }
    return false
  }

  useEffect(() => {
    // TODO: implement some kind of button to scroll down when there are new messages
    ref.current.scrollTop = ref.current.scrollHeight
  })

  return (
    <div className="chat-message-list-container chat--message-list" ref={ref}>
      <div className="chat--message-list--container">
        {posts.length > 0 &&
          posts
            .filter(
              p =>
                p.type !== 'system_purpose_change' &&
                (p.type === '' ||
                  ((p.type === 'system_join_channel' ||
                    p.type === 'system_leave_channel' ||
                    p.type === 'system_join_team' ||
                    p.type === 'system_leave_team') &&
                    !isAdmin(p.user_id)))
            )
            .map(post => {
              const timestampValues = setTimeStampValues(post)
              return (
                post &&
                post.user_id && (
                  <Message
                    key={post.id}
                    id={post.id}
                    files={post.file_ids}
                    type={post.type}
                    url={post.url}
                    sender={getUserNamebyId(post.user_id)}
                    text={post.message}
                    senderId={post.user_id}
                    currentUserId={currentUserId}
                    directChannel={directChannel}
                    timeSent={timestampValues.sendTime}
                    dateSent={timestampValues.sendDate}
                    showDate={timestampValues.show}
                    channelId={channelId}
                    senderMmUsername={getUsernameById(post.user_id, profiles)}
                    iconMemberStatus={getIconMemberStatus(post.user_id)}
                    isAdmin={isAdmin(post.user_id)}
                    pinPost={pinPost}
                    filesData={filesData}
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
  teams: propTypes.instanceOf(Object).isRequired,
  currentUserId: propTypes.string.isRequired,
  getUserNamebyId: propTypes.func.isRequired,
  directChannel: propTypes.bool.isRequired,
  channelId: propTypes.string.isRequired,
  profiles: propTypes.instanceOf(Object).isRequired,
  getStatusById: propTypes.func.isRequired,
  pinPost: propTypes.func.isRequired,
  filesData: propTypes.instanceOf(Object).isRequired,
}

export default memo(MessageList)
