import React, { useState, memo, useRef } from 'react'
import propTypes from 'prop-types'
import './styles.scss'
import Member from './Member'
import ButtonContainer from '../../ButtonContainer'
import LeaveChannelModal from './LeaveChannelModal'
import useOutsideClick from '../../../hooks/useOutsideClick'

const MembersSider = props => {
  const {
    members,
    profiles,
    getNickNamebyId,
    getStatusById,
    getIconColor,
    currentUserId,
    handleLeaveChannel,
    toggleSiderClosedIfOpen,
  } = props

  const [showConfirmation, setShowConfirmation] = useState(false)

  const getIconClassNameList = userId => {
    const classNameList = [
      'chat-header-members-icon',
      `sider-${getIconColor(userId)}-icon`,
    ]
    return classNameList.join(' ')
  }

  const getIconMemberStatus = userId =>
    `chat-header-${getStatusById(userId)}-status-icon`

  const openModal = () => setShowConfirmation(true)
  const closeModal = () => setShowConfirmation(false)

  const ref = useRef()

  useOutsideClick(ref, () => {
    toggleSiderClosedIfOpen()
  })

  return (
    <div className="chat-header-members-sider" id="members-sider" ref={ref}>
      <div className="chat-header-members-sider-content">
        <h4 className="chat-header-members-sider-title ">Jäsenet</h4>
        {members.map(member => (
          <Member
            key={member.user_id}
            userId={member.user_id}
            profiles={profiles}
            nickName={getNickNamebyId(member.user_id)}
            currentUserId={currentUserId}
            iconClassNameList={getIconClassNameList(member.user_id)}
            iconMemberStatus={getIconMemberStatus(member.user_id)}
          />
        ))}
        <h4 className="chat-header-members-sider-title">Yhteistä</h4>
        <ButtonContainer
          onClick={openModal}
          className="members-sider-leave-group-button"
        >
          Poistu ryhmästä
        </ButtonContainer>
        <LeaveChannelModal
          handleLeaveChannel={handleLeaveChannel}
          closeModal={closeModal}
          showConfirmation={showConfirmation}
        />
      </div>
    </div>
  )
}

MembersSider.propTypes = {
  members: propTypes.instanceOf(Object).isRequired,
  profiles: propTypes.instanceOf(Object).isRequired,
  getNickNamebyId: propTypes.func.isRequired,
  getStatusById: propTypes.func.isRequired,
  getIconColor: propTypes.func.isRequired,
  currentUserId: propTypes.string.isRequired,
  handleLeaveChannel: propTypes.func.isRequired,
  toggleSiderClosedIfOpen: propTypes.func.isRequired,
}

export default memo(MembersSider)
