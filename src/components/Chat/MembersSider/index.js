import React, { useState, memo, useRef } from 'react'
import propTypes from 'prop-types'
import './styles.scss'
import Member from './Member'
import ButtonContainer from '../../ButtonContainer'
import LeaveChannelModal from './LeaveChannelModal'
import useOutsideClick from '../../../hooks/useOutsideClick'

const MembersSider = (props) => {
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

  const [showConfirmation, setShowConfirmation] = useState(false)

  const getIconMemberStatus = (userId) =>
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
          <p>Tässä ryhmässä voit jutella kaikkien muiden käyttäjien kanssa.</p>
          <p>Ryhmä on auki arkisin klo 9-21.</p>
          <p>Valvojat ovat ryhmässä arkisin klo 9-17.</p>
          <p>
            Kaikki käyttäjät kuuluvat tähän ryhmään, joten ryhmään lähetetyt
            viestit näkyvät kaikille.
          </p>
          <p>
            Jos haluat lähettää valvojalle viestin, jota muut eivät näe, voit
            tehdä sen botin kautta.
          </p>
        </div>
      </div>
    )
  }

  if (channel.name === 'off-topic') {
    return (
      <div className="chat-header-members-sider" id="members-sider" ref={ref}>
        <div className="chat-header-members-sider-content">
          <p>
            Täällä järjestämme kaikille avoimia, eri aiheisiin liittyviä
            ohjattuja keskusteluja.
          </p>
          <p>Ryhmä on auki vain keskustelujen ajan.</p>
          <p>
            Kaikki käyttäjät kuuluvat tähän ryhmään, joten ryhmään lähetetyt
            viestit näkyvät kaikille.
          </p>
          <p>
            Jos haluat lähettää valvojalle viestin, jota muut eivät näe, voit
            tehdä sen botin kautta.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-header-members-sider" id="members-sider" ref={ref}>
      <div className="chat-header-members-sider-content">
        <h4 className="chat-header-members-sider-title ">Jäsenet</h4>
        {members.map((member) => (
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
