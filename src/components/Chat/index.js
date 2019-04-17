import React from 'react'
import PropTypes from 'prop-types'
import MessageList from './MessageList'
import Header from './Header'
import UserInput from './UserInput'
import './styles.scss'

const Chat = props => {
  const { channel, posts, createPost } = props

  return (
    <div>
      <Header channel={channel} />
      <MessageList posts={posts} />
      {channel.id && <UserInput channel={channel} createPost={createPost} />}
    </div>
  )
}

Chat.propTypes = {
  channel: PropTypes.instanceOf(Object).isRequired,
  posts: PropTypes.instanceOf(Array).isRequired,
  createPost: PropTypes.func.isRequired,
}

export default Chat
