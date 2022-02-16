import React, { memo } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { isSystemAdmin, isTeamAdmin } from '../../../../utils/userIsAdmin'
import './styles.scss'

const Member = (props) => {
  const { userId, nickName, currentUserId, profiles, teams, iconMemberStatus } =
    props
  const userFirstLetter = nickName[0]
  const getUsername = () => {
    return profiles && profiles[userId] && profiles[userId].username
  }
  if (isSystemAdmin(userId, profiles) || isTeamAdmin(userId, teams)) {
    return null
  }
  return (
    <div className="chat-header-members-sider-member">
      {currentUserId !== userId && (
        <Link to={`/profile/${getUsername()}`} className="channel-name-link">
          <i aria-hidden="true" title={userFirstLetter} />
          <div
            className="label chat-message-sender-icon"
            style={{
              backgroundImage: `url(
                  ${
                    process.env.REACT_APP_MATTERMOST_URL
                  }/api/v4/users/${userId}/image?${Date.now()}
                )`,
            }}
          />
        </Link>
      )}
      {currentUserId === userId && (
        <div>
          <i aria-hidden="true" title={userFirstLetter} />
          <div
            className="label chat-message-sender-icon"
            style={{
              backgroundImage: `url(
                  ${
                    process.env.REACT_APP_MATTERMOST_URL
                  }/api/v4/users/${userId}/image?${Date.now()}
                )`,
            }}
          />
        </div>
      )}
      <span className={iconMemberStatus} />
      {currentUserId !== userId && (
        <Link
          className="members-sider-profile-link chat-member-nickname"
          to={`/profile/${getUsername()}`}
        >
          {nickName}
        </Link>
      )}
      {currentUserId === userId && (
        <>
          <span className="chat-member-nickname">{nickName}</span>
          <span className="chat-header-current-user-label">(sinä)</span>
        </>
      )}
    </div>
  )
}

Member.propTypes = {
  userId: propTypes.string.isRequired,
  nickName: propTypes.string.isRequired,
  currentUserId: propTypes.string.isRequired,
  profiles: propTypes.instanceOf(Object).isRequired,
  teams: propTypes.instanceOf(Object).isRequired,
  iconMemberStatus: propTypes.string.isRequired,
}

export default memo(Member)
