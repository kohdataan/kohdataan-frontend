import React from 'react'
import propTypes from 'prop-types'
import './styles.scss'

const MembersSider = props => {
  const { members, getUserNamebyId } = props

  return (
    <div className="chat-header-members-sider">
      <h4 className="chat-header-members-sider-title">Jäsenet</h4>
      {members.map(member => (
        <li key={member.user_id}>{getUserNamebyId(member.user_id)}</li>
      ))}
    </div>
  )
}

MembersSider.propTypes = {
  members: propTypes.instanceOf(Object).isRequired,
  getUserNamebyId: propTypes.func.isRequired,
}

export default MembersSider
