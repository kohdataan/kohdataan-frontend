import React from 'react'
import propTypes from 'prop-types'
import './styles.scss'

const Member = props => {
  const { userId, userName, currentUserId, iconClassNameList } = props
  return (
    <div className="chat-header-members-sider-member">
      <i aria-hidden="true" title={userName[0]} />
      <span className={iconClassNameList}>{userName[0]}</span>
      <p>{userName}</p>
      {currentUserId === userId && (
        <p className="chat-header-current-user-label">(sinä)</p>
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

export default Member
