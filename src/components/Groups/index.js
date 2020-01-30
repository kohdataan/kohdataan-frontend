import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import Group from './Group'
import Instructions from '../Profile/Instructions'
import './styles.scss'

const Groups = props => {
  const {
    channels,
    getMembers,
    profiles,
    getUnreadCount,
    currentUserId,
    tutorialWatched,
  } = props

  const getShowModals = () => {
    return !tutorialWatched
  }

  const [showModals, setShowModals] = useState({
    5: getShowModals(),
  })

  const closeModal = modal => async () => {
    const newState = { ...showModals }
    newState[modal] = false
    setShowModals(newState)
    await props.updateUser({ tutorialWatched: true })
  }

  return (
    <div className="groups-wrapper">
      <div className="groups-header">
        <h1>Omat ryhmät</h1>
      </div>
      <div className="groups-boxes">
        {Object.values(channels).map(channel => (
          <Group
            key={channel.id}
            channel={channel}
            getMembers={getMembers}
            profiles={profiles}
            unreadCount={getUnreadCount(channel.id)}
            currentUserId={currentUserId}
          />
        ))}
      </div>
      {!tutorialWatched && (
        <Instructions closeModal={closeModal} showModals={showModals} />
      )}
    </div>
  )
}

Groups.defaultProps = {
  profiles: {},
}

Groups.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  currentUserId: PropTypes.string.isRequired,
  getMembers: PropTypes.func.isRequired,
  profiles: PropTypes.instanceOf(Object),
  getUnreadCount: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  tutorialWatched: PropTypes.bool.isRequired,
}

export default memo(Groups)
