import React from 'react'
import PropTypes from 'prop-types'
import MessageList from './MessageList'
import ChatHeader from './ChatHeader'
import UserInput from './UserInput'
import './styles.scss'

const Chat = props => {
  const {
    channel,
    posts,
    profiles,
    createPost,
    hideChat,
    currentUserId,
  } = props

  return (
    <div className="chat-wrapper">
      <ChatHeader channel={channel} hideChat={hideChat} />
      <MessageList
        posts={posts}
        profiles={profiles}
        currentUserId={currentUserId}
      />
      {channel.id && <UserInput channel={channel} createPost={createPost} />}
    </div>
  )
}

Chat.propTypes = {
  channel: PropTypes.instanceOf(Object).isRequired,
  posts: PropTypes.instanceOf(Array).isRequired,
  profiles: PropTypes.instanceOf(Object).isRequired,
  createPost: PropTypes.func.isRequired,
  hideChat: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
}

export default Chat
