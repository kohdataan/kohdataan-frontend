import React from 'react'
import propTypes from 'prop-types'
import './styles.scss'

const MembersSider = props => {
  const { members, getUserNamebyId, getIconColor, currentUserId } = props
  const getIconClassNameList = userId => {
    const classNameList = [
      'chat-header-members-icon',
      `sider-${getIconColor(userId)}-icon`,
    ]
    return classNameList.join(' ')
  }

  return (
    <div className="chat-header-members-sider">
      <div className="chat-header-members-sider-content">
        <h4 className="chat-header-members-sider-title ">Jäsenet</h4>
        {members.map(member => (
          <div
            key={member.user_id}
            className="chat-header-members-sider-members-wrapper"
          >
            <i aria-hidden="true" title={getUserNamebyId(member.user_id)[0]} />
            <span className={getIconClassNameList(member.user_id)}>
              {getUserNamebyId(member.user_id)[0]}
            </span>
            <p>{getUserNamebyId(member.user_id)}</p>
            {currentUserId === member.user_id && (
              <p className="chat-header-current-user-label">(sinä)</p>
            )}
          </div>
        ))}
        <h4 className="chat-header-members-sider-title">Yhteistä</h4>
      </div>
    </div>
  )
}

MembersSider.propTypes = {
  members: propTypes.instanceOf(Object).isRequired,
  getUserNamebyId: propTypes.func.isRequired,
  getIconColor: propTypes.func.isRequired,
  currentUserId: propTypes.string.isRequired,
}

export default MembersSider
