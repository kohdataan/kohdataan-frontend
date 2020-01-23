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
    channel,
    getNickNamebyId,
    getStatusById,
    getIconColor,
    currentUserId,
    handleLeaveChannel,
    toggleSiderClosedIfOpen,
  } = props

  const [showConfirmation, setShowConfirmation] = useState(false)

  const getIconMemberStatus = userId =>
    `chat-header-${getStatusById(userId)}-status-icon`

  const openModal = () => setShowConfirmation(true)
  const closeModal = () => setShowConfirmation(false)

  const ref = useRef()

  useOutsideClick(ref, () => {
    toggleSiderClosedIfOpen()
  })

  if (channel.name === 'town-square') {
    return (
      <div className="chat-header-members-sider" id="members-sider" ref={ref}>
        <div className="chat-header-members-sider-content">
          <p>Tämä ryhmä on Kohdataan-somen pilottivaihetta varten.</p>
          <p>
            Tänne voit kirjoittaa vapaamuotoisesti palautetta palveluun
            liittyen.
          </p>
          <p>Kaikki käyttäjät ovat automaatisesti tämän ryhmän jäseniä.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-header-members-sider" id="members-sider" ref={ref}>
      <div className="chat-header-members-sider-content">
        <h4 className="chat-header-members-sider-title ">Jäsenet</h4>
        {members
          .filter(
            member =>
              profiles[member.user_id] &&
              profiles[member.user_id].delete_at === 0
          )
          .map(member => (
            <Member
              key={member.user_id}
              userId={member.user_id}
              profiles={profiles}
              nickName={getNickNamebyId(member.user_id)}
              currentUserId={currentUserId}
              iconColor={getIconColor(member.user_id)}
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
  channel: propTypes.instanceOf(Object).isRequired,
  getNickNamebyId: propTypes.func.isRequired,
  getStatusById: propTypes.func.isRequired,
  getIconColor: propTypes.func.isRequired,
  currentUserId: propTypes.string.isRequired,
  handleLeaveChannel: propTypes.func.isRequired,
  toggleSiderClosedIfOpen: propTypes.func.isRequired,
}

export default memo(MembersSider)
