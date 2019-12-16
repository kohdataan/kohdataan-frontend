import React, { memo } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './styles.scss'

const Member = props => {
  const { userId, nickName, currentUserId, iconClassNameList, profiles } = props
  const userFirstLetter = nickName[0]
  const getUsername = () =>
    profiles && profiles[userId] && profiles[userId].username

  return (
    <div className="chat-header-members-sider-member">
      <i aria-hidden="true" title={userFirstLetter} />
      <span className={iconClassNameList}>{userFirstLetter}</span>
      {currentUserId !== userId && (
        <Link
          className="members-sider-profile-link"
          to={`/profile/${getUsername()}`}
        >
          {nickName}
        </Link>
      )}
      {currentUserId === userId && (
        <>
          <span>{nickName}</span>
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
  iconClassNameList: propTypes.string.isRequired,
  profiles: propTypes.instanceOf(Object).isRequired,
}

export default memo(Member)
