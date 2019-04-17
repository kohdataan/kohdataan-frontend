import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const Group = props => {
  const { channel, clickHandler } = props

  return (
    <div className="group-box">
      <button type="button" onClick={clickHandler(channel.id)}>
        {channel.display_name}
      </button>
    </div>
  )
}

Group.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  clickHandler: propTypes.func.isRequired,
}

export default Group
