import React, { useState, useEffect, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import getUsernamesById from '../../../utils/getUsernameById'

const Group = props => {
  const { channel, getMembers, unreadCount /* profiles */ } = props
  const [members, setMembers] = useState([])

  useEffect(() => {
    getMembers(channel.id).then(data => setMembers(data.data))
  }, [])
  return (
    <Link
      className={`${unreadCount > 0 ? 'group-box-unreads' : ''} group-box`}
      to={`/chat/${channel.id}`}
    >
      <div className="group-header">
        <h2>{channel.display_name}</h2>
        {members && <p>{`${members.length} jäsentä`}</p>}
      </div>
      <p>Yhteistä:</p>
      {unreadCount > 0 && (
        <div className="group-unreads-text">
          <li>{`${unreadCount} uutta viestiä`}</li>
        </div>
      )}
    </Link>
  )
}

Group.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  getMembers: propTypes.func.isRequired,
  unreadCount: propTypes.number.isRequired,
  // profiles: propTypes.instanceOf(Object).isRequired,
}

export default memo(Group)
