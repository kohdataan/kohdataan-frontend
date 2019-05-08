import React, { useState } from 'react'
import propTypes from 'prop-types'
import './styles.scss'
import { Link } from 'react-router-dom'
import Member from './Member'
import ButtonContainer from '../../ButtonContainer'
import ModalContainer from '../../ModalContainer'

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

  const openModal = () => setShowConfirmation(true)
  const closeModal = () => setShowConfirmation(false)

  return (
    <div className="chat-header-members-sider" id="members-sider">
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
          onClick={openModal}
          className="members-sider-leave-group-button"
        >
          Poistu ryhmästä
        </ButtonContainer>
        <ModalContainer
          modalIsOpen={showConfirmation}
          closeModal={closeModal}
          label="leaveChannelModal"
        >
          <h2>Haluatko varmasti poistua ryhmästä?</h2>
          <ButtonContainer
            onClick={closeModal}
            className="cancel-leave-channel-button"
          >
            Peruuta
          </ButtonContainer>
          <Link className="leave-channel-link" to="/ryhmat">
            <ButtonContainer
              onClick={handleLeaveChannel}
              className="confirm-leave-channel-button"
            >
              Kyllä
            </ButtonContainer>
          </Link>
        </ModalContainer>
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
