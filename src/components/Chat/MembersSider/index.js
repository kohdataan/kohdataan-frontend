import React, { useState } from 'react'
import propTypes from 'prop-types'
import './styles.scss'
import { Link } from 'react-router-dom'
import Member from './Member'
import ButtonContainer from '../../ButtonContainer'

const MembersSider = props => {
  const {
    members,
    getUserNamebyId,
    getIconColor,
    currentUserId,
    handleLeaveChannel,
  } = props

  const [showConfirmation, setShowConfirmation] = useState(false)

  const getIconClassNameList = userId => {
    const classNameList = [
      'chat-header-members-icon',
      `sider-${getIconColor(userId)}-icon`,
    ]
    return classNameList.join(' ')
  }

  const clickHandler = () => {
    setShowConfirmation(!showConfirmation)
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
        <ButtonContainer
          onClick={clickHandler}
          className="members-sider-leave-group-button"
        >
          Poistu ryhmästä
        </ButtonContainer>
        {showConfirmation && (
          <Link
            className="leave-channel-link"
            to="/ryhmat"
            onClick={handleLeaveChannel}
          >
            Varmistus
          </Link>
        )}
      </div>
    </div>
  )
}

MembersSider.propTypes = {
  members: propTypes.instanceOf(Object).isRequired,
  getUserNamebyId: propTypes.func.isRequired,
  getIconColor: propTypes.func.isRequired,
  currentUserId: propTypes.string.isRequired,
  handleLeaveChannel: propTypes.func.isRequired,
}

export default MembersSider
