import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import MessageList from './MessageList'
import ChatHeader from './ChatHeader'
import UserInput from './UserInput'
import MembersSider from './MembersSider'
import './styles.scss'

const Chat = props => {
  const {
    channel,
    posts,
    profiles,
    createPost,
    currentUserId,
    members,
    handleLeaveChannel,
    statuses,
  } = props

  const iconColors = ['orange', 'darkblue', 'maroon', 'beige', 'green']
  const [showSider, setShowSider] = useState(false)

  const getIconColor = userId => {
    const index = members.findIndex(member => member.user_id === userId)
    return iconColors[index] || ''
  }

  const toggleSider = () => setShowSider(!showSider)

  const toggleSiderClosedIfOpen = () => {
    if (showSider) {
      setShowSider(false)
    }
  }

  const getNicknameById = id => {
    const user = Object.values(profiles).find(profile => profile.id === id)
    let visibleName = ''
    if (user && user.nickname) {
      visibleName = user.nickname
    } else if (user) {
      visibleName = user.username
    }
    return visibleName
  }

  const getStatusById = id => {
    const status = id ? statuses[id] : ''
    return status
  }

  return (
    <div className="chat-wrapper" id="chat">
      <ChatHeader channel={channel} toggleSider={toggleSider} />
      <MessageList
        posts={posts}
        currentUserId={currentUserId}
        getUserNamebyId={getNicknameById}
        getIconColor={getIconColor}
      />
      {channel.id && <UserInput channel={channel} createPost={createPost} />}
      {showSider && (
        <MembersSider
          members={members}
          currentUserId={currentUserId}
          getUserNamebyId={getNicknameById}
          getIconColor={getIconColor}
          handleLeaveChannel={handleLeaveChannel}
          getStatusById={getStatusById}
          toggleSiderClosedIfOpen={toggleSiderClosedIfOpen}
        />
      )}
    </div>
  )
}

Chat.propTypes = {
  channel: PropTypes.instanceOf(Object).isRequired,
  posts: PropTypes.instanceOf(Array).isRequired,
  profiles: PropTypes.instanceOf(Object).isRequired,
  members: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  createPost: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
  handleLeaveChannel: PropTypes.func.isRequired,
  statuses: PropTypes.instanceOf(Array).isRequired,
}

Chat.defaultProps = {
  members: [],
}

export default memo(Chat)
