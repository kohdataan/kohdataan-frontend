import React, { memo, useEffect, useState, useRef } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Message from './Message'
import getUsernameById from '../../../utils/getUsernameById'
import { isSystemAdmin, isTeamAdmin } from '../../../utils/userIsAdmin'
import isUserLeavingOrJoiningChannel from '../../../utils/isUserLeavingOrJoiningChannel'

const MessageList = props => {
  const {
    posts,
    teams,
    currentUserId,
    getNickNamebyId,
    directChannel,
    channelId,
    profiles,
    getStatusById,
    pinPost,
    filesData,
    dividerId,
    lastViewedAt,
  } = props

  const [filteredPosts, setFilteredPosts] = useState([])

  const getIconMemberStatus = userId =>
    `chat-${getStatusById(userId)}-status-icon`

  const ref = useRef()

  let previousTime = null
  let previousDate = null
  let previousSender = null

  const setTimeStampValues = post => {
    let showDate = false
    let showTime = true
    const sender = getNickNamebyId(post.user_id)
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
    return isSystemAdmin(id, profiles) || isTeamAdmin(id, teams)
  }

  useEffect(() => {
    // TODO: implement some kind of button to scroll down when there are new messages
    ref.current.scrollTop = ref.current.scrollHeight
  })

  useEffect(() => {
    const filtered = posts.filter(
      p =>
        p.type !== 'system_purpose_change' &&
        (p.type === '' ||
          (isUserLeavingOrJoiningChannel(p) && !isAdmin(p.user_id)))
    )
    setFilteredPosts(filtered)
  }, [posts])

  const getLastPost = post => post.create_at === lastViewedAt

  return (
    <div className="chat-message-list-container chat--message-list" ref={ref}>
      <div className="chat--message-list--container">
        {posts.length > 0 &&
          filteredPosts.map(post => {
            const timestampValues = setTimeStampValues(post)
            const isUserLeavingOrJoining = isUserLeavingOrJoiningChannel(post)
            return (
              post &&
              post.user_id && (
                <Message
                  key={post.id}
                  id={post.id}
                  files={post.file_ids}
                  type={post.type}
                  url={post.url}
                  sender={getNickNamebyId(post.user_id)}
                  text={isUserLeavingOrJoining ? '' : post.message}
                  isUserLeavingOrJoiningChannel={isUserLeavingOrJoining}
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
                  lastPost={getLastPost(post)}
                  dividerId={dividerId}
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
  getNickNamebyId: propTypes.func.isRequired,
  directChannel: propTypes.bool.isRequired,
  channelId: propTypes.string.isRequired,
  profiles: propTypes.instanceOf(Object).isRequired,
  getStatusById: propTypes.func.isRequired,
  pinPost: propTypes.func.isRequired,
  filesData: propTypes.instanceOf(Object).isRequired,
  dividerId: propTypes.string,
  lastViewedAt: propTypes.number.isRequired,
}

MessageList.defaultProps = {
  dividerId: null,
}

export default memo(MessageList)
