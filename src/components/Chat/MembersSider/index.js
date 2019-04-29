import React from 'react'
import propTypes from 'prop-types'
import './styles.scss'
import Member from './Member'

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
          <Member
            key={member.user_id}
            userId={member.user_id}
            userName={getUserNamebyId(member.user_id)}
            currentUserId={currentUserId}
            iconClassNameList={getIconClassNameList(member.user_id)}
          />
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
