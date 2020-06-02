import React, { useState, memo, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import './styles.scss'
import Member from './Member'
import ButtonContainer from '../../ButtonContainer'
import LeaveChannelModal from './LeaveChannelModal'
import useOutsideClick from '../../../hooks/useOutsideClick'
import { getUserByUsername } from '../../../api/user/user'

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
  const [membersToShow, setMembersToShow] = useState([])

  const getIconMemberStatus = userId =>
    `chat-header-${getStatusById(userId)}-status-icon`

  const openModal = () => setShowConfirmation(true)
  const closeModal = () => setShowConfirmation(false)

  const ref = useRef()

  useOutsideClick(ref, () => {
    toggleSiderClosedIfOpen()
  })

  const removeDeletedMembers = resp => {
    // Create array of nicknames of users with deleteAt timestamp
    const deletedProfiles = resp
      .filter(r => {
        return r.deleteAt !== null
      })
      .map(deleted => deleted.nickname)
    // filter out deleted profiles
    const memberProfiles = []
    for (let i = 0; i < members.length; i++) {
      const id = members[i].user_id
      const user = profiles[id]
      if (user.delete_at === 0) memberProfiles.push(user)
    }
    const filteredMmUserIds = memberProfiles
      .filter(profile => {
        return !deletedProfiles.includes(profile.nickname)
      })
      .map(profile => profile.id)
    const filteredMembers = members.filter(member =>
      filteredMmUserIds.includes(member.user_id)
    )
    setMembersToShow(filteredMembers)
  }

  // Get user info from own backend
  useEffect(() => {
    const getNodeUsers = async () => {
      const results = []
      for (let i = 0; i < members.length; i++) {
        const id = members[i].user_id
        const user = profiles[id]
        if (user && user.delete_at === 0 && user.email !== masterUserEmail) {
          results.push(
            getUserByUsername(user.username, localStorage.getItem('authToken'))
          )
        }
      }
      return removeDeletedMembers(await Promise.all(results))
    }
    getNodeUsers()
  }, [profiles])

  if (channel.name === 'town-square') {
    return (
      <div className="chat-header-members-sider" id="members-sider" ref={ref}>
        <div className="chat-header-members-sider-content">
          <p>Tässä ryhmässä voit kysyä valvojalta Kohdataan-somen käytöstä.</p>
          <p>Ryhmä on auki arkisin klo 9-17.</p>
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
        {membersToShow
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
