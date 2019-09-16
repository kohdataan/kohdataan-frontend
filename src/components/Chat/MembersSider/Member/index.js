import React, { memo } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './styles.scss'

const Member = props => {
  const { userId, userName, currentUserId, iconClassNameList, iconMemberStatus } = props
  const userFirstLetter = userName[0]
  console.log(props)
  return (
    <div className="chat-header-members-sider-member">
      <i aria-hidden="true" title={userFirstLetter} />
      <span className={iconClassNameList}>{userFirstLetter}</span>
      <span className={iconMemberStatus} ></span>
      {currentUserId !== userId && (  
        <Link
          className="members-sider-profile-link"
          to={`/profiili/${userName}`}
        >
          {userName}
        </Link>
      )}
      {currentUserId === userId && (
        <>
          <span>{userName}</span>
          <span className="chat-header-current-user-label">(sinä)</span>
        </>
      )}
    </div>
  )
}

Member.propTypes = {
  userId: propTypes.string.isRequired,
  userName: propTypes.string.isRequired,
  currentUserId: propTypes.string.isRequired,
  iconClassNameList: propTypes.string.isRequired,
}

export default memo(Member)
