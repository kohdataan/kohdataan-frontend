import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ButtonContainer from '../../ButtonContainer'
import ModalContainer from '../../ModalContainer'
import { TextLine } from '../../ContentLoader'
import {
  addUserToBlocked,
  removeUserFromBlocked,
} from '../../../api/blocking/blocked_user'
import { getUserByUsername, getUser } from '../../../api/user/user'

const Friend = props => {
  const {
    channel,
    unreadCount,
    getUsername,
    getPosts,
    getLatestMessage,
    membersInChannel,
    myUserInfo,
    getStatusById,
    currentUserId,
  } = props

  const [user, setUser] = useState({})
  const [posts, setPosts] = useState({})
  const [blockedFriends, setBlockedFriends] = useState(myUserInfo.blockedUsers)
  const [blocked, setBlocked] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [otherUserInfo, setOtherUserInfo] = useState({})

  const getIconMemberStatus = userId =>
    `friends-${getStatusById(userId)}-status-icon`

  const imageUri =
    user && user.id
      ? `${process.env.REACT_APP_MATTERMOST_URL}/api/v4/users/${
          user.id
        }/image?${Date.now()}`
      : null
  const message = getLatestMessage(posts)

  useEffect(() => {
    // get member userinfo
    const members = Object.values(membersInChannel[channel.id])
    const getUserInfo = async () => {
      const userObj = getUsername(members)
      if (userObj) {
        setUser(userObj)
      }
    }
    getUserInfo()
  }, [getUsername, membersInChannel, channel])

  useEffect(() => {
    // Get channel posts
    const fetchPosts = async () => {
      if (channel && channel.id) {
        const channelPosts = await getPosts(channel.id, 0, 100)
        if (channelPosts.data) setPosts(channelPosts.data)
      }
    }
    fetchPosts()
  }, [channel, getPosts])

  useEffect(() => {
    // checks if friend is blocked
    const checkUserBlockedStatus = async () => {
      if (blockedFriends && blockedFriends.indexOf(user.id) !== -1) {
        setBlocked(true)
      }
    }
    if (myUserInfo && user) checkUserBlockedStatus()
  }, [user, myUserInfo, blockedFriends])

  useEffect(() => {
    // fetches user info for other user containing blocked users
    const fetchOtherUser = async () => {
      if (user && user.delete_at === 0 && user.username !== 'surveybot') {
        const userInfo = await getUserByUsername(
          user.username,
          localStorage.getItem('authToken')
        )
        if (userInfo) {
          const res = await getUser(
            userInfo.id,
            localStorage.getItem('authToken')
          )
          if (res) setOtherUserInfo(res)
        }
      }
    }
    fetchOtherUser()
  }, [user])

  const toggleBlockedStatus = async () => {
    const { id } = user
    const token = localStorage.getItem('authToken')
    if (blockedFriends.includes(id)) {
      setBlockedFriends(blockedFriends.filter(foundId => foundId !== id))
      const data = { unblockedUser: user.id }
      await removeUserFromBlocked(data, token)
      setBlocked(false)
    } else {
      setBlockedFriends(blockedFriends.concat(id))
      const data = { blockedUser: user.id }
      await addUserToBlocked(data, token)
      setBlocked(true)
    }
    setShowModal(false)
  }

  if (
    user.delete_at === 0 &&
    user.username !== 'surveybot' &&
    otherUserInfo.blockedUsers &&
    !otherUserInfo.blockedUsers.includes(currentUserId)
  ) {
    return (
      <div className="friend-box-container">
        <div className="friend-icon-box">
          {!blocked && (
            <div>
              <img className="friend-icon" src={imageUri} alt="Profiilikuva" />
              <div className={getIconMemberStatus(user.id)} />
            </div>
          )}
          {blocked && <i className="fas fa-ban fa-lg blocked-icon" />}
        </div>
        <div className="friend-messages-content">
          <Link
            className="friend-box"
            to={blocked ? `/friends` : `/chat/${channel.id}`}
          >
            <div className="friend-box-content">
              <div
                className={blocked ? 'blocked-friend-header' : 'friend-header'}
              >
                <span className="sr-only">Viesti käyttäjältä </span>
                <p className="friends-nickname">{user.nickname}</p>
              </div>
              <div
                className={
                  blocked
                    ? 'blocked-friend-text-content text-content'
                    : 'friend-text-content text-content'
                }
              >
                {message && !blocked ? (
                  <>{message}</>
                ) : (
                  <TextLine className="text-content" />
                )}
              </div>
            </div>
          </Link>
          <Link
            className="unread-box"
            to={blocked ? `/friends` : `/chat/${channel.id}`}
          >
            {unreadCount > 0 && !blocked ? (
              <mark className="unread-badge">{unreadCount}</mark>
            ) : (
              <div className="no-unread-messages">{}</div>
            )}
            <span className="sr-only">
              `{unreadCount} lukemattomia viestejä`
            </span>
          </Link>
          <ButtonContainer
            className="icon-btn block-user-icon-btn"
            onClick={() => setShowModal(true)}
            label="Estä käyttäjä"
          >
            <i
              className="fas fa-ellipsis-v fa-lg block-user-icon"
              aria-hidden="true"
            />
          </ButtonContainer>
        </div>
        <ModalContainer
          modalIsOpen={showModal}
          closeModal={() => setShowModal(false)}
          label="Lisää tai poista kaverin esto"
        >
          <div className="block-user-modal-content">
            <h3 className="interests-modal-text">
              {blocked
                ? 'Haluatko poistaa kaverin eston?'
                : 'Haluatko varmasti estää tämän kaverin?'}
            </h3>
            <p>
              {blocked
                ? 'Voit taas viestitellä kaverin kanssa kahdestaan.'
                : 'Estetty kaveri ei voi enää lähettää sinulle yksityisviestejä.'}
            </p>
            <ButtonContainer
              onClick={() => setShowModal(false)}
              className="cancel-button block-user-modal-btn"
            >
              En
            </ButtonContainer>
            <ButtonContainer
              onClick={toggleBlockedStatus}
              className="confirm-button block-user-modal-btn"
            >
              Kyllä
            </ButtonContainer>
          </div>
        </ModalContainer>
      </div>
    )
  }
  if (user.delete_at !== 0) {
    return (
      <div>
        <div className="friend-box-container">
          <div className="friend-icon-box">
            <i className="fas fa-circle deleted-user-icon" />
          </div>
          <Link
            className="friend-box"
            to={blocked ? `/friends` : `/chat/${channel.id}`}
          >
            <div className=" friend-messages-content deleted-user-messages-content">
              <div className="friend-box-content">
                <div className="friend-header">
                  <p className="deleted-user-nickname">Poistunut käyttäjä</p>
                </div>
                <div className="deleted-user-message text-content">
                  <div
                    className={
                      blocked
                        ? 'blocked-friend-text-content text-content'
                        : 'friend-text-content text-content'
                    }
                  >
                    {message && !blocked ? (
                      <>{message}</>
                    ) : (
                      <TextLine className="text-content" />
                    )}
                  </div>
                </div>
              </div>
              <div className="deleted-user-empty-fields" />
            </div>
          </Link>
        </div>
      </div>
    )
  }
  return <></>
}

Friend.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  unreadCount: propTypes.number.isRequired,
  getUsername: propTypes.func.isRequired,
  getPosts: propTypes.func.isRequired,
  getLatestMessage: propTypes.func.isRequired,
  membersInChannel: propTypes.instanceOf(Object).isRequired,
  myUserInfo: propTypes.instanceOf(Object).isRequired,
  getStatusById: propTypes.func.isRequired,
  currentUserId: propTypes.string.isRequired,
}

export default memo(Friend)
