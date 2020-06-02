import React, { memo, useEffect, useState } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import groupNameColors from '../../../assets/groupColors'
import Member from '../../Groups/Group/Member'
import { isSystemAdmin, isTeamAdmin } from '../../../utils/userIsAdmin'
import { getUserByUsername } from '../../../api/user/user'

const SuggestionBox = props => {
  const { channel, members, hidden, top, profiles, teams } = props
  const [activeMembers, setActiveMembers] = useState([])
  const [membersToShow, setMembersToShow] = useState([])
  const sortPurpose = purpose => {
    return Object.keys(purpose).sort((a, b) => purpose[b] - purpose[a])
  }

  useEffect(() => {
    const getActiveMembers = () => {
      const activeMembersArr =
        members &&
        members
          .map(member => profiles[member.id])
          .filter(member => member && member.delete_at === 0)
          .filter(
            member =>
              !isSystemAdmin(member.id, profiles) &&
              !isTeamAdmin(member.id, teams)
          )
      setActiveMembers(activeMembersArr)
    }
    getActiveMembers()
  }, [members, profiles, setActiveMembers, teams])

  const removeDeletedMembers = resp => {
    // Create array of nicknames of users with deleteAt timestamp
    const deletedProfiles = resp
      .filter(r => {
        return r.deleteAt !== null
      })
      .map(deleted => deleted.nickname)
    // filter out deleted profiles
    const memberProfiles = []
    for (let i = 0; i < activeMembers.length; i++) {
      const { id } = activeMembers[i]
      const user = profiles[id]
      memberProfiles.push(user)
    }
    const filteredMmUserIds = memberProfiles
      .filter(profile => {
        return !deletedProfiles.includes(profile.nickname)
      })
      .map(profile => profile.id)
    const filteredMembers = activeMembers.filter(member =>
      filteredMmUserIds.includes(member.id)
    )
    setMembersToShow(filteredMembers)
  }

  // Get user info from own backend
  useEffect(() => {
    const getNodeUsers = async () => {
      const results = []
      for (let i = 0; i < activeMembers.length; i++) {
        const { id } = activeMembers[i]
        const user = profiles[id]
        if (user && user.delete_at === 0) {
          results.push(
            getUserByUsername(user.username, localStorage.getItem('authToken'))
          )
        }
      }
      return removeDeletedMembers(await Promise.all(results))
    }
    getNodeUsers()
  }, [profiles, activeMembers])

  return (
    <div
      className={`group-box group-suggestion-box ${hidden ? 'hidden-box' : ''}`}
      aria-hidden={hidden}
      style={{ top: `-${top + 2}px ` }}
    >
      <div className="group-box-content">
        <div className="group-header">
          <div
            className="group-color-icon"
            style={{
              backgroundColor: groupNameColors[channel.display_name],
              border: `${
                channel.display_name.toLowerCase().includes('valkoiset')
                  ? '1px solid grey'
                  : 'none'
              }`,
            }}
          />
          <h2 className="channel-suggestion-header">{channel.display_name}</h2>
        </div>
        <div className="group-in-common">
          {channel.purpose && Object.keys(channel.purpose).length > 0 ? (
            <p className="group-in-common-text">
              {`Kiinnostukset: ${sortPurpose(channel.purpose)
                .slice(0, 3)
                .join(', ')}`}
            </p>
          ) : (
            <div className="suggestion-box-info">
              <p>Tässä ryhmässä ei ole vielä muita jäseniä.</p>
              <p>Liity ryhmään ensimmäisenä.</p>
            </div>
          )}
        </div>
        {channel && members && (
          <div className="suggestion-members-wrapper">
            <div className="group-current-members">
              {membersToShow &&
                membersToShow
                  .filter(
                    member =>
                      member &&
                      member.delete_at === 0 &&
                      !isSystemAdmin(member.id, profiles) &&
                      !isTeamAdmin(member.id, teams)
                  )
                  .map(member => (
                    <Member
                      key={`suggestion-${member.id}`}
                      userId={member.id}
                      nickname={member.nickname}
                    />
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

SuggestionBox.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  members: propTypes.instanceOf(Array).isRequired,
  profiles: propTypes.instanceOf(Object).isRequired,
  teams: propTypes.instanceOf(Object).isRequired,
  hidden: propTypes.bool,
  top: propTypes.number,
}

SuggestionBox.defaultProps = {
  hidden: false,
  top: -10,
}

export default memo(SuggestionBox)
