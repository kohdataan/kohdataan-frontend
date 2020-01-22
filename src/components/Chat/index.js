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
    uploadFile,
    getFilesForPost,
    currentUserId,
    members,
    handleLeaveChannel,
    statuses,
    handleLogout,
  } = props

  const iconColors = [
    'orange',
    'darkblue',
    'maroon',
    '#ffe9d9',
    'green',
    'red',
    'lightblue',
    'gray',
  ]

  const [showSider, setShowSider] = useState(false)
  const directChannel = channel.type === 'D'

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
    if (user && user.delete_at === 0) {
      if (user && user.nickname) {
        visibleName = user.nickname
      } else if (user) {
        visibleName = user.username
      }
      return visibleName
    }
    return 'Käyttäjä poistunut'
  }

  const getStatusById = id => {
    const status = id ? statuses[id] : ''
    return status
  }

  const getOtherUserName = () => {
    if (directChannel) {
      const otherUser = members.find(member => member.user_id !== currentUserId)
      if (otherUser) {
        return (
          <>
            <img
              className="friend-icon"
              src={`http://${process.env.REACT_APP_MATTERMOST_URL}/api/v4/users/${otherUser.user_id}/image`}
              alt="Profiilikuva"
            />
            {getNicknameById(otherUser.user_id)}
          </>
        )
      }
    }
    return null
  }

  const getOtherUser = () => {
    if (directChannel) {
      const friend = members.find(member => member.user_id !== currentUserId)
      const mmid = friend && friend.user_id
      const mmProfile = Object.values(profiles).find(
        profile => profile.id === mmid
      )
      return mmProfile && mmProfile.username
    }
    return null
  }

  return (
    <div className="chat-wrapper" id="chat">
      <ChatHeader
        channel={channel}
        toggleSider={toggleSider}
        otherUser={getOtherUserName()}
        otherUserName={getOtherUser()}
        direct={directChannel}
        handleLogout={handleLogout}
      />
      <MessageList
        posts={posts}
        getFilesForPost={getFilesForPost}
        currentUserId={currentUserId}
        getUserNamebyId={getNicknameById}
        getIconColor={getIconColor}
        directChannel={directChannel}
      />
      {channel.id && (
        <UserInput
          channel={channel}
          createPost={createPost}
          uploadFile={uploadFile}
          currentUserId={currentUserId}
        />
      )}
      {showSider && !directChannel && (
        <MembersSider
          members={members}
          profiles={profiles}
          currentUserId={currentUserId}
          getNickNamebyId={getNicknameById}
          getIconColor={getIconColor}
          handleLeaveChannel={handleLeaveChannel}
          getStatusById={getStatusById}
          toggleSiderClosedIfOpen={toggleSiderClosedIfOpen}
          channel={channel}
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
  getFilesForPost: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
  handleLeaveChannel: PropTypes.func.isRequired,
  statuses: PropTypes.instanceOf(Object).isRequired,
  handleLogout: PropTypes.func.isRequired,
}

Chat.defaultProps = {
  members: [],
}

export default memo(Chat)
