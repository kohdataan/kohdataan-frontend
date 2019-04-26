import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MessageList from './MessageList'
import ChatHeader from './ChatHeader'
import UserInput from './UserInput'
import MembersSider from './MembersSider'
import './styles.scss'

const Chat = props => {
  const { channel, posts, profiles, createPost, currentUserId, members } = props
  const iconColors = ['orange', 'darkblue', 'maroon', 'beige', 'green']
  const [showSider, setShowSider] = useState(false)

  const getIconColor = userId => {
    const index = members.findIndex(member => member.user_id === userId)
    return iconColors[index] || ''
  }

  const toggleSider = () =>
    showSider === true ? setShowSider(false) : setShowSider(true)

  const getUserNamebyId = id => {
    const user = Object.values(profiles).find(profile => profile.id === id)
    return user ? user.username : ''
  }

  return (
    <div className="chat-wrapper">
      <ChatHeader channel={channel} toggleSider={toggleSider} />
      <MessageList
        posts={posts}
        currentUserId={currentUserId}
        getUserNamebyId={getUserNamebyId}
        getIconColor={getIconColor}
      />
      {channel.id && <UserInput channel={channel} createPost={createPost} />}
      {showSider && (
        <MembersSider
          members={members}
          currentUserId={currentUserId}
          getUserNamebyId={getUserNamebyId}
          getIconColor={getIconColor}
        />
      )}
    </div>
  )
}

Chat.propTypes = {
  channel: PropTypes.instanceOf(Object).isRequired,
  posts: PropTypes.instanceOf(Array).isRequired,
  profiles: PropTypes.instanceOf(Object).isRequired,
  members: PropTypes.instanceOf(Object).isRequired,
  createPost: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
}

export default Chat
