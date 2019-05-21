import React, { useState, useEffect } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import getUsernamesById from '../../../utils/getUsernameById'

const Group = props => {
  const { channel, getMembers /* profiles */ } = props
  const [members, setMembers] = useState([])
  useEffect(() => {
    getMembers(channel.id).then(data => setMembers(data.data))
  }, [])
  return (
    <Link className="group-box" to={`/chat/${channel.id}`}>
      <div className="group-info-wrapper">
        <h2>{channel.display_name}</h2>
      </div>
      {members && <p>{`${members.length} jäsentä`}</p>}
    </Link>
  )
}

Group.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  getMembers: propTypes.func.isRequired,
  // profiles: propTypes.instanceOf(Object).isRequired,
}

export default Group
