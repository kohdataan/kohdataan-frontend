import React, { useEffect, useState, memo } from 'react'
import PropTypes from 'prop-types'
import MessageList from './MessageList'
import ChatHeader from './ChatHeader'
import UserInput from './UserInput'
import MembersSider from './MembersSider'
import ModalContainer from '../ModalContainer'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

const Chat = props => {
  const {
    channel,
    teams,
    posts,
    profiles,
    createPost,
    uploadFile,
    getFilesForPost,
    currentUserId,
    profilesInChannel,
    membersInChannel,
    handleLeaveChannel,
    statuses,
    handleLogout,
    sendEmail,
    location,
    pinPost,
    filesData,
    mmUser,
    dividerId,
    lastViewedAt,
  } = props

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setCurrentUser(
      membersInChannel.find(member => member.user_id === currentUserId)
    )
  }, [currentUser, currentUserId, membersInChannel])

  const [showSider, setShowSider] = useState(false)
  const [pinPostModalIsOpen, setPinPostModalIsOpen] = useState(false)
  const [afterPinModal, setAfterPinModal] = useState(false)
  const [pinPostId, setPinPostId] = useState(null)
  const [pinPostSenderData, setPinPostSenderData] = useState(null)
  const [pinPostText, setPinPostText] = useState(null)
  const directChannel = channel.type === 'D'
  const [membersToShow, setMembersToShow] = useState([])

  useEffect(() => {
    const getMembersToShow = () => {
      if (!directChannel) {
        const activeUserIds = profilesInChannel.map(profile => profile.id)
        const members = Object.values(membersInChannel).filter(member =>
          activeUserIds.includes(member.user_id)
        )
        setMembersToShow(members)
      } else {
        setMembersToShow(membersInChannel)
      }
    }
    getMembersToShow()
  }, [membersInChannel, profilesInChannel, directChannel])

  const toggleSider = () => setShowSider(!showSider)

  const toggleSiderClosedIfOpen = () => {
    if (showSider) {
      setShowSider(false)
    }
  }

  const getNicknameById = id => {
    const user = Object.values(profiles).find(profile => profile.id === id)
    let visibleName = 'Käyttäjä'
    if (user && user.delete_at === 0 && user.position !== 'deleted') {
      if (user && user.nickname) {
        visibleName = user.nickname
      }
      return visibleName
    }
    if (user && (user.delete_at !== 0 || user.position === 'deleted')) {
      return 'Poistunut käyttäjä'
    }
    return '...'
  }

  const getUserDataById = id =>
    Object.values(profiles).find(profile => profile.id === id)

  const getStatusById = id => {
    const status = id ? statuses[id] : ''
    return status
  }

  const getOtherUserName = () => {
    if (directChannel) {
      const otherUser = membersInChannel.find(
        member => member.user_id !== currentUserId
      )
      if (otherUser) {
        return (
          <>
            <img
              className="friend-icon"
              src={`${process.env.REACT_APP_MATTERMOST_URL}/api/v4/users/${otherUser.user_id}/image`}
              alt="Profiilikuva"
            />
            <span className="direct-chat-header-name">
              {getNicknameById(otherUser.user_id)}
            </span>
          </>
        )
      }
    }
    return null
  }

  const getOtherUser = () => {
    if (directChannel) {
      const friend = membersInChannel.find(
        member => member.user_id !== currentUserId
      )
      const mmid = friend && friend.user_id
      const mmProfile = Object.values(profiles).find(
        profile => profile.id === mmid
      )
      return mmProfile && mmProfile.username
    }
    return null
  }

  const getDeleted = () => {
    if (directChannel) {
      const friend = membersToShow.find(
        member => member.user_id !== currentUserId
      )
      const mmid = friend && friend.user_id
      const mmProfile = Object.values(profiles).find(
        profile => profile.id === mmid
      )
      if (
        mmProfile &&
        (mmProfile.delete_at !== 0 || mmProfile.position === 'deleted')
      )
        return true
    }
    return false
  }

  const handlePinPost = (id, senderId, text) => {
    setPinPostSenderData(getUserDataById(senderId))
    setPinPostText(text)
    setPinPostModalIsOpen(true)
    setPinPostId(id)
  }

  const closePinPostModal = () => {
    setPinPostSenderData(getUserDataById(null))
    setPinPostText(null)
    setPinPostModalIsOpen(false)
    setPinPostId(null)
  }

  const completePinPost = id => {
    const currentUserData = getUserDataById(currentUserId)
    sendEmail({
      name: `${currentUserData.nickname}(${currentUserData.username})`,
      email: currentUserData.email,
      message: `Käyttäjä ${pinPostSenderData.nickname}(${pinPostSenderData.username}) lähetti seuraavan viestin ryhmään ${channel.display_name}: ${pinPostText}`,
      type: 'reported post',
    })
    pinPost(id)
    closePinPostModal()
    setAfterPinModal(true)
  }

  const closeAfterPinModal = () => {
    setAfterPinModal(false)
  }

  return (
    <main className="chat-wrapper" id="chat">
      <ChatHeader
        channel={channel}
        toggleSider={toggleSider}
        otherUser={getOtherUserName()}
        otherUserName={getOtherUser()}
        direct={directChannel}
        handleLogout={handleLogout}
        location={location}
        deleted={getDeleted()}
        mmUser={mmUser}
      />
      <MessageList
        posts={posts}
        getFilesForPost={getFilesForPost}
        currentUserId={currentUserId}
        getNickNamebyId={getNicknameById}
        directChannel={directChannel}
        channelId={channel.id}
        profiles={profiles}
        getStatusById={getStatusById}
        pinPost={handlePinPost}
        filesData={filesData}
        teams={teams}
        location={location}
        dividerId={dividerId}
        lastViewedAt={lastViewedAt}
      />
      {channel.id && (
        <UserInput
          channel={channel}
          createPost={createPost}
          uploadFile={uploadFile}
          currentUserId={currentUserId}
          filesData={filesData}
        />
      )}
      {channel.id && getDeleted() && directChannel && (
        <div className="inactive-userinput-field">
          <p>Et voi lähettää viestiä poistuneelle käyttäjälle.</p>
        </div>
      )}
      {showSider && !directChannel && (
        <MembersSider
          members={membersToShow}
          profiles={profilesInChannel}
          currentUserId={currentUserId}
          getNickNamebyId={getNicknameById}
          handleLeaveChannel={handleLeaveChannel}
          getStatusById={getStatusById}
          toggleSiderClosedIfOpen={toggleSiderClosedIfOpen}
          channel={channel}
          teams={teams}
        />
      )}
      <ModalContainer
        modalIsOpen={pinPostModalIsOpen}
        closeModal={closePinPostModal}
        label="report-message-modal"
      >
        <h3>Haluatko ilmoittaa tämän viestin asiattomaksi?</h3>
        <div className="report-message-buttons-wrapper">
          <ButtonContainer
            secondary
            onClick={() => closePinPostModal()}
            className="report-message-button"
          >
            <p>En</p>
          </ButtonContainer>
          <ButtonContainer
            onClick={() => completePinPost(pinPostId)}
            className="report-message-button"
          >
            <p>Kyllä</p>
          </ButtonContainer>
        </div>
      </ModalContainer>
      <ModalContainer
        modalIsOpen={afterPinModal}
        closeModal={closeAfterPinModal}
        label="report-message-finish-modal"
      >
        <h3>Viesti ilmoitettu asiattomaksi.</h3>
        <ButtonContainer
          className="report-message-finish-button"
          onClick={closeAfterPinModal}
        >
          Valmis
        </ButtonContainer>
      </ModalContainer>
    </main>
  )
}

Chat.propTypes = {
  channel: PropTypes.instanceOf(Object).isRequired,
  teams: PropTypes.instanceOf(Object).isRequired,
  posts: PropTypes.instanceOf(Array).isRequired,
  profiles: PropTypes.instanceOf(Object).isRequired,
  membersInChannel: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  profilesInChannel: PropTypes.instanceOf(Array).isRequired,
  createPost: PropTypes.func.isRequired,
  getFilesForPost: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
  handleLeaveChannel: PropTypes.func.isRequired,
  statuses: PropTypes.instanceOf(Object).isRequired,
  handleLogout: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  pinPost: PropTypes.func.isRequired,
  filesData: PropTypes.instanceOf(Object).isRequired,
  mmUser: PropTypes.instanceOf(Object).isRequired,
  dividerId: PropTypes.string,
  lastViewedAt: PropTypes.number.isRequired,
}

Chat.defaultProps = {
  membersInChannel: [],
  dividerId: null,
}

export default memo(Chat)
