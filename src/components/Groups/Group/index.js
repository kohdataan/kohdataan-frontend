import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Group = props => {
  const { channel } = props

  return (
    <Link className="group-box" to={`/chat/${channel.id}`}>
      <div className="group-info-wrapper">
        <h2>{channel.display_name}</h2>
      </div>
    </Link>
  )
}

Group.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
}

export default Group
