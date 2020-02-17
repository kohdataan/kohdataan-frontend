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

const Friend = props => {
  const {
    channel,
    unreadCount,
    getUsername,
    getPosts,
    getLatestMessage,
    membersInChannel,
    myUserInfo,
  } = props

  const [user, setUser] = useState({})
  const [posts, setPosts] = useState({})
  const [blockedFriends, setBlockedFriends] = useState(myUserInfo.blockedUsers)
  const [blocked, setBlocked] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const imageUri =
    user && user.id
      ? `${process.env.REACT_APP_MATTERMOST_URL}/api/v4/users/${user.id}/image`
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
        const channelPosts = await getPosts(channel.id)
        setPosts(channelPosts.data)
      }
    }
    fetchPosts()
  }, [channel, getPosts])

  useEffect(() => {
    const checkUserBlockedStatus = async () => {
      if (blockedFriends && blockedFriends.indexOf(user.id) !== -1) {
        setBlocked(true)
      }
    }
    if (myUserInfo && user) checkUserBlockedStatus()
  }, [user])

  const toggleBlockedStatus = async () => {
    const { id } = user
    const token = localStorage.getItem('authToken')
    if (blockedFriends.indexOf(id) !== -1) {
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

  if (user.delete_at === 0) {
    return (
      <div>
        <div className="friend-box-container">
          <div className="friend-icon-box">
            {!blocked && (
              <img className="friend-icon" src={imageUri} alt="Profiilikuva" />
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
                  className={
                    blocked ? 'blocked-friend-header' : 'friend-header'
                  }
                >
                  <h2>{user.nickname}</h2>
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
            </Link>
            <ButtonContainer
              className="icon-btn"
              onClick={() => setShowModal(true)}
            >
              <i
                className="fas fa-ellipsis-v fa-lg block-user-icon"
                aria-hidden="true"
              />
            </ButtonContainer>
          </div>
        </div>
        <ModalContainer
          modalIsOpen={showModal}
          closeModal={() => setShowModal(false)}
          label="Change user block status"
        >
          <div className="block-user-modal-content">
            <h3 className="interests-modal-text">
              {blocked
                ? 'Haluatko poistaa kaverin estetyistä?'
                : 'Oletko varma, että haluat estää tämän kaverin?'}
            </h3>
            <p>
              {blocked
                ? 'Voit taas viestitellä kaverin kanssa.'
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
  return (
    <div className="friend-box">
      <div className="friend-box-content">
        <div className="friend-icon-box">
          <img className="friend-icon" src={imageUri} alt="Profiilikuva" />
        </div>
        <div className="friend-text-content">
          <div className="friend-header">
            <h2 className="deleted-user-nickname">{user.nickname}</h2>
          </div>
          <div className="deleted-user-message">
            Käyttäjä on poistunut palvelusta
          </div>
        </div>
      </div>
    </div>
  )
}

Friend.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  unreadCount: propTypes.number.isRequired,
  getUsername: propTypes.func.isRequired,
  getPosts: propTypes.func.isRequired,
  getLatestMessage: propTypes.func.isRequired,
  membersInChannel: propTypes.instanceOf(Object).isRequired,
  myUserInfo: propTypes.instanceOf(Object).isRequired,
}

export default memo(Friend)
