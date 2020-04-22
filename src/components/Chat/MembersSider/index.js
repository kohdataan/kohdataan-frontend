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
    teams,
    getNickNamebyId,
    getStatusById,
    currentUserId,
    handleLeaveChannel,
    toggleSiderClosedIfOpen,
  } = props

  const masterUserEmail = process.env.REACT_APP_MASTER_USER_EMAIL

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
          <p>Tässä ryhmässä voit kysyä valvojalta Kohdataan-somen käytöstä.</p>
          <p>Valvoja vastaa arkisin klo 9-17 välillä.</p>
          <p>Ryhmä on väliaikainen, se on auki 18.05. asti.</p>
          <p>
            Kaikki käyttäjät kuuluvat tähän ryhmään, joten ryhmään lähetetyt
            viestit näkyvät kaikille.
          </p>
          <p>
            Jos haluat lähettää valvojalle viestin, jota muut eivät näe, voit
            tehdä sen Botin kautta.
          </p>
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
              profiles[member.user_id].delete_at === 0 &&
              profiles[member.user_id].email !== masterUserEmail
          )
          .map(member => (
            <Member
              key={member.user_id}
              userId={member.user_id}
              profiles={profiles}
              teams={teams}
              nickName={getNickNamebyId(member.user_id)}
              currentUserId={currentUserId}
              iconMemberStatus={getIconMemberStatus(member.user_id)}
            />
          ))}
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
  teams: propTypes.instanceOf(Object).isRequired,
  channel: propTypes.instanceOf(Object).isRequired,
  getNickNamebyId: propTypes.func.isRequired,
  getStatusById: propTypes.func.isRequired,
  currentUserId: propTypes.string.isRequired,
  handleLeaveChannel: propTypes.func.isRequired,
  toggleSiderClosedIfOpen: propTypes.func.isRequired,
}

export default memo(MembersSider)
